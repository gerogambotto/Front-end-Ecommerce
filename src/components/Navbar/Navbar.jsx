import React from "react"
import "./styles.scss"
import InputSearch from "../Search/imputSearch.jsx"
import HomeButton from "../HomeButton/HomeButton.jsx"
import { useNavigate } from "react-router-dom"
import categoriesClassification from "../../../categoriesClassification.json"
import Categories from "../Categories/Categories.jsx"
import { authGlobalState } from "../../context/authcontext/AuthContext"
import cart from "../../../public/assets/cart.svg"
export const Navbar = () => {
  const { isLoggedIn, logout } = authGlobalState()
  const { showCart, setShowCart } = authGlobalState(false)

  const navigate = useNavigate()

  return (
    <section className="navbar-section">
      <div className="container-fluid">
        <div className="navbar-top row justify-content-between">
          <div className="col-sm-2 d-flex justify-content-start align-items-center">
            <HomeButton />
          </div>
          <div className="col-sm-8 d-flex justify-content-center align-items-center">
            <InputSearch />
            <button
              className="ml-3 cart-button border-0"
              onClick={() => navigate("/cart")}
            >
              <img src={cart} className="cart-icon" alt="cart" />
            </button>
          </div>
          <div className="col-sm-2  d-flex justify-content-end align-items-center">
            {!isLoggedIn ? (
              <div className="login-register">
                <button
                  className="login-button"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="register-button ml-3"
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </div>
            ) : (
              <div className="login-register">
                <button
                  className="register-button"
                  onClick={() => logout()}
                >
                  Log out
                </button>
                <button
                  className="register-button ml-3"
                  onClick={() => setShowCart(!showCart)}
                >
                  Cart
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="navbar-bottom d-flex justify-content-center align-items-center">
          {categoriesClassification.map((e, key) => (
            <Categories
              category={e}
              key={key}
              border={
                key === categoriesClassification.length - 1
                  ? ""
                  : "custom-border"
              }
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Navbar
