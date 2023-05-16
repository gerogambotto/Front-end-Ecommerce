import React, { useState, useEffect } from "react"
import { Layout } from "../../components/Layout/Layout.jsx"
import "./styles.scss"
import { authGlobalState } from "../../context/authcontext/AuthContext.jsx"

export function LoginPage() {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  const { login } = authGlobalState()
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(null)
  const [validPassword, SetValidPassword] = useState(false)

  const [email, setEmail] = useState("")
  const [mailError, setMailError] = useState(null)

  const [validEmail, setValidEmail] = useState(false)

  function isEmail(emailAdress) {
    if (emailAdress.match(regex)) return true
    else return false
  }



  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      if (validEmail && validPassword) {
        await login(email, password)
      }
    } catch (error) {
    }
  }



  useEffect(() => {
    setValidEmail(isEmail(email))
  }, [email])


 
  useEffect(() => {
    if (validEmail) {
      setMailError(null)
    } else {
      setMailError("Invalid email")
    }
  }, [validEmail])




  useEffect(() => {
    if (password.length <= 4) {
      SetValidPassword(false)
      setPasswordError("Passwords must be at least 5 characters")
    } else {
      SetValidPassword(true)
      setPasswordError(null)
    }
  }, [password])


  return (
    <Layout>
      <section className="login-section">
        <div className="form-body-login">
          <form onSubmit={handleSubmit} className="form-login">
            <div className="title">Login</div>
            <div>
              <div className="input__box">
                <input
                  name="userMail"
                  placeholder="Email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="input__box">
                <input
                  name="Password"
                  placeholder="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button disabled={!validEmail || !validPassword} className="login-button">Login</button>
              {mailError && email.length !== 0 && (
                <h5 style={{ color: "blue" }}>{mailError}</h5>  
              )}
              {passwordError && password.length !== 0 &&(
                <h5 style={{ color: "red" }}>{passwordError}</h5>  
              )}
            </div>
          </form>
        </div>
      </section>
    </Layout>
  )
}
