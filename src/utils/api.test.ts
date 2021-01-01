import moxios from 'moxios'

import { ADD_NOTIFICATION } from '../contexts/NotificationContext'

import { signup } from './api'

describe('moxios tests', () => {
  const mockDispatch = jest.fn()

  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  test('after a successful signup adds a notification and returns', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
      })
    })

    await signup('name', 'name@domain.com', mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith({
      type: ADD_NOTIFICATION,
      payload: {
        message: 'Registration successful',
        state: 'success',
      },
    })
  })

  test('after a failed signup, show an error message then throw', async () => {
    const response = 'An unexpected failure'

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()

      request.respondWith({
        status: 400,
        response: { errorMessage: response },
      })
    })

    await expect(signup('name', 'name@domain.com', mockDispatch)).rejects.toThrow()
    expect(mockDispatch).toHaveBeenCalledWith({
      type: ADD_NOTIFICATION,
      payload: {
        message: `Failed to register: ${response}`,
        state: 'error',
      },
    })
  })
})
