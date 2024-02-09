import React from 'react'
import style from "./Error.module.css";
import {useNavigate} from 'react-router-dom';

const Error = () => {
  let navigate = useNavigate();

  return (
    <>
    <div className={style.containerError}>
   <div className={style.num}>
    <span>404</span>
   </div>
     <div className={style.pagenotfound}>
      <p>The Page you're looking doesn't seem to exist.</p>
      </div>
      <button className={style.btn} onClick={()=>navigate("/")}>Go to Home</button>
      </div>
     </>
)
}

export default Error