import axios from "axios"
import { useState } from "react"
import { useContext } from "react"
import { createContext } from "react"

export const authContext = createContext()
export const authGlobalState = () => {
  const context = useContext(authContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const login = async (email, password) => {
    const body = {
      username: "atuny0",
      password: "9uQFF1Lh",
    }
    const res = await axios.post("https://dummyjson.com/auth/login", body)
    if (res.status === 200) {
      localStorage.setItem("token", res.data.token)
      setIsLoggedIn(true)
    } else{
      setIsLoggedIn(false)
    }
  }

  const register = async (email, password, rePassword) => {
    await fetch("https://dummyjson.com/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        re_password: rePassword,
      }),
    })
      .then((res) => res.json())
      .then(console.log)
    console.log("registered")
  }
  const logout = () => {}

  return (
    <authContext.Provider
      value={{
        login,
        register,
        logout,
        isLoggedIn,
      }}
    >
      {children}
    </authContext.Provider>
  )
}
