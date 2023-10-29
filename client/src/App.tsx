import { RouterProvider } from "react-router-dom"
import { router } from "./router/router"
import { useAppDispatch } from "./store/hooks"
import { getTokenFromLocalStorage } from "./helper/localstorage.helper"
import { AuthService } from "./services/auth.service"
import { login, logout } from "./store/user/userSlice"
import { useEffect } from "react"
import { toast } from "react-toastify"


function App() {
  const dispatch = useAppDispatch()

  const chechAuth = async () => {
    const token = getTokenFromLocalStorage()

    try {
      if (token) {
        const data = await AuthService.getProfile()
        if (data) {          
          dispatch(login(data))
        } else {
          dispatch(logout())
        }
      }
    } catch (error: any) {
      console.log(error);
      const e = error.response?.data.message
      toast.error(e.toString())
    }
  }

  useEffect(() => {
    chechAuth()
  }, [])

  return <RouterProvider router={router} />
}

export default App
