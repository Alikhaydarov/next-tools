import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { BiHeart } from 'react-icons/bi';
import { BsFillStarFill } from 'react-icons/bs';
import { MdShoppingBasket } from 'react-icons/md';
import { RxDotFilled } from 'react-icons/rx';
import { TiMessage } from 'react-icons/ti';
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaTelegramPlane, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import Title from './title';
import { toast } from 'react-toastify';

import "./ProductDetail.css";
// Swiper.js 
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCube, Pagination, Navigation, Mousewheel } from "swiper";
import axios from './../service/api';

export default function ProductDetail({ closeSearch }) {
  const { t, i18n } = useTranslation();

  const closeSerch = () => {
    closeSearch('');
  };

  const [datas, setDatas] = useState([]);
  let { id } = useParams();
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`/products/${id}`);
        setDatas(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [id]);
  const { discountPercentage, title, translations, true_price, brand, image_main, description, img1, img2, img3, count, ru, uz } = datas;

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
      let allCartData = [...cartJson, ...cartData];
      let cartString = JSON.stringify(allCartData);
      localStorage.setItem('cartData', cartString);
    } else {
      let cartString = JSON.stringify(cartData);
      localStorage.setItem('cartData', cartString);
    }
  };

  const [product, setProduct] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [id]);

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
        <div className="swiper-container">
          <Swiper
            style={{ cursor: "zoom-in" }}
            modules={[EffectCube, Pagination]}
            effect={"cube"}
            cubeEffect={{
              shadow: false,
              slideShadows: true,
            }}
            pagination={true}
            className="mySwiper"
          >
            <SwiperSlide>
              <img className='img' src={image_main} alt='img' />
            </SwiperSlide>
            <SwiperSlide>
              <img className='img' src={img1} alt='img' />
            </SwiperSlide>
            <SwiperSlide>
              <img className='img' src={img2} alt='img' />
            </SwiperSlide>
            <SwiperSlide>
              <img className='img' src={img3} alt='img' />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="product-info-container">
          <div className="product-info-item">
            <h4>{translations?.[i18n.language]?.title || title }</h4>
            <span>{true_price} {t('Cardlang.card3')}</span>
          </div>
            <div className="brend-item">
              <span style={{ fontWeight: "600", fontSize: '18px' }}>{t('productDetail.product1')}{count}</span>
            </div>
         
          <div className="product-button-container">
            <button onClick={handleClick} className='product-but2'> <MdShoppingBasket style={{ marginRight: "5px" }} size={25} />{t('productDetail.product7')}</button>
          </div>
        </div>
      </div>
      <div className="product-description">
        <h2>{t('productDetail.descriptionTitle')}</h2>
        <p>{translations?.[i18n.language]?.description || description}</p>
      </div>
    </div>
  );
}
