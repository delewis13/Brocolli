import React from 'react'
import { TextField, TextFieldProps } from '@material-ui/core'
import { Field, FieldProps } from 'formik'

type TFormikTextField = TextFieldProps & {
  name: string
}

export const defaultFormikTextFieldProps: Partial<TextFieldProps> = {
  variant: 'outlined',
  InputLabelProps: { shrink: true },
  margin: 'normal',
  fullWidth: true,
}

const FormikTextField: React.FC<TFormikTextField> = ({ name, ...textFieldProps }) => {
  /**
   * Helper for integrating formik with material-ui text field
   */
  return (
    <Field name={name} data-testid="formik-text-field">
      {(props: FieldProps) => (
        <TextField
          variant="outlined"
          helperText={props.meta.touched && props.meta.error}
          error={props.meta.touched && Boolean(props.meta.error)}
          {...defaultFormikTextFieldProps}
          InputLabelProps={{ ...defaultFormikTextFieldProps.InputLabelProps, htmlFor: name }}
          id={name}
          {...props.field}
          {...textFieldProps}
        />
      )}
    </Field>
  )
}

export default FormikTextField
