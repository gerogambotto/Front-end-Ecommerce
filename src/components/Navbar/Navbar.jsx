import React, { useEffect, useState } from "react";
import "./styles.scss";
import InputSearch from "../Search/imputSearch.jsx";
import HomeButton from "../HomeButton/HomeButton.jsx";
import { useNavigate } from "react-router-dom";
import categoriesClassification from "../../../categoriesClassification.json";
import Categories from "../Categories/Categories.jsx";

export const Navbar = () => {
  const [userIsLogged, setUserIsLogged] = useState(false);
  const [inputValue, setInputValue] = useState(" ");

  const navigate = useNavigate()
  const logOut = () => {
    localStorage.removeItem("token");
    setUserIsLogged(false);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUserIsLogged(true);
    }
  }, []);

  return (
    <section className='navbar-section'>
      <div className="container-fluid">
        <div className="navbar-top row justify-content-between">
          <div className='col-sm-2 d-flex justify-content-start align-items-center'>
            <HomeButton />
          </div>
          <div className='col-sm-8 d-flex justify-content-center align-items-center'>
            <InputSearch value={inputValue} setInputValue={setInputValue} />
          </div>
          <div className='col-sm-2 d-flex justify-content-end align-items-center'>
            {!userIsLogged ? (
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
                <button className="login-register-button" onClick={logOut}>
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="navbar-bottom d-flex justify-content-center align-items-center">
          {categoriesClassification.map(e => <Categories category={e} key={e.id}/>)}
        </div>
      </div>
    </section>
  );
};

export default Navbar;
