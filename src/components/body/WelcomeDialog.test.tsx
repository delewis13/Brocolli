import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'

import { findByTestAttr } from '../../utils/test'

import WelcomeDialog from './WelcomeDialog'

const mockOnClose = jest.fn()

const setup = (open = true) => {
  return shallow(<WelcomeDialog open={open} onClose={mockOnClose} />)
}

describe('when dialog has open prop true', () => {
  let wrapper: ShallowWrapper

  beforeEach(() => {
    wrapper = setup()
    mockOnClose.mockClear()
  })
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'welcome-dialog')
    expect(component.length).toBe(1)
  })

  test('open prop is passed correctly', () => {
    expect(wrapper.props()['open']).toBeTruthy()
  })

  test('onclose is called when clicked', () => {
    const button = findByTestAttr(wrapper, 'continue-button')
    button.simulate('click')
    expect(mockOnClose).toHaveBeenCalled()
  })
})

test('hides when open is false', () => {
  const wrapper = setup(false)
  expect(wrapper.props()['open']).toBeFalsy()
})
