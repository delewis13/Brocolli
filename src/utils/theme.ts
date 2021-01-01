import { teal } from '@material-ui/core/colors'
import grey from '@material-ui/core/colors/grey'
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

const theme = {
  palette: {
    primary: teal,
    secondary: { main: grey[50] },
  },
}

const customTheme = responsiveFontSizes(createMuiTheme(theme))

export default customTheme
