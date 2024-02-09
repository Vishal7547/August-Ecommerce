import React, { useState, useEffect } from "react";

import style from "../Loader/Loader.module.css";
import { useNavigate } from 'react-router-dom';
const Loader = ({path="/authenticate"}) => {
  const [count, setCount] = useState(3);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 &&
      navigate(`${path}`);
    return () => clearInterval(interval);
  }, [count, navigate, path]);

  return (
    <div className={style.loaderContainer}>
    <div className={style.Loader}></div>
    </div>
  )
}

export default Loader