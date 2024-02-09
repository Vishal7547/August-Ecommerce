import React from 'react'
import { FcGoogle } from "react-icons/fc";
import style from "./GoggleLogin.module.css";
import { UserContext } from '../../Context/MyContext';
import { useContext } from 'react';



const GoogleLogin = () => {
let {handleGoggleLogin} = useContext(UserContext);
    return (

   <>
    <div className={style.fotterlogin}>
            <span className={style.fotterlogins}>or sign up/login with</span>
            <div className={style.fotterloginIcon}>
              <FcGoogle onClick={handleGoggleLogin}/>
            </div>
            <span className={style.fotterloginp}>
              <span className={style.fotterlogins}>I agree to</span> T&C <span className={style.fotterlogins}> and </span> Privacy Policy <br />
              Return&Refund | Shipping | Contact us
            </span>
          </div>
   </>
  )
}

export default GoogleLogin