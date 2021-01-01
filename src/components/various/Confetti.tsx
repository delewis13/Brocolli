import React from 'react'
import Confetti from 'react-dom-confetti'
import { makeStyles } from '@material-ui/core'

const defaultConfig = {
  angle: 45,
  spread: 90,
  startVelocity: 40,
  elementCount: 100,
  dragFriction: 0.08,
  duration: 3000,
  stagger: 3,
  width: '10px',
  height: '10px',
  perspective: '900px',
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
}

interface ICustomConfetti {
  confetti: boolean
}

const useStyles = makeStyles(() => ({
  confetti: {
    position: 'fixed',
    zIndex: 1302, // Place above any MUI dialogs
    top: '100%',
    left: '0%',
    height: '100%',
    width: '100%',
  },
}))

const CustomConfetti: React.FC<ICustomConfetti> = ({ confetti }) => {
  const classes = useStyles()
  return (
    <div className={classes.confetti} data-testid="confetti">
      <Confetti active={confetti} config={defaultConfig} />
    </div>
  )
}

export default CustomConfetti
