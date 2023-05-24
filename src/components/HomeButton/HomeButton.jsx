import React from "react";
import {useNavigate} from "react-router-dom";
import "./styles.scss";
import logo from '../../../public/assets/logos/logo.png'

function HomeButton() {
  const navigate = useNavigate();

  return (
    <div className="menu">
      <img
        className="logo"
        src={logo}
        alt='logo'
        onClick={()=>navigate('/')}
      />
    </div>
  );
}

export default HomeButton;
