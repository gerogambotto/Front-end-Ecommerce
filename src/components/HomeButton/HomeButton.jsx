import React from "react";
import {useNavigate} from "react-router-dom";
import "./styles.scss";

function HomeButton() {
  const navigate = useNavigate();

  return (
    <div className="menu">
      <img
        className="logo"
        src="/assets/logos/telar_logo.png"
        alt='logo'
        onClick={()=>navigate('/')}
      />
    </div>
  );
}

export default HomeButton;
