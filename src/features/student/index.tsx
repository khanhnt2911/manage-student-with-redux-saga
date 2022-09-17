import { cityActions } from "features/city/citySlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Route, Routes } from "react-router-dom"
import AddEditStudent from "./pages/AddEditPage"
import ListPage from "./pages/ListPage"

export default function StudentFeature() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(cityActions.fetchCityList())
  }, [dispatch])

  return (
    <Routes>
      <Route path="list" element={<ListPage />}></Route>
      <Route path="add" element={<AddEditStudent />}></Route>
      <Route path=":studentId" element={<AddEditStudent />}></Route>
    </Routes>
  )
}
