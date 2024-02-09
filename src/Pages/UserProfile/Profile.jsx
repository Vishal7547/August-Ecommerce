import React from 'react'
import User from '../../Components/Profile/User';
import NoOrder from '../../Components/Profile/NoOrder';
import Loader from '../../Components/Loader/Loader';
import Empty from '../../Components/Profile/Empty';
import InitialAdress from '../../Components/Profile/InitialAdress';
import MyProfile from '../../Components/Profile/MyProfile';
import PageCommonHeading from '../../Components/Profile/PageCommonHeading';
import Error from '../NotFound/Error';
import style from '../UserProfile/Profile.module.css';
import { useContext } from 'react';
import { UserContext } from '../../Context/MyContext';
import { OrderContext } from '../../Context/MyContext';
import FinalAddress from '../../Components/Profile/FinalAddress';
import All from '../../Components/Profile/All';
const Profile = () => {
  const {heading} = useContext(UserContext);
  const {orderPurchaseCart,processing,deliverd,shipped,handlePageChangeS,handlePageChangeP,handlePageChangeD,
    currentProcessingPage,currentDeliveredPage,currentShippedPage,totalPageDelivered,
    totalPageProcessing,totalPageShipped,totalPage,currentPage,handlePageChange}= useContext(OrderContext);

  return (
   
    <>
         <div className={style.Up}>
          <div className={style.upLeft}>

          </div>
          <div className={style.upRight}>
          <PageCommonHeading/>
         
          </div>
          
        </div>
     <div className={style.userProfile}>
      <div className={style.left}>
          <User/>
      </div>
      <div className={style.right}>

        <div className={style.Down}>
          <div className={style.divinside}>
            {
            heading === "All" ? orderPurchaseCart?.length>0?<All type="All" 
            totalPage={totalPage}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            />:<NoOrder/>: null
            }
            {
            heading === "Unpaid" ? <NoOrder/>: null
            }
            {
            heading === "Processing" ? processing?.length>0?<All type="Processing"
            totalPage={totalPageProcessing}
            handlePageChange={handlePageChangeP}
            currentPage={currentProcessingPage}
            status={processing}/>:<NoOrder/>: null
            }

           {
            heading === "Shipped" ? shipped?.length>0?<All type="Shipped"
            totalPage={totalPageShipped}
            handlePageChange={handlePageChangeS}
            currentPage={currentShippedPage}
            status={shipped}/>:<NoOrder/>: null
            }
            {
            heading === "Delivered" ? deliverd?.length>0?<All type="Delivered"
            totalPage={totalPageDelivered}
            handlePageChange={handlePageChangeD}
            currentPage={currentDeliveredPage}
            status={deliverd}/>:<NoOrder/>: null
            }
              {
           
           heading === "Returns" ? <Empty/> : null
           }


              {
           
           heading === "My Profile" ? <MyProfile/> : null
           }
              {
           
           heading === "My Address" ? <InitialAdress/> : null
           }
           </div>
        </div>
      </div>
     </div>

    </>
  )
}

export default Profile