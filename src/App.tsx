import { Routes, Route } from "react-router-dom"
import LoginPage from "features/auth/pages/LoginPage"
import { AdminLayout } from "components/layout"
import { NotFound, PrivateRoute } from "components/common"
import Dashboard from "features/dashboard"
import StudentFeature from "features/student"

function App() {
  return (
    <>
      {/* Same as */}
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />}></Route>
            <Route path="students/*" element={<StudentFeature />}></Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  )
}

export default App
