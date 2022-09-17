import { useState } from "react"
import { City, Student } from "models"

import { Capitalize, MarkColor } from "ultils/common"
import { Box } from "@mui/system"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
} from "@material-ui/core"
import TableRow from "@mui/material/TableRow"
import StudentForm from "./StudentForm"

export interface StudentTableProps {
  studentList: Student[]
  handleEdit?: (student: Student) => void
  onRemove?: (student: Student) => void
  cityMap: {
    [key: string]: City
  }
}

export default function StudentTable(props: StudentTableProps) {
  const { studentList, handleEdit, onRemove, cityMap } = props

  const [openEdit, setOpenEdit] = useState(false)
  const [openRemove, setOpenRemove] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student>()

  const handleCloseRemove = () => {
    setOpenRemove(false)
  }
  const handleCloseEdit = () => {
    setOpenEdit(false)
  }

  const handleRemoveClick = (student: Student) => {
    // set selected student
    setSelectedStudent(student)
    // show confirm
    setOpenRemove(true)
  }

  const handleRemoveConfirm = async (student: Student) => {
    // call onRemove
    onRemove?.(student)
    // hide dialog
    setOpenRemove(false)
  }

  const handleEditStudent = async (student: Student) => {
    handleEdit?.(student)
  }

  return (
    <>
      <TableContainer className="shadow-md mt-4">
        <Table aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Mark</TableCell>
              <TableCell>City</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentList.map((student) => (
              <TableRow key={student.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{Capitalize(student.gender)}</TableCell>
                <TableCell>
                  <Box color={MarkColor(Number(student.mark))} fontWeight="bold">
                    {student.mark}
                  </Box>
                </TableCell>
                <TableCell>{cityMap[student.city]?.name}</TableCell>
                <TableCell align="center">
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    onClick={() => handleEditStudent(student)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    onClick={() => handleRemoveClick(student)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Remove student */}
      <Dialog
        open={openRemove}
        onClose={handleCloseRemove}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"> Remove a student</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to remove student named "{selectedStudent?.name}", this is can't be undo
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRemove} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={() => handleRemoveConfirm(selectedStudent as Student)}
            variant="contained"
            color="secondary"
            autoFocus
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Student */}
      {/* <Dialog open={openEdit} onClose={handleCloseEdit} fullWidth>
        <DialogTitle>Edit student</DialogTitle>
        <DialogContent>
          <StudentForm initialValues={selectedStudent} onSubmit={handleSubmitForm} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button onClick={() => handleEditConfirm(selectedStudent as Student)}>Edit</Button>
        </DialogActions>
      </Dialog> */}
    </>
  )
}
