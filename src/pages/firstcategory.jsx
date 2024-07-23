// import React from 'react'
import "./firstcategory.css"
import React,{useState,useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from "../components/Cards/Card";
import { useTranslation, } from 'react-i18next';
import axios from './../service/api';// import firstcategory from './firstcategory';
import { useParams } from 'react-router-dom'
function Firstcategory() {
  let { id } = useParams();
  const { t , i18n} = useTranslation();
  const [data, setData] = useState([]);
  useEffect(() => {
      axios
          .get(`categories/${id}/`)
          .then((res) => setData(res.data.prod_obj));
  }, [id]);
  // console.log(data);
  // console.log("Data base",data['products'])
  return (
    <div className='category-1'>
      
            {/* <h5 style={{color:"#848896",}}>{t('Cardlang.card7')}</h5> */}
            {data?.map((item)=>
              <Card item={item} translation={item.translation} title={item.title} image={item.image_main} price={item.price} id={item.id} true_price={item.true_price}/>
            )}
    </div>
  )
}

export default Firstcategory