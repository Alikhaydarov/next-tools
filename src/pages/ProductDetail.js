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
import { toast } from 'react-toastify';


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

    const [datas,setDatas] = useState([])
    let {id} = useParams()
    console.log(id)
    useEffect(()=>{
      const getData = async () => {
        try {
          const res = await axios.get(`/products/${id}`)
          // console.log(res)
          setDatas(res.data)
        } catch (error) {
          console.log(error)
        }
      }
      getData() 
    },[id])
    console.log(datas)
    const {discountPercentage,title,translations,true_price,brand,image_main,description,img1,img2,img3,count,ru,uz} = datas


    // const postDataToCart = async (cart) => {
    //   try {
    //     const { data } = await axios.post("cart-items/", {
    //       product:title,
    //       cart: 'Cart 1',
    //       quantity:1
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    const CartAddButton = (title) => {
      let previousCart = localStorage.getItem('cartData');
      let cartJson = JSON.parse(previousCart);
      
      const cartData = [
        {
          'product': {
            'title': title,
            'quantity': 1
          }
        }
      ];
    
      if (cartJson !== null && Array.isArray(cartJson)) {
        // Merge existing cart data with new cartData
        let allCartData = [...cartJson, ...cartData];
        let cartString = JSON.stringify(allCartData);
        localStorage.setItem('cartData', cartString);
      } else {
        // Initialize cartData in localStorage if it doesn't exist
        let cartString = JSON.stringify(cartData);
        localStorage.setItem('cartData', cartString);
      }
    };
    
  //   const handleClick = () => {
  //     // Check if window is defined (to avoid issues in environments without window, like Node.js)
  //     let products  = typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem('carts') || '[]') : [];
  
  //     // Check if the product already exists in the cart
  //     const isExistProduct = products.find(c => c.id === datas?.id);
  
  //     if (isExistProduct) {
  //         // If the product exists, update its quantity
  //         const updatedData = products.map(c => {
  //             if (c.id === datas?.id) {
  //                 return {
  //                     ...c,
  //                     quantity: c.quantity + 1,
  //                 };
  //             }
  //             return c;
  //         });
  
  //         // Update localStorage with the updated cart data
  //         if (typeof window !== 'undefined') {
  //             window.localStorage.setItem('carts', JSON.stringify(updatedData));
  //         }
  //     } else {
  //         // If the product does not exist, add it with quantity 1
  //         const data = [...products, { ...datas[0], quantity: 1 }];
  
  //         // Update localStorage with the new cart data
  //         if (typeof window !== 'undefined') {
  //             window.localStorage.setItem('carts', JSON.stringify(data));
  //         }
  //     }
  
  //     // Notify the user that the product has been added to the cart
  //     toast('Product added to your bag!!');
  // };
  const [product,setProduct] = useState([])
  useEffect(()=>{
    const getData = async () => {
      try {
        const res = await axios.get(`/products/${id}`)
        // console.log(res)
        setProduct(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getData() 
  },[id])
  console.log(product,"product");

  const handleClick = () => {
    let products = typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem('carts') || '[]') : [];

    const isExistProduct = products.find(c => c.id === (product && product.id));

    if (isExistProduct) {
        const updatedData = products.map(c => {
            if (c.id === (product && product.id)) {
                return {
                    ...c,
                    quantity: c.quantity + 1,
                };
            }

            return c;
        });
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('carts', JSON.stringify(updatedData));
        }
    } else {
        const data = [...products, { ...(product || {}), quantity: 1 }];
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('carts', JSON.stringify(data));
        }
    }
    toast("Savatchaga qo'shildi");
  };

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
                <span>{true_price} {t('Cardlang.card3')}</span>
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
                  <button onClick={handleClick}  className='product-but2'> <MdShoppingBasket style={{marginRight:"5px",}} size={25}/>{t('productDetail.product7')}</button>
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
