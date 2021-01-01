import React from 'react'
import { fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import FormikTextField from './FormikTextField'

const minMessage = 'Must be at least 3 characters long'
const requiredMessage = 'This is a required field'

// Use react-testing-library here as Enzyme is kind of painful with Formik...
const setup = (onSubmit: jest.Mock) => {
  // Mock a very basic form with a single field that we will use to check
  // that our formik state [i.e. error, touched, meta] etc.
  // is being correctly passed to our MUI textfield and appropriate validation
  // errors etc. being rendered
  return render(
    <Formik
      initialValues={{
        key: '',
      }}
      onSubmit={onSubmit}
      validationSchema={Yup.object().shape({
        key: Yup.string().min(3, minMessage).required(requiredMessage),
      })}
    >
      {() => (
        <Form>
          <FormikTextField name="key" label="A Key" />
          <button data-testid="submit" type="submit">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}

describe('test formik / yup / material-ui integration [in particular, helper messages and error state]', () => {
  let wrapper: RenderResult
  const mockSubmit = jest.fn()

  beforeEach(() => {
    wrapper = setup(mockSubmit)
    mockSubmit.mockClear()
  })

  test('required validation message should show after being touched when there is no input', async () => {
    expect(wrapper.queryByText(requiredMessage)).toBeNull()
    const input = wrapper.getByDisplayValue('')
    fireEvent.focus(input)
    fireEvent.blur(input)
    await waitFor(() => {
      expect(wrapper.getByText(requiredMessage)).toBeTruthy()
      expect(wrapper.getByText(requiredMessage)).toHaveClass('Mui-error')
    })
  })

  test('required validation message should show after being submitted when there is no input', async () => {
    expect(wrapper.queryByText(requiredMessage)).toBeNull()
    fireEvent.click(wrapper.getByText('Submit'))
    await waitFor(() => {
      expect(wrapper.getByText(requiredMessage)).toBeTruthy()
      expect(wrapper.getByText(requiredMessage)).toHaveClass('Mui-error')
    })
  })

  test('minChars validation message should show after being submitted when there is an input that is too short', async () => {
    expect(wrapper.queryByText(minMessage)).toBeNull()
    const input = wrapper.getByDisplayValue('')
    fireEvent.change(input, { target: { value: 'a' } })
    fireEvent.click(wrapper.getByText('Submit'))
    await waitFor(() => {
      expect(wrapper.getByText(minMessage)).toBeTruthy()
      expect(wrapper.getByText(minMessage)).toHaveClass('Mui-error')
    })
  })

  test('no validation message when data is valid & submit should be called', async () => {
    expect(wrapper.queryByText(minMessage)).toBeNull()
    const input = wrapper.getByDisplayValue('')
    fireEvent.change(input, { target: { value: 'Valid Value' } })
    fireEvent.click(wrapper.getByText('Submit'))
    await waitFor(() => {
      expect(wrapper.queryByText(requiredMessage)).toBeNull()
      expect(wrapper.queryByText(minMessage)).toBeNull()
      expect(mockSubmit).toHaveBeenCalledTimes(1)
    })
  })
})
