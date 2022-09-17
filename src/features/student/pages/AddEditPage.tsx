import { Button } from "@material-ui/core"
import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import studentApi from "api/studentApi"
import { Student } from "models"
import * as React from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import StudentForm from "../components/StudentForm"

export interface AddEditStudentProps {
  isAdd?: boolean
  isEdit?: boolean
}

export default function AddEditStudent(props: AddEditStudentProps) {
  const { studentId } = useParams<{ studentId: string }>()
  const [student, setStudent] = React.useState<Student>()
  const isEdit = Boolean(studentId)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (!studentId) return
    ;(async () => {
      try {
        const response: Student = await studentApi.getById(studentId)
        setStudent(response)
      } catch (error) {
        console.log("failed to get student by id")
      }
    })()
  }, [studentId])

  const initialValues: Student = {
    name: "",
    age: "",
    mark: "",
    gender: "male",
    city: "",
    ...student,
  }

  const handleSubmitForm = async (formValues: Student) => {
    if (isEdit) {
      await studentApi.update(formValues)
      navigate("/admin/students/list")

      throw new Error("test error")
    } else {
      await studentApi.add(formValues)
      navigate("/admin/students/list")
    }
  }

  return (
    <div>
      <Link to="/admin/students/list">
        <Button>Back to student list</Button>
      </Link>
      <Typography variant="h4">{isEdit ? "Update student info" : "Add new student"}</Typography>

      {(!isEdit || Boolean(student)) && (
        <Box mt={3}>
          <StudentForm initialValues={initialValues} onSubmit={handleSubmitForm} />
        </Box>
      )}
    </div>
  )
}
