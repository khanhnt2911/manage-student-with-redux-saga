import { Button, LinearProgress, Pagination, Typography } from "@mui/material"
import { Box } from "@mui/system"
import studentApi from "api/studentApi"
import { useAppSelector } from "app/hooks"
import { selectCityList, selectCityMap } from "features/city/citySlice"
import { ListParams, Student } from "models"
import * as React from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import StudentFilter from "../components/StudentFilter"
import StudentTable from "../components/StudentTable"
import {
  selectStudentFilter,
  selectStudentLoading,
  selectStudentPagination,
  selectStudentList,
  studentActions,
} from "../StudentSlice"

export default function ListPage() {
  const dispatch = useDispatch()
  const filter = useAppSelector(selectStudentFilter)
  const studentList = useAppSelector(selectStudentList)
  const pagination = useAppSelector(selectStudentPagination)

  const loading = useAppSelector(selectStudentLoading)
  const cityMap = useAppSelector(selectCityMap)
  const cityList = useAppSelector(selectCityList)

  const navigate = useNavigate()

  React.useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter))
  }, [dispatch, filter])

  const handleChange = (e: any, page: number) => {
    dispatch(
      studentActions.setFilter({
        ...filter,
        _page: page,
      })
    )
  }

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilterWithDebounce(newFilter))
  }

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilter(newFilter))
  }

  const handleRemoveStudent = async (student: Student) => {
    try {
      // remove student API
      await studentApi.remove(student?.id || "")
      // Trigger to re-fetch student list with current filter
      dispatch(studentActions.setFilter({ ...filter }))
    } catch (error) {
      // Toast error
      console.log("failed to fetch student", error)
    }
  }

  const handleEditStudent = async (student: Student) => {
    navigate(`/admin/students/${student.id}`)
  }

  return (
    <div>
      {loading && <LinearProgress className="my-3" />}
      <Box className="flex justify-between my-3">
        <Typography variant="h5">Student</Typography>
        <Link to={"/admin/students/add"}>
          <Button variant="contained" color="primary">
            Add new student
          </Button>
        </Link>
      </Box>

      {/* Search */}
      <Box>
        <StudentFilter
          filter={filter}
          cityList={cityList}
          onChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        />
      </Box>

      {/* student table */}
      <StudentTable
        studentList={studentList}
        handleEdit={handleEditStudent}
        cityMap={cityMap}
        onRemove={handleRemoveStudent}
      />

      {/* pagination */}
      <div className="flex justify-center mt-5">
        <Pagination
          color="primary"
          count={Math.ceil(pagination._totalRows / pagination._limit)}
          page={pagination._page}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}
