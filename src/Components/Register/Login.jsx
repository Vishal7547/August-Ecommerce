import React from 'react';
import style from './Login.module.css';
import { FcGoogle } from "react-icons/fc";
import { useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import { UserContext } from '../../Context/MyContext';
import GoogleLogin from './GoogleLogin';
const Login = () => {
  let { email, password, setEmail, setPassword, handleSubmitLogin,loader } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <>
       <div className={style.form}>
      <form onSubmit={handleSubmitLogin}>
     
          <div className={style.input}>
            <div className={style.emailHeader}>
              <span>*Log in using Email</span>
            </div>
            <input
              value={email}
              className={style.emailInput}
              type='text'
              placeholder='Enter Email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="otp">
            <div className={style.password}>
              <span>*Enter Password</span>
            </div>
            <input
              value={password}
              className={style.passwordInput}
              type='password'
              placeholder='Enter Password'
              onChange={(e) => setPassword(e.target.value)}
              autoComplete='off'
            />
          </div>
          <span className={style.forgot} onClick={()=>navigate("/reset")}>Forgot Password ?</span>
          <button className={style.btnlogin}>
            Login
          </button>
          </form>
<GoogleLogin/>
        </div>
     
    </>
  );
};

export default Login;