import { useEffect, useRef, useState } from "react"
import { Layout } from "../../components/Layout/Layout.jsx"
import "./styles.scss"
import { authGlobalState } from "../../context/authcontext/AuthContext.jsx"

export function RegisterPage() {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  const { register } = authGlobalState()
  const [mailError, setMailError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rePassword, setRePassword] = useState("")
  const [validPassword, SetValidPassword] = useState(false)
  const [validEmail, setValidEmail] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    try {
      if(validEmail && validPassword){
        await register({ email, password ,rePassword})
      }
    } catch (error) {
      console.error("Register error", error)
    }
  }

  function isEmail(emailAdress) {
    if (emailAdress.match(regex)) return true
    else return false
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
    if (password !== rePassword) {
      SetValidPassword(false)
      setPasswordError("Passwords don't match")
    } else if (password.length <= 4 || rePassword.length <= 4) {
      SetValidPassword(false)
      setPasswordError("Passwords must be at least 5 characters")
    } else {
      SetValidPassword(true)
      setPasswordError(null)
    }
  }, [password, rePassword])

  return (
    <Layout>
      <section className="register-section">
        <div className="form-body-register">
          <form className="form-register" onSubmit={handleSubmit}>
            <div className="title">Registration</div>

            <div className="input__box">
              <input
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                placeholder="Email"
                type="email"
              />
            </div>

            <div className="input__box">
              <input
                name="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                type="password"
              />
            </div>

            <div className="input__box">
              <input
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={(e) => {
                  setRePassword(e.target.value)
                }}
                type="password"
              />
            </div>
            <div>
              <button disabled={!validEmail || !validPassword} className="register-button"> 
                Register
              </button>

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
