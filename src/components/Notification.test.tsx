import React from 'react'
import { act } from 'react-dom/test-utils'
import { fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import { mount, shallow, ShallowWrapper } from 'enzyme'

import { INotification, NotificationDispatchContext } from '../contexts/NotificationContext'
import { findByTestAttr } from '../utils/test'

import Notification from './Notification'

const defaultProps: INotification = { message: 'Default Message', state: 'success' }

const setup = (props: Partial<INotification> = {}) => {
  const setupProps = { ...defaultProps, ...props }
  const wrapper = shallow<Notification>(<Notification {...setupProps} />)
  return wrapper
}

const getMessageComponent = (wrapper: ShallowWrapper<Notification>) => {
  return (findByTestAttr(wrapper, 'notification-message') as ShallowWrapper).dive().dive()
}

describe('rendering with various messages / colors', () => {
  test('notification displays correct text', () => {
    const message = 'my message'
    const wrapper = setup({ message })
    const component = getMessageComponent(wrapper)
    expect(component.text()).toEqual(message)
  })

  test('notification displays success color when state is success', () => {
    const state = 'success'
    const wrapper = setup({ state })
    const component = getMessageComponent(wrapper)
    expect(component.hasClass('MuiAlert-standardSuccess')).toBeTruthy()
  })

  test('notification displays warning color when state is warning', () => {
    const state = 'warning'
    const wrapper = setup({ state })
    const component = getMessageComponent(wrapper)
    expect(component.hasClass('MuiAlert-standardWarning')).toBeTruthy()
  })

  test('notification displays error color when state is error', () => {
    const state = 'error'
    const wrapper = setup({ state })
    const component = getMessageComponent(wrapper)
    expect(component.hasClass('MuiAlert-standardError')).toBeTruthy()
  })
})

describe('checking interactivity of notification with mock state', () => {
  let wrapper: RenderResult
  const mockSetOpen = jest.fn()
  const mockDispatch = jest.fn()
  const originalUseState = React.useState

  beforeEach(() => {
    mockSetOpen.mockClear()
    mockDispatch.mockClear()
    jest.useFakeTimers()
    React.useState = jest.fn(() => [true, mockSetOpen])
    wrapper = render(
      <NotificationDispatchContext.Provider value={mockDispatch}>
        <Notification {...defaultProps} />
      </NotificationDispatchContext.Provider>
    )
  })

  afterEach(() => {
    React.useState = originalUseState
    jest.useRealTimers()
  })

  test('notification open state is set to false after timeout', async () => {
    act(() => jest.runAllTimers())
    expect(mockSetOpen).toHaveBeenCalledWith(false)
  })

  test('notification sets state on click', () => {
    const message = wrapper.getByText(defaultProps.message)
    fireEvent.click(message)
    expect(mockSetOpen).toHaveBeenCalledWith(false)
  })
})

test('notification triggers remove notification dispatch after exiting', async () => {
  const mockDispatch = jest.fn()
  const wrapper = render(
    <NotificationDispatchContext.Provider value={mockDispatch}>
      <Notification {...defaultProps} />
    </NotificationDispatchContext.Provider>
  )
  const message = wrapper.getByTestId('notification-message')
  fireEvent.click(message)
  await waitFor(() => {
    return expect(mockDispatch).toHaveBeenCalled()
  })
})

test('notification sets open prop to false on click', () => {
  const wrapper = mount(<Notification {...defaultProps} />)
  wrapper.find('.MuiAlert-message').simulate('click')
  expect(wrapper.children().props().open).toBeFalsy()
})
