import React from 'react'
import style from "./FinalAddress.module.css";
import {AiOutlineDelete,AiOutlineEdit} from "react-icons/ai";
import { useContext } from 'react';
import { UserContext } from '../../Context/MyContext';
import {IoIosRadioButtonOff,IoCheckmarkCircle} from "react-icons/io";
import {MdCheckCircle} from "react-icons/md";
const FinalAddress = () => {
  const {User,handleAddressDelete,handleAddressUpdate,handleDefaultAddress} = useContext(UserContext);

  console.log("some data needed to be added");
  return (
    <>
    {User.address.map((address,i)=>(
 <div className={style.containerwhole} key={i}>
 <div className={style.containeraddress}>
    <div className={style.left}>
    <div className={style.address}>
    <span>{address.Address}</span>
    <span>{address.Locality}</span>
    <span>{address.City}</span>
    <span>{address.State}</span>
    <span>{address.Pincode}</span>
    </div>
    <div className={style.details}>
     <span>{address.Fullname}</span>
     <span>{address.MobileNo}</span>
    </div>
    </div>
    <div className={style.right}>
      <div className={style.radiobtn}>
         <div className={style.icons}>
            {
               address.id==User.defaultaddress.id ? <MdCheckCircle fontSize={20}/>:<IoIosRadioButtonOff fontSize={20} onClick={()=>handleDefaultAddress(address)}/>
            }
       
       </div>
       <span >{ address.id==User.defaultaddress.id ? "Default":"Set As Default Address"}</span>
     </div>
     
     <div className={style.icon}>
     <AiOutlineEdit fontSize={15} onClick={()=>handleAddressUpdate(address)}/>
     </div>
     <div className={style.icon}>
     <AiOutlineDelete fontSize={15} onClick={()=>handleAddressDelete(address)}/>
     </div>

    </div>
 </div>
 </div>

    ))
   
}
     </>
    )
}

export default FinalAddress