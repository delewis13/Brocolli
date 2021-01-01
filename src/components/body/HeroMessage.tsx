import React from 'react'
import { Fade, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import ActionButton from './ActionButton'

interface IHeroMessage {
  show: boolean
  onAction: () => void
}

const useStyles = makeStyles((theme) => ({
  heroMessage: {
    maxWidth: '80%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    padding: theme.spacing(3),
    background: 'rgba(255,255,255,0.9)',
    zIndex: 1, // To sit atop the overlay
  },
}))

const HeroMessage: React.FC<IHeroMessage> = ({ onAction, show }) => {
  const classes = useStyles({})
  return (
    <Fade in={show} data-testid="hero-message">
      <Paper className={classes.heroMessage}>
        <Typography variant="h5" align="center">
          Welcome to Brocolli {'&'} Co.
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" align="center" gutterBottom>
          Green vegetables are superior
        </Typography>
        <ActionButton onClick={onAction} />
      </Paper>
    </Fade>
  )
}

export default HeroMessage
