import React from 'react'
import style from "../Home/EveryMood.module.css";
import { useContext } from 'react';
import { ProductContext } from '../../Context/MyContext';
import { useNavigate } from 'react-router-dom';
const EveryMood = () => {
  const {homeEveryMood} = useContext(ProductContext);
  const navigate = useNavigate();
  return (
    <div className={style.youreverymoodcontainer}>
     <div className={style.youreverymoodheading}>You are every mood</div>
     <div className={style.youreverymoodbox}>
      {homeEveryMood?.map((m,i)=>(
           <div className={style.divimage} key={m.id} onClick={()=>navigate(`/category/${m?.id}`)}>
            <img src={m.url} alt={m.category} />
          <div className={style.everymoodsubheading}>
           <span className={style.everymoodsubhed}>
            {m.category}</span>

          </div>
           </div>
      ))}

     </div>
    </div>
  )
}

export default EveryMood
