import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "./Slide.css"

// Import Swiper styles
import "swiper/css";
import { Autoplay,Mousewheel } from "swiper";

export default function Slide() {
  return (
    <div className="slide-swiper-container">
         <Swiper watchSlidesProgress={true} 
           slidesPerView={2.3}
           centeredSlides={false}
           mousewheel={true}
           autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        loop={true}
        loopFillGroupWithBlank={true}
        modules={[Autoplay,Mousewheel]}
        spaceBetween={0} 
          breakpoints={{
            456:{
              slidesPerView: 3,
              spaceBetween: 20,
            },
            540:{
              slidesPerView: 3,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 4.5,
              spaceBetween: 100,
            },
            768: {
              slidesPerView: 5.5,
              spaceBetween: 100,
            },
            1024: {
              slidesPerView: 8,
              spaceBetween: 50,
            }, 
          }}
         >
            <SwiperSlide className="swiper-slide2" ><img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ4Nnr0EXlQ19-PacJfNJJy9yrWga0ARxU-yfCnYqpjf6Ft1n-6" alt="brend-slide" /></SwiperSlide>
            <SwiperSlide className="swiper-slide2"><img src="https://logowik.com/content/uploads/images/590_vikoelektrik.jpg" alt="brend-slide" /></SwiperSlide>
            <SwiperSlide className="swiper-slide2"><img src="https://assets.asaxiy.uz/brand/webp//5ff6f8872a0db.webp" alt="brend-slide" /></SwiperSlide>
            <SwiperSlide className="swiper-slide2"><img src="https://assets.asaxiy.uz/brand/webp//603481675b122.webp" alt="brend-slide" /></SwiperSlide>
            <SwiperSlide className="swiper-slide2"><img src="https://assets.asaxiy.uz/brand/webp//605036814c07e.webp" alt="brend-slide" /></SwiperSlide>
            <SwiperSlide className="swiper-slide2"><img src="https://assets.asaxiy.uz/brand/webp//6067393b94990.webp" alt="brend-slide" /></SwiperSlide>
            <SwiperSlide className="swiper-slide2"><img src="https://assets.asaxiy.uz/brand/webp//6013a8b3bc61c.webp" alt="brend-slide" /></SwiperSlide>
     
   
        </Swiper>
    </div>
  )
}
