import React from 'react'
import logo from '../../Assets/logouser.png';
import style from '../Profile/User.module.css';
import {PiCaretDownLight,PiCaretRightThin} from "react-icons/pi";
import { useState,useEffect } from 'react';
import {SlArrowUp} from "react-icons/sl";
import {BsChevronDown} from "react-icons/bs";
import {LiaAngleUpSolid} from "react-icons/lia";
import { useContext } from 'react';
import { UserContext } from '../../Context/MyContext';
const User = () => {
   const {handleClickedItems,handleLogOut,currentuser,loader,User} = useContext(UserContext);
   const myaccount = ["My Profile","My Address"];
   const myorders = ["All","Unpaid","Processing","Shipped","Delivered","Returns"];
   const helpcenter = ["Customer Service","Return Policy","Terms & Condition","Privacy Policy","Contact Us"];
   
   const [Value1,setValue1] = useState(false);
   const [mouseOverButton1, setmouseOverButton1] = useState(false);
    
   const [Value2,setValue2] = useState(false);
   const [mouseOverButton2, setmouseOverButton2] = useState(false);

   const [Value3,setValue3] = useState(false);
   const [mouseOverButton3, setmouseOverButton3] = useState(false);



     // handleOutside for for hidding the list display when clicking outside it.
  const handleOutside1 = () => {
    document.addEventListener("click", (e) => {
      setValue1(false);
    });
  };
  //useEffect for handling function handleOutside.
  useEffect(() => {
    handleOutside1();
  });

  // for handling the mousehover.
  useEffect(() => {
    if (mouseOverButton1) {
      setValue1(true);
    }
  }, [mouseOverButton1]);

     // handleOutside for for hidding the list display when clicking outside it.
     const handleOutside2 = () => {
      document.addEventListener("click", (e) => {
        setValue2(false);
      });
    };
    //useEffect for handling function handleOutside.
    useEffect(() => {
      handleOutside2();
    });
  
    // for handling the mousehover.
    useEffect(() => {
      if (mouseOverButton2) {
        setValue2(true);
      }
    }, [mouseOverButton2]);


     // handleOutside for for hidding the list display when clicking outside it.
     const handleOutside3 = () => {
      document.addEventListener("click", (e) => {
        setValue3(false);
        console.log("working 3")
      });
    };
    //useEffect for handling function handleOutside.
    useEffect(() => {
      handleOutside3();
    });
  
    // for handling the mousehover.
    useEffect(() => {
      if (mouseOverButton3) {
        setValue3(true);
      }
    }, [mouseOverButton3]);

   return (
    <>
    <div className={style.userLeft}>
    <div className={style.userLogo}>
      <div className={style.logoImg}>
        <img className={style.logoUser} src={logo} alt="logouser" />
        </div>
        <div className={style.leftHeading}>
         <h3 className={style.userLogoHeading}>{User.name}</h3>
         <h4 className={style.userLogoText}>Welcome to August</h4>
         </div>
    </div>
    <hr className={style.hrstyle}/>

 <div className={style.myOrders} onClick={() => setmouseOverButton1(!mouseOverButton1)}>
    <h3>My Account</h3>
    <div className={style.icon}>
      <span>{!mouseOverButton1?<BsChevronDown/>:<LiaAngleUpSolid/>}</span>
     
    </div>
  </div>


   {mouseOverButton1 &&(<div className={style.optionSelect}>
              {myaccount.map((item,i)=>(
                             <div
                             className={style.optionChoices}
                             onClick={() => setValue1(false)}
                             key={i}
                           >
                            {console.log(item)}
                             <span  onClick={()=>{handleClickedItems(item)}}>{item}</span>
                           </div>  
              ))} 


            </div>)}
  <hr/>
  <div className={style.myOrders} onClick={() => setmouseOverButton2(!mouseOverButton2)}>
    <h3>My orders</h3>
    <div className={style.icon}>
      <span>{!mouseOverButton2?<BsChevronDown/>:<LiaAngleUpSolid/>}</span>
    </div>
  </div>
  {mouseOverButton2 &&(<div className={style.optionSelect}>
              {myorders.map((item,i)=>(
                             <div
                             className={style.optionChoices}
                             onClick={() => setValue2(false)}
                             key={i}
                           >
                             <span  onClick={()=>{handleClickedItems(item)}}>{item}</span>
                           </div>  
              ))} 


            </div>)}
  <hr/>
  <div className={style.helpCenter} onClick={() => setmouseOverButton3(!mouseOverButton3)}>
    <h3>Help Center</h3>
    <div className={style.icon}>
      <span>{!mouseOverButton3?<BsChevronDown/>:<LiaAngleUpSolid/>}</span>
    </div>
  </div>
  {mouseOverButton3 &&(<div className={style.optionSelect}>
              {helpcenter.map((item,i)=>(
                             <div
                             className={style.optionChoices}
                             onClick={() => setValue3(false)}
                             key={i}
                           >
                             <span  onClick={()=>{handleClickedItems(item)}}>{item}</span>
                           </div>  
              ))} 


            </div>)}



  <hr/>
  <div className={style.logOut} onClick={handleLogOut}>
    <h3>LOG OUT</h3>
    <div className={style.icon}>
      <span ><PiCaretRightThin/></span>
    </div>
  </div>
  </div>
    </>

  )
}

export default User