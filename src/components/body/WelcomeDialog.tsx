import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Link } from '@material-ui/core'

interface IWelcomeDialog {
  open: boolean
  onClose: () => void
}

const WelcomeDialog: React.FC<IWelcomeDialog> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} data-testid="welcome-dialog">
      <DialogTitle>Welcome to the Vege-Fam</DialogTitle>

      <DialogContent>
        <Divider />
        <br />
        Check out our Electron based desktop application:{' '}
        <Link href={'https://dungeon-dj.com'} target="_blank">
          DungeonDJ
        </Link>
      </DialogContent>
      <DialogActions>
        <Button fullWidth onClick={onClose} color="primary" variant="contained" data-testid="continue-button">
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default WelcomeDialog
