import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'

import { findByTestAttr } from '../../utils/test'

import SignupDialog from './SignupDialog'

const mockOnClose = jest.fn()
const mockOnSuccess = jest.fn()

const setup = (open = true) => {
  return shallow(<SignupDialog open={open} onClose={mockOnClose} onSuccess={mockOnSuccess} />)
}

describe('when dialog has open prop true', () => {
  let wrapper: ShallowWrapper

  beforeEach(() => {
    wrapper = setup()
  })

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'signup-dialog')
    expect(component.length).toBe(1)
  })

  test('open prop is passed correctly', () => {
    expect(wrapper.props()['open']).toBeTruthy()
  })
})

test('hides when open is false', () => {
  const wrapper = setup(false)
  expect(wrapper.props()['open']).toBeFalsy()
})
