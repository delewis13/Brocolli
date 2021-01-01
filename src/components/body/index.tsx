import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Brocolli from '../../images/brocolli.jpeg'
import Confetti from '../various/Confetti'

import HeroMessage from './HeroMessage'
import SignupDialog from './SignupDialog'
import WelcomeDialog from './WelcomeDialog'

const useStyles = makeStyles(() => ({
  body: {
    flexGrow: 1,
    opacity: 'rgb(0,0,0, 0.25)',
    backgroundImage: `url(${Brocolli})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
}))

const Body: React.FC = () => {
  const classes = useStyles({})
  const [showDialog, setShowDialog] = useState(false)
  const [showRegistered, setShowRegistered] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  return (
    <div className={classes.body} data-testid="body">
      <div className={classes.overlay} />
      <HeroMessage onAction={() => setShowDialog(true)} show={!showRegistered && !showDialog} />
      <SignupDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        onSuccess={() => {
          setShowDialog(false)
          setShowRegistered(true)
          setShowConfetti(true)
          setTimeout(() => {
            setShowConfetti(false)
          }, 5000)
        }}
      />
      <WelcomeDialog open={showRegistered} onClose={() => setShowRegistered(false)} />
      <Confetti confetti={showConfetti} />
    </div>
  )
}

export default Body
