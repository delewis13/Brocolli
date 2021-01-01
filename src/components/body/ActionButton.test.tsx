import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr } from '../../utils/test'

import ActionButton from './ActionButton'

const mockOnClick = jest.fn()

const setup = () => {
  return shallow(<ActionButton onClick={mockOnClick} />)
}

test('renders without error', () => {
  const wrapper = setup()
  const component = findByTestAttr(wrapper, 'action-button')
  expect(component.length).toBe(1)
})

test('displays correct text', () => {
  const wrapper = setup()
  expect(wrapper.text()).toBe('Subscribe for brocolli facts')
})

test('calls on click when clicked', () => {
  const wrapper = setup()
  wrapper.simulate('click')
  expect(mockOnClick).toHaveBeenCalled()
})
