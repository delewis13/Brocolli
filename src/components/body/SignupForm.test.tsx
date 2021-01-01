import React from 'react'
import { fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import { mount } from 'enzyme'
import moxios from 'moxios'

import { NotificationDispatchContext } from '../../contexts/NotificationContext'
import { findByTestAttr } from '../../utils/test'

import SignupForm, { emailMatchMessage, emailMessage, minCharMessage, requiredMessage } from './SignupForm'

const mockOnClose = jest.fn()
const mockOnSuccess = jest.fn()

test('onClose is called when clicked', () => {
  mockOnClose.mockClear()
  const wrapper = mount(<SignupForm onClose={mockOnClose} onSuccess={mockOnSuccess} />)
  const button = findByTestAttr(wrapper, 'cancel-button').first()
  button.simulate('click')
  expect(mockOnClose).toHaveBeenCalled()
})

// Note: much of the testing has already been done in FormikTextField.test.tsx
// Here we really only check that our Yup validation object is correct, which is of questionable
// actual use to test.
describe('testing correct validation messages are shown and submit is not called', () => {
  let wrapper: RenderResult

  beforeEach(() => {
    wrapper = render(<SignupForm onClose={mockOnClose} onSuccess={mockOnSuccess} />)
  })

  test(`check all 'is required' messages show`, async () => {
    expect(wrapper.queryByText(requiredMessage)).toBeNull()
    fireEvent.click(wrapper.getByText('Submit'))
    await waitFor(() => {
      expect(wrapper.getAllByText(requiredMessage).length).toBe(3)
      expect(mockOnSuccess).not.toHaveBeenCalled()
    })
  })

  test(`check error is shown when too few characters are used for 'fullName'`, async () => {
    expect(wrapper.queryByText(minCharMessage)).toBeNull()
    const input = wrapper.getByLabelText('Full Name')
    fireEvent.change(input, { target: { value: 'a' } })
    fireEvent.click(wrapper.getByText('Submit'))
    await waitFor(() => {
      expect(wrapper.getByText(minCharMessage)).toBeTruthy()
      expect(mockOnSuccess).not.toHaveBeenCalled()
    })
  })

  test(`check error is shown when email is not correctly formatted`, async () => {
    expect(wrapper.queryByText(emailMessage)).toBeNull()
    const input = wrapper.getByLabelText('Email')
    fireEvent.change(input, { target: { value: 'notAnEmail.com' } })
    fireEvent.click(wrapper.getByText('Submit'))
    await waitFor(() => {
      expect(wrapper.getByText(emailMessage)).toBeTruthy()
      expect(mockOnSuccess).not.toHaveBeenCalled()
    })
  })

  test(`check error is shown when 'confirm email' does not match 'email'`, async () => {
    expect(wrapper.queryByText(emailMatchMessage)).toBeNull()
    const emailInput = wrapper.getByLabelText('Email')
    const confirmEmailInput = wrapper.getByLabelText('Confirm Email')
    fireEvent.change(emailInput, { target: { value: 'email@domain.com' } })
    fireEvent.change(confirmEmailInput, { target: { value: 'different_email@domain.com' } })
    fireEvent.click(wrapper.getByText('Submit'))
    await waitFor(() => {
      expect(wrapper.getByText(emailMatchMessage)).toBeTruthy()
      expect(mockOnSuccess).not.toHaveBeenCalled()
    })
  })
})

describe('when all fields are valid form submits & displays loading indicator', () => {
  let wrapper: RenderResult
  const mockOnClose = jest.fn()
  const mockOnSuccess = jest.fn()
  const mockDispatch = jest.fn()

  const populateForm = (wrapper: RenderResult) => {
    const nameInput = wrapper.getByLabelText('Full Name')
    const emailInput = wrapper.getByLabelText('Email')
    const confirmEmailInput = wrapper.getByLabelText('Confirm Email')

    fireEvent.change(nameInput, { target: { value: 'daniel' } })
    fireEvent.change(emailInput, { target: { value: 'daniel@domain.com' } })
    fireEvent.change(confirmEmailInput, { target: { value: 'daniel@domain.com' } })
  }

  beforeEach(async () => {
    mockOnClose.mockClear()
    mockOnSuccess.mockClear()
    wrapper = render(
      <NotificationDispatchContext.Provider value={mockDispatch}>
        <SignupForm onClose={mockOnClose} onSuccess={mockOnSuccess} />
      </NotificationDispatchContext.Provider>
    )

    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  test('if API call is successful calls onSuccess and hides loading indicator', async () => {
    populateForm(wrapper)
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
      })
    })

    fireEvent.click(wrapper.getByText('Submit'))

    await waitFor(() => {
      expect(wrapper.getByTestId('submit-button')).toBeDisabled()
      return expect(wrapper.getByTestId('loading-indicator')).toBeTruthy()
    })

    await waitFor(() => {
      expect(wrapper.getByTestId('submit-button')).not.toBeDisabled()
      return expect(wrapper.queryByTestId('loading-indicator')).toBeFalsy()
    })

    expect(mockOnSuccess).toHaveBeenCalled()
  })

  test('if API call fails, does not call onSuccess and hides loading indicator', async () => {
    populateForm(wrapper)
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 400,
        response: { errorMessage: 'unexpected error' },
      })
    })

    fireEvent.click(wrapper.getByText('Submit'))

    await waitFor(() => {
      expect(wrapper.getByTestId('submit-button')).toBeDisabled()
      return expect(wrapper.getByTestId('loading-indicator')).toBeTruthy()
    })

    await waitFor(() => {
      expect(wrapper.getByTestId('submit-button')).not.toBeDisabled()
      return expect(wrapper.queryByTestId('loading-indicator')).toBeFalsy()
    })

    expect(mockOnSuccess).not.toHaveBeenCalled()
  })
})
