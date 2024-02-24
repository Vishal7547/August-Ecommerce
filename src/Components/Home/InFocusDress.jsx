import React from "react";
import style from "../Home/InFocusDress.module.css";
import { useContext } from "react";
import { ProductContext } from "../../Context/MyContext";
import { useNavigate } from "react-router-dom";
const InFocusDress = () => {
  const { inFocusPhoto, inFocusVideo } = useContext(ProductContext);
  const navigate = useNavigate();
  return (
    <div className={style.InFocusContainer}>
      <div className={style.headingInFocus}>
        <h1>In focus: Dresses</h1>
      </div>
      <div className={style.InFocusBox}>
        <div
          className={style.InFocusLeft}
          onClick={() => navigate(`/category/${inFocusPhoto?.id}`)}
        >
          <img src={inFocusPhoto?.url} alt="Infocusimg" />
          <span className={style.infocspanright}>
            {inFocusPhoto?.category} >
          </span>
        </div>
        <div
          className={style.InFocusRight}
          onClick={() => navigate(`/category/${inFocusVideo?.id}`)}
        >
          <video src={inFocusVideo?.url} autoPlay loop muted></video>
          <span className={style.InFocusRightvideospan}>
            {inFocusVideo?.category} >
          </span>
        </div>
      </div>
    </div>
  );
};

export default InFocusDress;
