import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "app/store"
import { ListParams, ListResponse, PaginationParams, Student } from "models"

export interface StudentState {
  loading?: boolean
  list?: Student[]
  filter?: ListParams
  pagination: PaginationParams
}

const initialState = {
  loading: false,
  list: [],
  filter: {
    _page: 1,
    _limit: 13,
  },
  pagination: {
    _page: 1,
    _limit: 20,
    _totalRows: 15,
  },
}

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    fetchStudentList(state: any, action: PayloadAction<ListParams>) {
      state.loading = true
    },
    fetchStudentSuccess(state: any, action: PayloadAction<ListResponse<Student>>) {
      state.list = action.payload.data
      state.pagination = action.payload.pagination
      state.loading = false
    },
    fetchStudentFailed(state: any) {
      state.loading = false
    },

    setFilter(state: any, action: PayloadAction<ListParams>) {
      state.filter = action.payload
    },

    setFilterWithDebounce(state: any, action: PayloadAction<ListParams>) {},
  },
})

// Actions
export const studentActions = studentSlice.actions

// Selectors
export const selectStudentList = (state: RootState) => state.student.list
export const selectStudentLoading = (state: RootState) => state.student.loading
export const selectStudentFilter = (state: RootState) => state.student.filter
export const selectStudentPagination = (state: RootState) => state.student.pagination

// Reducer
const studentReducer = studentSlice.reducer
export default studentReducer
