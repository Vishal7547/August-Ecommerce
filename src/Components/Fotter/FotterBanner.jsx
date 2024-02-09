import React from 'react'
import "../../Style/FotterBanner.css"
import fotterimg from "../../Assets/fotter.webp";
import userlogo from "../../Assets/userlogo.png";
import { useNavigate } from 'react-router-dom';
const FotterBanner = () => {
  const navigate = useNavigate();
  return (

    <div className="containerftb row mt-5">
      <div className="leftfotter col-6">
              <span className="ftbheading">We are because</span><br/>
            <span className="ftbheading">the planet is</span><br/>
            <p className="ftbpara">"With conscious efforts and unwavering commitment to our core values, 
                we seek to create a lasting positive impact by using our resources wisely, following best practices that benefit society and the planet"</p>
      <h6 className='lastftb'>KNOW MORE</h6>
      </div>
      <div className="rightfotter col-6">
    <img src={fotterimg} alt="fotterbanner" />
      </div>
      <div className="row btmftb">
        <div className="col-12">
          {/* <img src={userlogo} alt="userlogo" /> */}
          <span className="logoftb" >Au</span>
          <div className="ftblogocap"><span>You are invited:Not</span></div>
          <div className="ftblogocap"><span>part of this list yet?</span></div>
          <input
           type="text" 
           placeholder='Enter your e-mail'   

          />
        </div>
      </div>
    </div>
  )
}

export default FotterBanner
