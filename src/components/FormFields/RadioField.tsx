import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material"
import { Student } from "models"
import { Control, useController } from "react-hook-form"

export interface RadioOption {
  label?: string
  value: number | string
}

export interface RadioFieldProps {
  name: string
  control: Control<Student>
  label?: string
  options?: RadioOption[]
  disabled?: boolean
}

export function RadioField(props: RadioFieldProps) {
  const { name, control, label, options, disabled } = props
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  } as unknown as Student)

  return (
    <div>
      {" "}
      <FormControl error={invalid} disabled={disabled}>
        <FormLabel id="demo-row-radio-buttons-group-label">{label}</FormLabel>
        <RadioGroup
          name={name}
          aria-labelledby="demo-row-radio-buttons-group-label"
          onChange={onChange}
          onBlur={onBlur}
          value={value}
        >
          {options?.map((option) => {
            return (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            )
          })}
        </RadioGroup>
        <FormHelperText>{error?.message}</FormHelperText>
      </FormControl>
    </div>
  )
}
