// import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import bgimg1 from '../../../../assets/benkay-cropped.jpg'
import bgimg2 from '../../../../assets/Image by LuAnn Hunt.webp'
import bgimg3 from '../../../../assets/nm-9-myths-about-donating-blood_preview.jpg'
import bgimg4 from '../../../../assets/seo-341-bs-donorship-7490684-1200x675.jpg'
import Slide from './Slide';

export default function Banner() {
  return (
    <div className='md:mx-8 lg:mx-10'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
            <Slide image={bgimg1}></Slide>
        </SwiperSlide>
        <SwiperSlide>
            <Slide image={bgimg2}></Slide>
        </SwiperSlide>
        <SwiperSlide>
            <Slide image={bgimg3}></Slide>
        </SwiperSlide>
        <SwiperSlide>
            <Slide image={bgimg4}></Slide>
        </SwiperSlide>
       
      </Swiper>
    </div>
  );
}
