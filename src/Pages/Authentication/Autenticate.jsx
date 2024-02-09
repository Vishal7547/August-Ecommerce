import LoginReg from "../../Components/Register/LoginReg";
import React from "react";
import style from '../Authentication/Autenticate.module.css';
import { useContext } from "react";
import { UserContext } from '../../Context/MyContext';
const Autenticate = () => {

  return (
    <>
    <div className={style.heading}>
        <h1>My Account</h1>
    </div>
      <LoginReg />
    </>
  );
};

export default Autenticate;
