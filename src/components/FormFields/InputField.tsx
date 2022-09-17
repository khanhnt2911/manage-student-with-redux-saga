import { TextField } from "@mui/material"
import { Student } from "models"
import { InputHTMLAttributes } from "react"
import { Control, useController } from "react-hook-form"

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  control: Control<Student>
  label?: string
}

export function InputField(props: InputFieldProps) {
  const { name, control, label, ...inputProps } = props
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  } as unknown as Student)

  return (
    <div>
      <TextField
        fullWidth
        margin="normal"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        label={label}
        variant="outlined"
        inputRef={ref}
        error={invalid}
        helperText={error?.message}
        inputProps={inputProps}
      />
    </div>
  )
}
