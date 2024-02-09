import React from 'react'
import style from "../Home/BestSeller.module.css";
import { Virtual, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useContext } from 'react';
import { ProductContext } from '../../Context/MyContext';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const BestSelller = () => {
    const{topProduct} = useContext(ProductContext);
  return (
    <div>
   <div className="container-fluid">
    <div className={style.BestSellerTopic}>
        <span className={style.bestsellerspan}>Best Seller</span>
        <span className={style.bestsellershopnow}>SHOP NOW ></span>
    </div>
    <div className="row">
         <Swiper 
        modules={[Virtual, Navigation, Pagination]}
        slidesPerView={5}
        centeredSlides={false}
        spaceBetween={10}
        // pagination={{
        //   type:'fraction',
        // }}
        navigation={true}
        virtual
      >
        {topProduct.map((p, index) => (
          <SwiperSlide key={p.id} virtualIndex={index}>
          <div className={style.card}>
           <div className={style.productimg}><img alt={p.name} src={p.photo.url}/></div>
           <div className={style.info}>
             <div className={style.clothesname}>{p.name}</div>
             <div className={style.topclothesprice}>₹{p.price}</div>
           </div>
          </div>
         </SwiperSlide>
         
   
        ))}

      </Swiper>
    </div>
   </div>
    </div>
  )
}

export default BestSelller
