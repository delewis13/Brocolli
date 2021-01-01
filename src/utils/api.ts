import { Dispatch } from 'react'
import axios from 'axios'

import { addNotification, NotificationActions } from '../contexts/NotificationContext'

import { APIEndpoint } from './constants'

const signup = async (name: string, email: string, dispatch: Dispatch<NotificationActions>) => {
  try {
    await axios({
      method: 'POST',
      url: APIEndpoint,
      data: {
        name,
        email,
      },
    })

    dispatch(
      addNotification({
        message: 'Registration successful',
        state: 'success',
      })
    )
  } catch (e) {
    dispatch(
      addNotification({
        message: `Failed to register: ${e.response.data.errorMessage}`,
        state: 'error',
      })
    )
    throw e
  }
}

export { signup }
