import { Button, CircularProgress, Paper, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useAppSelector } from "app/hooks"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { authActions, selectIsLogging } from "../authSlice"
export interface LoginPageProps {}

export default function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLogging = useAppSelector(selectIsLogging)

  const handleLoginClick = () => {
    // Todo: Get username + password from login form
    dispatch(
      authActions.login({
        username: "",
        password: "",
        navigate,
      })
    )
  }

  return (
    <div className={`flex justify-center flex-col items-center min-h-[100vh]`}>
      <Paper elevation={1} className="p-4">
        <Typography variant="h5" component="h1">
          Student Management
        </Typography>
        <Box mt={4}>
          <Button fullWidth variant="contained" color="primary" onClick={handleLoginClick}>
            {isLogging && <CircularProgress size={20} color="inherit" />}
            Fake Login
          </Button>
        </Box>
      </Paper>
    </div>
  )
}
