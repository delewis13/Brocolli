import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'

import { ReactComponent as BrocolliSVG } from '../images/brocolli.svg'

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'left',
  },
  marginRight: {
    marginRight: theme.spacing(1),
  },
}))

const Header: React.FC = () => {
  const classes = useStyles({})

  return (
    <AppBar position="sticky" data-testid="header">
      <Toolbar className={classes.toolbar}>
        <BrocolliSVG height={30} width={30} className={classes.marginRight} />
        <Typography variant="h6" data-testid="header-text">
          Broccoli {'&'} Co.
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
