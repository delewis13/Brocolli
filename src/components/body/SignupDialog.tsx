import React from 'react'
import { Dialog, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import SignupForm from './SignupForm'

interface ISignupDialog {
  onClose: () => void
  onSuccess: () => void
  open: boolean
}

const useStyles = makeStyles((theme) => ({
  marginLeft: {
    marginLeft: theme.spacing(1),
  },
  padding: {
    padding: theme.spacing(2),
  },
}))

const SignupDialog: React.FC<ISignupDialog> = ({ open, onClose, onSuccess }) => {
  const classes = useStyles({})

  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: classes.padding }} data-testid="signup-dialog">
      <Typography variant="h6" color="textSecondary" className={classes.marginLeft}>
        Request an invitation
      </Typography>
      <SignupForm onClose={onClose} onSuccess={onSuccess} />
    </Dialog>
  )
}

export default SignupDialog
