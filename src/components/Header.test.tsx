import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr } from '../utils/test'

import Header from './Header'

const setup = () => {
  return shallow(<Header />)
}

test('renders without error', () => {
  const wrapper = setup()
  const component = findByTestAttr(wrapper, 'header')
  expect(component.length).toBe(1)
})

test('renders company name', () => {
  const wrapper = setup()
  const component = findByTestAttr(wrapper, 'header-text')
  expect(component.text()).toEqual('Broccoli & Co.')
})
