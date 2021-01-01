import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr } from '../../utils/test'

import HeroMessage from './HeroMessage'

const onActionClick = jest.fn()

const setup = (show = true) => {
  return shallow(<HeroMessage onAction={onActionClick} show={show} />)
}

test('renders without error', () => {
  const wrapper = setup()
  const component = findByTestAttr(wrapper, 'hero-message')
  expect(component.length).toBe(1)
})

test('calls onActionClick when action button is clicked', () => {
  const wrapper = setup()
  wrapper.find('ActionButton').simulate('click')
  expect(onActionClick).toHaveBeenCalled()
})

test('renders when show is truthy', () => {
  const wrapper = setup()
  expect(wrapper.props()['in']).toBeTruthy()
})

test('hides when show is falsey', () => {
  const wrapper = setup(false)
  expect(wrapper.props()['in']).toBeFalsy()
})
