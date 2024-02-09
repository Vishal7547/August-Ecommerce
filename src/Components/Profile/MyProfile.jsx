import React from "react";
import style from "./MyProfile.module.css";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../Context/MyContext";
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "../../Firebase/Firebase";
const MyProfile = () => {
  const {Myprofile,setMyprofile,handleConfirm,Categories,setCategories,User} = useContext(UserContext);
  const user = JSON.parse(window.localStorage.getItem("August"));
  // const [emailVerified,setEmailVerified] =);

  const handleSelect = (index) => {
    const datacategory = Categories.map((item, i) => {
      if (i == index) {
        return { ...item, show: !item.show };
      }
      return item;
    });
    setCategories(datacategory);
  };
 const handleEmailVerifyProfile =()=>{
  const actionCodeSettings = {
    url: 'http://localhost:3000/userprofile',
    handleCodeInApp: true,

  };
  sendSignInLinkToEmail(auth,"btech15234.18@bitmesra.ac.in", actionCodeSettings)
    .then(() => {

      alert("sent email verification link on your email!!")
      console.log("doneeeeeeee");
    })
    .catch((error) => {
     console.log(error);
    });
 }

  return (
    <>
      <div className={style.namefield}>
        <span className={style.nametitle}>*Name</span>
        <input type="text" required value={Myprofile.Name} onChange={(e) => {
    setMyprofile((prevProfile) => ({
      ...prevProfile,
      Name: e.target.value,
    }));
  }}/>
      </div>
      <div className={style.birthday}>
        <span className={style.birthdaytitle}>Birthday</span>
        <input type="date" onChange={(e) => {
    setMyprofile((prevProfile) => ({
      ...prevProfile,
      birthday: e.target.value,
    }));
  }} />
      </div>
      <div className={style.gender}>
        <p className={style.gendertitle}>Gender</p>
        <br />
        <input
          className={style.inputgender}
          type="radio"
          value="Female"
          checked={Myprofile.gender == "Female"}
          onChange={(e) => {
            setMyprofile((prevProfile) => ({
              ...prevProfile,
              gender: e.target.value,
            }));
          }} 
        />
        Female
        <input className={style.inputgender} type="radio"  value="Male"
          checked={Myprofile.gender == "Male"}
          onChange={(e) => {
            setMyprofile((prevProfile) => ({
              ...prevProfile,
              gender: e.target.value,
            }));
          }}
 />
        Male
        <input className={style.inputgender} type="radio" value="Other"
          checked={Myprofile.gender == "Other"}
          onChange={(e) => {
            setMyprofile((prevProfile) => ({
              ...prevProfile,
              gender: e.target.value,
            }));
          }}
/>
        Other
       

      </div>
      <div className={style.categoryPreferences}>
        <span className={style.categorytitle}>Category Preferences</span>
        <div className={style.categories}>
          {Categories.map((item, index) => (
            <div
              className={style.partiularcat}
              id={item.show && style.partiularcat}
              key={index}
              onClick={() => handleSelect(index)}
            >
              {item.type}
            </div>
          ))}
        </div>
        <button className={style.confirm} onClick={handleConfirm} >Confirm</button>
      </div>
      <div className={style.verify}>
        <div className={style.phone}>
          <div className="phoneleft">
            <span className={style.phoneheading}>Phone Number</span>
            <br />
            <span className={style.phonepara}>
              After verifying your phone number, you can directly log in with
              it.
            </span>
          </div>
          <div className={style.phoneright}>
            <a href="#">Add</a>
          </div>
        </div>
        <hr />
        <div className={style.email}>
          <div className="emailleft">
            <span className={style.emailheading}>Email</span>
            <br />
            <span className={style.emailpara}>
            {user?.email}
            </span>
          </div>
          <div className={style.emailright}>
            <span onClick={()=>{!user.emailVerified && handleEmailVerifyProfile()}}>{user.emailVerified?"Verified":"Verify"}</span>
            <a href="#">Change</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
