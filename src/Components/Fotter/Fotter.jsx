import React from 'react'
import "../../Style/Fotter.css";
import flogo from "../../Assets/apple store.webp";
import comment from "../../Assets/comment.png";
import { PiInstagramLogoFill } from "react-icons/pi";
import { FaSquareTwitter } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import apple from "../../Assets/app-store.png";
import play from "../../Assets/google-play.png";
import logo from "../../Assets/logo.png";
const Fotter = () => {
  return (
    <div className="ftcontainer">
    <div className="ftupper">
    <div className="ftupperleft">
      <img height={100} src={flogo} alt="logofotter" />
    </div>
    <div className="ftupperright">
      <img   height={130} src={comment} alt="comment" />
    </div>
    </div>
    <hr className='fthr'/>
    <div className="ftmiddle">
     <div className="ftwelcome">
      <span className='ftheadmiddle'>Welcome</span>
      <h5 className='ftsubh5'>Soical Responsiblity</h5>
      <h5 className='ftsubh5'>Sustainiblity</h5>
      <h5 className='ftsubh5'>Our Factory</h5>
      <h5 className='ftsubh5'>About Us</h5>
     </div>
     <div className="ftcontact">
      <span className='ftheadmiddle'>Contact us</span>
      <h5 className='ftsubh5'>Support:Support@August.com</h5>
      <h5 className='ftsubh5'>Legal:legal.india@August.com</h5>
      <h5 className='ftsubh5'>Press:press.india@August.com</h5>
     </div>
     <div className="fthelp">
     <span className='ftheadmiddle'>Help</span>
     <h5 className='ftsubh5'>Payment Method</h5>
      <h5 className='ftsubh5'>Shipping & Delivery</h5>
      <h5 className='ftsubh5'>Return Policy</h5>
     </div>
     <div className="ftpolicies">
      <span className='ftheadmiddle'>Policies</span>
      <h5 className='ftsubh5'>Terms & Condition </h5>
      <h5 className='ftsubh5'>Privacy Policy</h5>
     </div>
    </div>
    <div className="ftlower">
     <div className="fticons">
      <div className="ftsoical">
      <PiInstagramLogoFill fontSize={40} color='#000' />
      </div>
      <div className="ftsoical">
      <FaSquareTwitter fontSize={40} color='#000'/>
      </div>
      <div className="ftsoical">
      <FaFacebookSquare fontSize={40} color='#000' />
      </div>
     </div>
     <div className="fticonimg">
      <div className="ficon-img">
      <img height={30} src={apple} alt="applestore" />
      </div>
 <div className="ficon-img">
 <img height={30} src={play} alt="playstore" />
 </div>
     </div>
     <div className="fticonlogo">
      <img height={30} src={logo} alt="logo" />
     </div>
     <div className="ftparalast">
      <span>August, 119 Marylebone Road, London, United Kingdom. Copyright © AUGUST (LONDON) All rights reserved</span>
     </div>
  
     <div className="ftsomeiconsimg">
      <div className="ftsmiconimg">
      <img height={20} src="https://static2.urbanic.com/images/ui/third/mastercard.png" alt="mastercard" />
      </div>
     <div className="ftsmiconimg">
     <img height={20} src="https://static2.urbanic.com/images/ui/third/visa.png" alt="visa" />
     </div>
     <div className="ftsmiconimg">
     <img  height={20} src="https://static2.urbanic.com/images/ui/third/americanexpress.png" alt="americanexpress" />
     </div>
     <div className="ftsmiconimg">
     <img height={20} src="https://static2.urbanic.com/images/ui/third/bhim.png" alt="bhim" />
     </div>
     <div className="ftsmiconimg">
     <img height={20} src="https://static2.urbanic.com/images/ui/third/rupay.png" alt="rupay" />
     </div>
     <div className="ftsmiconimg">
     <img height={20} src="https://static2.urbanic.com/images/ui/third/diners-club.png" alt="denis cod" />
     </div>
     <div className="ftsmiconimg">
     <img height={20} src="https://static2.urbanic.com/images/ui/third/paytm.png" alt="patym" />
     </div>
     <div className="ftsmiconimg">
     <img height={20} src="https://static2.urbanic.com/images/ui/third/mobilebank.png" alt="bank" />
     </div>
      <div className="ftsmiconimg">
      <img height={20} src="https://static2.urbanic.com/images/ui/third/256bitssl.png" alt="security" />
       </div>
     </div>
    </div>
    </div>
  )
}

export default Fotter
