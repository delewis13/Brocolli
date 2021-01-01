import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr } from '../utils/test'

import Footer from './Footer'

const setup = () => {
  return shallow(<Footer />)
}

test('renders without error', () => {
  const wrapper = setup()
  const component = findByTestAttr(wrapper, 'footer')
  expect(component.length).toBe(1)
})
