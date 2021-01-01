import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr } from '../../utils/test'

import Confetti from './Confetti'

const setup = (confetti: boolean) => {
  return shallow(<Confetti confetti={confetti} />)
}

test('renders without error', () => {
  const wrapper = setup(true)
  const component = findByTestAttr(wrapper, 'confetti')
  expect(component.length).toBe(1)
})

test('shows when confetti is true', () => {
  const wrapper = setup(true)
  expect(wrapper.find('Confetti').props()['active']).toBeTruthy()
})

test('hides when confetti is false', () => {
  const wrapper = setup(false)
  expect(wrapper.find('Confetti').props()['active']).toBeFalsy()
})
