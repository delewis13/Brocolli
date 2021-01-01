import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { shallow } from 'enzyme'

import { findByTestAttr } from '../../utils/test'

import Body from './index'

const setup = () => {
  return shallow(<Body />)
}

test('renders without error', () => {
  const wrapper = setup()
  const component = findByTestAttr(wrapper, 'body')
  expect(component.length).toBe(1)
})

test('running the hero message onAction renders our signup dialog, clicking close closes the dialog', async () => {
  const wrapper = render(<Body />)

  expect(wrapper.queryByTestId('signup-dialog')).toBeNull()
  fireEvent.click(wrapper.getByText('Subscribe for brocolli facts'))
  expect(wrapper.getByTestId('signup-dialog')).toBeTruthy()
  fireEvent.click(wrapper.getByText('Cancel'))
  await waitFor(() => expect(wrapper.queryByTestId('signup-dialog')).toBeNull())
})

test('testing components mounting / unmounting via setState after submitting the form', () => {
  // We use the more brittle / hacky way of manually calling the prop via enzyme
  // Likely better to actually simulate user behaviour through RTL as this way is brittle
  // Regardless, the majority of these calls are better tested in the components themselves
  // Here, we just check that all of our setStates are causing the appropriate changes in props.
  jest.useFakeTimers()
  const wrapper = setup()
  const hero = wrapper.find('HeroMessage')
  const dialog = wrapper.find('SignupDialog')
  hero.props()['onAction']()
  expect(wrapper.find('SignupDialog').props()['open']).toBeTruthy()
  dialog.props()['onSuccess']()
  expect(wrapper.find('SignupDialog').props()['open']).toBeFalsy()
  expect(wrapper.find('WelcomeDialog').props()['open']).toBeTruthy()
  expect(wrapper.find('CustomConfetti').props()['confetti']).toBeTruthy()
  jest.runAllTimers()
  expect(wrapper.find('CustomConfetti').props()['confetti']).toBeFalsy()
  wrapper.find('WelcomeDialog').props()['onClose']()
  expect(wrapper.find('WelcomeDialog').props()['open']).toBeFalsy()
})
