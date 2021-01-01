import React from 'react'
import { CssBaseline, makeStyles } from '@material-ui/core'

import {
  NotificationDispatchContext,
  notificationReducer,
  NotificationStateContext,
} from '../contexts/NotificationContext'

import Body from './body'
import Footer from './Footer'
import Header from './Header'
import Notification from './Notification'

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    width: '100vw',
    overflow: 'none',
    display: 'flex',
    flexDirection: 'column',
  },
}))

const App: React.FC = () => {
  const classes = useStyles()
  const [state, dispatch] = React.useReducer(notificationReducer, [])

  return (
    <NotificationDispatchContext.Provider value={dispatch}>
      <NotificationStateContext.Provider value={state}>
        <div className={classes.root} data-testid="app">
          <CssBaseline />
          <Header />
          <Body />
          {state.map((notification) => (
            <Notification key={notification.message} message={notification.message} state={notification.state} />
          ))}
          <Footer />
        </div>
      </NotificationStateContext.Provider>
    </NotificationDispatchContext.Provider>
  )
}

export default App
