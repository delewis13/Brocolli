import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    bottom: '0',
    width: '100%',
    background: theme.palette.primary.main,
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
}))

const Footer: React.FC = () => {
  const classes = useStyles({})
  return (
    <div className={classes.footer} data-testid="footer">
      <Typography color="textSecondary">Making sure you get your greens since 2020</Typography>
      <Typography color="textSecondary">A subsiduary of Veggies Inc. ©</Typography>
    </div>
  )
}

export default Footer
