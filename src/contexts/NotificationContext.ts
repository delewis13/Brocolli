import { createContext, Dispatch } from 'react'

// NOTE: Normally I would use redux-toolkit with a ducks pattern. See README.md

// One context for dispatch, the other for state.
// Prevents re-renders for components that only use the dispatch.
export const NotificationStateContext = createContext<INotification[]>([])
export const NotificationDispatchContext = createContext<
  Dispatch<ADD_NOTIFICATION_ACTION | REMOVE_NOTIFICATION_ACTION>
>((null as unknown) as Dispatch<ADD_NOTIFICATION_ACTION | REMOVE_NOTIFICATION_ACTION>)

export interface INotification {
  message: string
  state: 'error' | 'warning' | 'success'
}

// Actions
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION'
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION'

type ADD_NOTIFICATION_ACTION = { type: typeof ADD_NOTIFICATION; payload: INotification }
type REMOVE_NOTIFICATION_ACTION = { type: typeof REMOVE_NOTIFICATION; payload: string }
export type NotificationActions = ADD_NOTIFICATION_ACTION | REMOVE_NOTIFICATION_ACTION

export const addNotification = (notification: INotification): ADD_NOTIFICATION_ACTION => ({
  type: ADD_NOTIFICATION,
  payload: notification,
})

export const removeNotification = (message: string): REMOVE_NOTIFICATION_ACTION => ({
  type: REMOVE_NOTIFICATION,
  payload: message,
})

// Reducer
export const notificationReducer = (state: INotification[], action: NotificationActions) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return [...state, action.payload]
    case REMOVE_NOTIFICATION:
      return state.filter((notification) => notification.message !== action.payload)
    default:
      return state
  }
}
