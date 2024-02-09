import React from "react";
import { FcGoogle } from "react-icons/fc";
import style from "../Register/SignUp.module.css";
import { useContext } from "react";
import { UserContext } from "../../Context/MyContext";
import GoogleLogin from "./GoogleLogin";
const SignUp = () => {
  let { name, email, password, setEmail, setName, setPassword, handleSubmitSignup,loader } = useContext(UserContext);

  return (
    <>
      <div className={style.form}>
        <form onSubmit={handleSubmitSignup}>
          <div className={style.input}>
            <div className={style.emailHeader}>
              <span>*Enter your name</span>
            </div>
            <input
              value={name}
              className={style.emailInput}
              type='text'
              placeholder='Enter Name'
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={style.input}>
            <div className={style.emailHeader}>
              <span>*Sign up using Email</span>
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
              autoComplete="off"
            />
          </div>

          <button className={style.btnSignup}>
            SIGNUP
          </button>
        </form>
       <GoogleLogin/>
      </div>
    </>
  );
};

export default SignUp;