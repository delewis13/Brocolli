import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'

import { findByTestAttr } from '../utils/test'

import App from './App'

const setup = () => {
  return shallow(<App />)
}

describe('render', () => {
  describe('no notifications', () => {
    let wrapper
    beforeEach(() => {
      wrapper = setup()
    })

    test('renders without error', () => {
      const component = findByTestAttr(wrapper, 'app')
      expect(component.length).toBe(1)
    })
  })

  describe('with notifications', () => {
    let wrapper: ShallowWrapper
    const notification = { message: 'Basic Message', state: 'success' }
    beforeEach(() => {
      React.useReducer = jest.fn(() => [
        [notification],
        () => {
          // pass
        },
      ])
      wrapper = setup()
    })

    test('renders without error', () => {
      const component = findByTestAttr(wrapper, 'app')
      expect(component.length).toBe(1)
    })

    test('renders correct notification', () => {
      const notificationProps = wrapper.find('Notification').props()
      expect(notificationProps['message']).toBe(notification.message)
      expect(notificationProps['state']).toBe(notification.state)
    })
  })
})
