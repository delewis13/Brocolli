import React from 'react'
import { Button, Typography } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    padding: theme.spacing(2),
  },
}))

interface IActionButton {
  onClick: () => void
}

const ActionButton: React.FC<IActionButton> = ({ onClick }) => {
  const classes = useStyles({})
  return (
    <Button
      color="primary"
      variant="contained"
      className={classes.button}
      onClick={onClick}
      data-testid="action-button"
    >
      <Typography variant="subtitle1">Subscribe for brocolli facts</Typography>
    </Button>
  )
}

export default ActionButton
