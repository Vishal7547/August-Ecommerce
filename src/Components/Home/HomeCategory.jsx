import React from 'react'
import { Virtual, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import style from "../Home/HomeCategory.module.css";
import { useContext } from 'react';
import { ProductContext } from '../../Context/MyContext';
import { useNavigate } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const HomeCategory = () => {
    const {category} = useContext(ProductContext);
   const navigate = useNavigate();
  return (
    <div>
         <div className="container-fluid" id={style.categoryouter}>
    <div className="row">
    <Swiper
        modules={[Virtual, Navigation, Pagination]}
        slidesPerView={2.5}
        centeredSlides={false}
        spaceBetween={0}
        navigation={true}
        virtual
      >
        {category.categories?.map((c,index) => (
          <SwiperSlide id={style.categorySlider} key={c.id} virtualIndex={index} onClick={()=>navigate(`/category/${c.id}`)}>
                    <img alt={c.category} src={c.url}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
   </div>
    </div>
  )
}

export default HomeCategory
