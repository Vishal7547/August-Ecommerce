import React from 'react'
import { Virtual, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import style from "../Home/TopProduct.module.css";
import { useContext } from 'react';
import { ProductContext } from '../../Context/MyContext';
import {useNavigate } from 'react-router-dom';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
const TopProduct = () => {
  const{topProduct} = useContext(ProductContext);
  const navigate = useNavigate();
  console.log("product",topProduct);
  return (
    <div>
   <div className="container-fluid">
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
          <SwiperSlide key={p.id} virtualIndex={index}  onClick={()=>navigate(`/details/${p?.id}`)}>
           <div className={style.card}>
            <div className={style.productimg}><img alt={p.name} src={p.photo.url}/></div>
            <div className={style.info}>
              <div className={style.clothesname}>{p.name}</div>
              <div className={style.topclothesprice}>₹{p.price}</div>
            </div>
           </div>
          </SwiperSlide>
         
   
        ))}
       <SwiperSlide>
         <div className={style.viewmore}>
         <h3 onClick={()=>navigate("/product")}>View More</h3>
         </div>
          </SwiperSlide>
      </Swiper>
    </div>
   </div>
    </div>
  )
}

export default TopProduct
