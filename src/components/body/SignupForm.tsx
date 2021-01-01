import React, { useContext, useState } from 'react'
import { Button, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import { NotificationDispatchContext } from '../../contexts/NotificationContext'
import { signup } from '../../utils/api'
import FormikTextField from '../various/FormikTextField'

interface ISignupForm {
  onClose: () => void
  onSuccess: () => void
}

const useStyles = makeStyles((theme) => ({
  marginLeft: {
    marginLeft: theme.spacing(1),
  },
  buttonsContainer: {
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
}))

export const requiredMessage = 'This is a required field'
export const emailMessage = 'Must be a valid email'
export const minCharMessage = 'Must be at least 3 characters long'
export const emailMatchMessage = 'Email must match'

const SignupForm: React.FC<ISignupForm> = ({ onClose, onSuccess }) => {
  const classes = useStyles({})
  const [loading, setLoading] = useState(false)
  const dispatch = useContext(NotificationDispatchContext)

  return (
    <Formik
      initialValues={{
        fullName: '',
        email: '',
        confirmEmail: '',
      }}
      onSubmit={async (values) => {
        setLoading(true)
        try {
          await signup(values.fullName, values.email, dispatch)
          onSuccess()
        } catch (e) {
          // pass
        }
        setLoading(false)
      }}
      validationSchema={Yup.object().shape({
        fullName: Yup.string().min(3, minCharMessage).required(requiredMessage),
        email: Yup.string().email(emailMessage).required(requiredMessage),
        confirmEmail: Yup.string()
          .oneOf([Yup.ref('email'), null], emailMatchMessage)
          .required(requiredMessage),
      })}
    >
      {() => (
        <Form>
          <FormikTextField name="fullName" label="Full Name" />
          <FormikTextField name="email" label="Email" />
          <FormikTextField name="confirmEmail" label="Confirm Email" />

          <div className={classes.buttonsContainer}>
            {loading ? <CircularProgress size={30} data-testid="loading-indicator" /> : <></>}
            <Button
              data-testid="cancel-button"
              variant="contained"
              color="default"
              type="button"
              onClick={onClose}
              className={classes.marginLeft}
            >
              Cancel
            </Button>
            <Button
              data-testid="submit-button"
              type="submit"
              variant="contained"
              color="primary"
              className={classes.marginLeft}
              disabled={loading}
            >
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default SignupForm
