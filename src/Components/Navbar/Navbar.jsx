import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import {useContext} from 'react'
import { UserContext,ProductContext} from '../../Context/MyContext';
import style from '../Navbar/Navbar.module.css';
import {CiSearch} from 'react-icons/ci';
import {CiUser} from 'react-icons/ci';
import {PiBagLight} from 'react-icons/pi';
import {TfiHelpAlt} from 'react-icons/tfi';
import logo from '../../Assets/logo.png';


const Navbar = () => {
  let {currentuser} = useContext(UserContext);
  const {category,homeEveryMood,handleSearch} = useContext(ProductContext);
  const arr=[];
  const handlenavcat =()=>{
    for(let i=0;i<category?.categories?.length;i++){
      arr.push(category?.categories[i]?.id);
    
    }
    console.log("print the array",arr);
  }
  handlenavcat();
  console.log("CURRENTUSER",currentuser);
  let navigate = useNavigate();



  return (
    <>
     <div className={style.nav}>
     <div className={style.navLeft}>
      <div className={style.logo}>
          <img src={logo} alt="logo" onClick={()=>navigate("/")}/>
        </div>
        <div className={style.menuLink}>
        <div className={style.menu} onClick={()=>navigate("/product")}>NEW IN</div>
        <div className={style.menu} onClick={()=>navigate(`/category/${arr[0]}`)} >CLOTHINGS</div>
        <div className={style.menu} onClick={()=>navigate(`/category/${arr[1]}`)} >DRESSES</div>
        <div className={style.menu} onClick={()=>navigate(`/category/${arr[2]}`)}  >DENIM</div>
        <div className={style.menu} onClick={()=>navigate(`/category/${homeEveryMood[0].id}`)} >SPORTS</div>
     </div>
     </div>
     <div className={style.navRight}>
     <div className={style.icons}><CiSearch fontSize={20} onClick={handleSearch}/></div>
    { !currentuser?<Link to='/authenticate'><div className={style.icons}><CiUser fontSize={20}/></div></Link>
     :<Link to='/userprofile'><div className={style.icons}><CiUser fontSize={20}/></div></Link>
    }
     <div className={style.icons}><PiBagLight fontSize={20} onClick={()=>navigate('/cart')}/></div>
     <div className={style.icons}><TfiHelpAlt fontSize={17}/></div>    
    </div>   
     </div>     
    </>
  )
}

export default Navbar


// echo "# ecommerce" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/Mansi523/ecommerce.git
// git push -u origin main