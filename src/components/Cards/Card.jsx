import React from 'react'
import "./Card.css"
import {FaShoppingCart} from "react-icons/fa"
import {FiHeart} from "react-icons/fi"
import axios from "../../service/api";
import {AiOutlineStar} from "react-icons/ai"
import {TiMessage} from "react-icons/ti"
import { useTranslation, } from 'react-i18next';
import {Link} from "react-router-dom"
import { useState,useEffect } from 'react';
import { toast } from 'react-toastify';
export default function Card({image,price,id,true_price,translations,item}) {
    const { t , i18n } = useTranslation();  
    console.log(id);


    const postDataToCart = async (product) => {
        try {
          const { FaShoppingCart } = await axios.post("cart-items/", {
            product:product.id,
            cart:12,
            quantity:1

          });
        } catch (error) {
          console.log(error);
        }
      };

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
        toast('Product added to your bag!!');
    };
    
  return (
    <div>
        <div className="card-container">
            <div className="top-image">
                {/* <p>{t('Cardlang.card1')}</p> */}
                <img src={image} alt="" style={{width:"100%",height:"200px",objectFit:"contain"}} />
                <div className="top-image-icon-container">
                   <Link to={'/cart'}><div className="card-shop-icon"><FaShoppingCart color='#fff' size={18} /></div></Link> 
                    {/* <FiHeart size={25} color='gray' style={{marginTop:"10px",}}/> */}
                </div>
            </div>
            <div className="card-bottom-info" style={{width:"100%"}}>
                <div className="card-item-name">
                    <Link to={`/product/${id}`} style={{textDecoration:"none"}}>
                       <span style={{maxWidth:"2px"}}>{item.translations[i18n.language].title}</span>
                    </Link>
                </div>
                <div className="card-item-star-container">
                    <AiOutlineStar size={20} style={{color:"#008DFF",cursor:"pointer"}}/>
                    <AiOutlineStar size={20} style={{color:"#008DFF",cursor:"pointer"}}/>
                    <AiOutlineStar size={20} style={{color:"#008DFF",cursor:"pointer"}}/>
                    <AiOutlineStar size={20} style={{color:"#008DFF",cursor:"pointer"}}/>
                    <AiOutlineStar size={20} style={{color:"#008DFF",cursor:"pointer"}}/>
                    {/* <span><TiMessage/>0 {t('Cardlang.card2')}</span> */}
                </div>
                <div className="card-item-price-container">
                    <span ><del style={{color:"#AF5679"}}>{product.true_price > null ? (`${item.true_price} ,  ${t('Cardlang.card3')}`):(`${0} ,  ${t('Cardlang.card3')}`)}</del> </span>
                    <h4 style={{fontSize:"18px",marginBottom:"-5px",marginTop:"-5px"}}>{price} {t('Cardlang.card3')}</h4>
                    {/* <span>109 800 {t('Cardlang.card3')} /12 {t('Cardlang.card4')}</span> */}
                </div>
                <div className="button-container">
                    {/* <button className='card-but1'>{t('Cardlang.card5')}</button> */}
                    <button onClick={handleClick} className='card-but2'>{t('productDetail.product7')}</button>
                </div>
            </div>
        </div>
    </div>
  )
}
