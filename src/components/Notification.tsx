import React from 'react'
import { makeStyles } from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

import { INotification, NotificationDispatchContext, removeNotification } from '../contexts/NotificationContext'

const useStyles = makeStyles(() => ({
  snackbar: {
    cursor: 'pointer',
  },
}))

const Notification: React.FC<INotification> = ({ message, state }) => {
  const [open, setOpen] = React.useState(true)
  const classes = useStyles()

  const dispatch = React.useContext(NotificationDispatchContext)

  return (
    <Snackbar
      data-testid="notification"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      className={classes.snackbar}
      open={open}
      autoHideDuration={6000}
      onClose={(e, reason) => {
        // Handle timeout, but don't disappear just due to overly click
        if (reason === 'timeout') {
          setOpen(false)
        }
      }}
      onExited={() => {
        dispatch(removeNotification(message))
      }}
    >
      <MuiAlert
        data-testid="notification-message"
        onClick={() => {
          // Disappear on direct alert click
          setOpen(false)
        }}
        severity={state}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  )
}

export default Notification
