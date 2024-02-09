import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../../Context/MyContext';

const ResetPassword = () => {
const {Reset,setReset,handleReset} = useContext(UserContext);
  return (
    <>
    <input type="email" placreholder="Enter your email" value={Reset} onChange={(e)=>setReset(e.target.value)}/>
     <button onClick={handleReset}>Submit</button>
    </>
    )
}

export default ResetPassword