import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material"
import { Student } from "models"
import { Control, useController } from "react-hook-form"

export interface SelectOption {
  label?: string
  value: number | string
}

export interface SelectFieldProps {
  name: string
  control: Control<Student>
  label?: string
  options: SelectOption[]
}

export function SelectField(props: SelectFieldProps) {
  const { name, control, label, options } = props
  const {
    field: { value, onChange },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  } as unknown as Student)
  return (
    <div>
      {" "}
      <FormControl variant="outlined" fullWidth error={invalid}>
        <InputLabel id={`${name}_label`}>{label}</InputLabel>
        <Select variant="outlined" value={value} onChange={onChange} label={label}>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{error?.message}</FormHelperText>
      </FormControl>
    </div>
  )
}
