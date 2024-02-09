import React from 'react'
import style from "../Home/HomeBanner.module.css";
import { useContext } from 'react';
import { ProductContext } from '../../Context/MyContext';
const HomeBanner = () => {
    const {homeBanner} = useContext(ProductContext);
  return (
    <div className={style.bannerContainer}>
        <marquee  className={style.bannerletterscroll} direction="left" 
        behavior="infinite"
       >
      <span>{homeBanner}</span>
      <span>{homeBanner}</span>
      <span>{homeBanner}</span>
      <span>{homeBanner}</span>
      <span>{homeBanner}</span>
      <span>{homeBanner}</span>
      <span>{homeBanner}</span>
      <span>{homeBanner}</span>
      <span>{homeBanner}</span>
      <span>{homeBanner}</span>
      <span>{homeBanner}</span>
</marquee>
    </div>
  )
}

export default HomeBanner
