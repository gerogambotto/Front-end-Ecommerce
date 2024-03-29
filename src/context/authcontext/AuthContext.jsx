import axios from "axios"
import { useEffect, useState, useContext, createContext } from "react"

import { useNavigate } from 'react-router-dom'

export const authContext = createContext()
export const authGlobalState = () => {
  const context = useContext(authContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}

export const AuthProvider = ({ children }) => {
  const VITE_APP_BACKEND_API = import.meta.env.VITE_APP_BACKEND_API
  const navigate = useNavigate()

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showCart, setShowCart] = useState(false)

  const login = async (email, password) => {
    const params = new URLSearchParams();
    params.append('username', email);
    params.append('password', password);

    const res = await axios.post(`${VITE_APP_BACKEND_API}/token`, params)
    if (res.status === 200) {
      localStorage.setItem("token", res.data.access_token)
      setIsLoggedIn(true)
      navigate('/')
    } else {
      setIsLoggedIn(false)
    }
  }

  const register = async (email, password) => {
    const body = {
      "email": email,
      "hashed_password": password
    }
    const res = await axios.post(`${VITE_APP_BACKEND_API}/user`, body)
    console.log(res)
    if (res.status === 200){
      localStorage.setItem('token', res.data.access_token)
      setIsLoggedIn(true)
      navigate('/')
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true)
    }
  }, [isLoggedIn])

  return (
    <authContext.Provider
      value={{
        login,
        register,
        isLoggedIn,
        logout,
        showCart,
        setShowCart
      }}
    >
      {children}
    </authContext.Provider>
  )
}
