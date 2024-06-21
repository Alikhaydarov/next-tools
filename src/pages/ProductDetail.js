import React,{useEffect,useState,useRef} from 'react'
import { useParams } from 'react-router-dom'
import {BiHeart} from 'react-icons/bi'
import {BsFillStarFill,} from 'react-icons/bs'
import {MdShoppingBasket} from "react-icons/md"
import {RxDotFilled} from "react-icons/rx"
import { TiMessage } from 'react-icons/ti'
import { useTranslation, } from 'react-i18next';
import {FaFacebookF,FaTelegramPlane,FaTwitter,FaWhatsapp} from "react-icons/fa"
import Title from './title'
// import axios

import "./ProductDetail.css"
//Swiper.js 
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import "swiper/css/navigation";


// import "./styles.css";

// import required modules
import { EffectCube, Pagination,Navigation,Mousewheel} from "swiper";
import axios from './../service/api';

export default function ProductDetail({closeSearch}) {
  const { t , i18n} = useTranslation();

  const closeSerch =()=>{
    closeSearch('')
  }

    const [data,setData] = useState([])
    let {id} = useParams()
    console.log(id)
    useEffect(()=>{
      const getData = async () => {
        try {
          const res = await axios.get(`/products/${id}`)
          // console.log(res)
          setData(res.data)
        } catch (error) {
          console.log(error)
        }
      }
      getData()
    },[id])
    console.log(data)
    const {discountPercentage,title,translations,price,brand,image_main,description,img1,img2,img3,count,ru,uz} = data
  return (
    <div className="product-container">
        <div className='product-detail-container'>
          <div className="swiper-container" onClick={closeSerch}>
            {/* <button ><BiHeart size={20}/></button> */}
            <Swiper
                  style={{cursor:"zoom-in"}}
                  modules={[EffectCube, Pagination,]}
                  effect={"cube"}
                  cubeEffect={{
                    shadow: false,
                    slideShadows: true,
                  }}
                  pagination={true}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <img className='img' src={image_main} alt='img'/>
                  </SwiperSlide>
                  <SwiperSlide>
                    <img  className='img' src={img1} alt='img'/>
                  </SwiperSlide>
                  <SwiperSlide>
                    <img  className='img' src={img2} alt='img'/>
                  </SwiperSlide>
                  <SwiperSlide>
                    <img  className='img' src={img3} alt='img'/>
                  </SwiperSlide>
              </Swiper>
          </div>
          <div className="product-info-container">

              <div className="product-info-item">
                <h4>{title}</h4>
                <span>${price}</span>
                {/* {data.map((item)=>
                      <Title item={item}/>
                )} */}
              </div>
              {/* <div className="product-status-item">
                <div className="stars-container">
                  <BsFillStarFill className='product-star'/>
                  <BsFillStarFill className='product-star'/>
                  <BsFillStarFill className='product-star'/>
                  <BsFillStarFill className='product-star'/>
                  <BsFillStarFill className='product-star'/>
                  <span><TiMessage/>0 {t('Cardlang.card2')}</span>
                </div>
              </div> */}
              <div className="brend-container">
                <div className="brend-item">
                  <span style={{fontWeight:"600",fontSize:'18px'}}>{t('productDetail.product1')}{count}</span>
                  {/* <span style={{marginTop:"10px",fontWeight:"600",fontSize:'18px'}}>{t('productDetail.product2')} <span style={{color:"#34D374"}}><RxDotFilled/>{t('productDetail.product4')}</span></span> */}
                </div>
                  <div className="social-network-container">
                    <span style={{fontWeight:"600",fontSize:'18px'}}>{t('productDetail.product3')}</span>
                    <div className="network-item" style={{backgroundColor:"#3A5794"}}>
                      <a href="https://www.facebook.com/asaxiyshop/" target="blank"><FaFacebookF size={20}/></a>
                    </div>
                    <div className="network-item" style={{backgroundColor:"#0088CC"}}>
                      <a href="https://t.me/asaxiyuz" target="blank"><FaTelegramPlane size={20}/></a>
                    </div>
                    <div className="network-item" style={{backgroundColor:"#32C6EA"}}>
                      <a href=""><FaTwitter size={20}/></a>
                    </div>
                    <div className="network-item" style={{backgroundColor:"#25D366"}}>
                      <a href=""><FaWhatsapp size={20}/></a>
                    </div>
                  </div>
                </div>
                <div className="product-button-container">
                  {/* <button className='product-but1'>{t('productDetail.product6')}</button> */}
                  <button onChange={closeSerch} className='product-but2'> <MdShoppingBasket style={{marginRight:"5px",}} size={25}/>{t('productDetail.product7')}</button>
                  {/* <button className='product-but3'>{t('productDetail.product8')}</button> */}
                </div>
          </div>

        </div>
        <div className="product-description">
          <h2>Mahsulot ta'rifi</h2>
          {/* <p>{translations.ru.description}</p> */}
        </div>
  </div>
  )
}
