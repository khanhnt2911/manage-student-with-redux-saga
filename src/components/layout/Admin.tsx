import { Box } from "@mui/system"
import { Header, Sidebar } from "components/common"
import { Outlet } from "react-router-dom"

export interface AdminLayoutProps {}

export function AdminLayout() {
  return (
    <>
      <Box className={`min-h-[100vh]`}>
        <Box className={`header`}>
          <Header />
        </Box>
        <div className="flex">
          <Box className={`sidebar w-[300px]`}>
            <Sidebar />
          </Box>
          <Box className={`main flex-1 p-10`}>
            <Outlet />
          </Box>
        </div>
      </Box>
    </>
  )
}
