import { Alert, Button, CircularProgress } from "@mui/material"
import { Box } from "@mui/system"
import { useAppSelector } from "app/hooks"
import { InputField } from "components/FormFields"
import { RadioField } from "components/FormFields/RadioField"
import { SelectField } from "components/FormFields/SelectField"
import { selectCityOptions } from "features/city/citySlice"
import { Student } from "models"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { resolve } from "path"
import { toast } from "react-toastify"

export interface StudentFormProps {
  initialValues?: Student
  onSubmit?: (formValues: Student) => void
}

const schema = yup
  .object({
    name: yup.string().required().min(10, "To short!!!").max(50, "To long!!!"),
    age: yup
      .number()
      .positive("Please enter a positive number")
      .integer("Please enter an integer")
      .required("Please enter age"),
    mark: yup.number().min(0, "Min is )").max(10, " Max is 10"),
    gender: yup
      .string()
      .oneOf(["male", "female"], "Please select either male or female")
      .required(),
    city: yup.string().required(),
  })
  .required()

export default function StudentForm(props: StudentFormProps) {
  const { initialValues, onSubmit } = props
  const [error, setError] = useState<string>("")
  const cityOption = useAppSelector(selectCityOptions)
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Student>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  })

  const handleFormSubmit = async (formValues: Student) => {
    try {
      setError("")
      await onSubmit?.(formValues)
    } catch (error) {
      console.log("failed to update student")
    }

    toast.success("🦄 Wow so easy!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  return (
    <Box width={400}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" label="Full name" control={control} />
        <RadioField
          name="gender"
          control={control}
          label="Gender"
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
        />
        <InputField name="age" label="Age" control={control} />
        <InputField name="mark" label="Mark" control={control} />
        {Array.isArray(cityOption) && (
          <SelectField name="city" control={control} label="City" options={cityOption} />
        )}
        <Box>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting && <CircularProgress size={16} color="primary" />}Save
          </Button>
        </Box>
      </form>
    </Box>
  )
}
