import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { useAppDispatch } from "app/hooks"
import { useNavigate } from "react-router-dom"
import { authActions } from "features/auth/authSlice"

export function Header() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(
      authActions.logout({
        navigate,
      })
    )
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Student Management
          </Typography>
          <Button variant="contained" color="primary" onClick={handleLogout}>
            Log out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
