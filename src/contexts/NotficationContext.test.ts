import { addNotification, INotification, notificationReducer, removeNotification } from './NotificationContext'

describe('Test reducer functionality', () => {
  const notification: INotification = { message: 'hello', state: 'success' }

  test('Add a notification', () => {
    const result = notificationReducer([], addNotification(notification))
    expect(result[0]).toBe(notification)
    expect(result.length).toBe(1)
  })

  test('Remove a notification', () => {
    const result = notificationReducer([notification], removeNotification(notification.message))
    expect(result.length).toBe(0)
  })

  test('Send an unknown action', () => {
    // Ignore typing to allow sending an unexpected action to the reducer to check the `default` branch.
    // @ts-ignore-next-line
    const result = notificationReducer([notification], { type: 'UNKNOWN' })
    expect(result[0]).toBe(notification)
  })

  test('Remove all notifications with same message', () => {
    const initialState: INotification[] = [
      {
        message: 'hello',
        state: 'success',
      },
      {
        message: 'other',
        state: 'warning',
      },
      {
        message: 'hello',
        state: 'error',
      },
    ]
    const result = notificationReducer(initialState, removeNotification(initialState[0].message))
    expect(result.length).toBe(1)
    expect(result[0]).toBe(initialState[1])
  })
})
