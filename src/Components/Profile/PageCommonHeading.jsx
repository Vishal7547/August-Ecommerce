import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../../Context/MyContext';

const PageCommonHeading = ({label}) => {
  const {heading} = useContext(UserContext);
  return (
    <div style={{textAlign:"center"}}><h1>{heading}</h1></div>
  )
}

export default PageCommonHeading;