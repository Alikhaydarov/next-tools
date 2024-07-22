import React from 'react'
import { useState,useEffect } from 'react';
import axios from './../service/api';
import { Link } from 'react-router-dom';
import { useTranslation, } from 'react-i18next';

export default function Categories() {
  const { t , i18n } = useTranslation();  


    const [data,setData] = useState([])
    useEffect(() => {
      axios
          .get("categories/")
          .then((res) => setData(res.data.results));
  }, []);
  return (
    <>
            {data?.map((item)=>
                <Link to={`/${item.id}`} style={{fontWeight:"800",fontSize:"18px",padding:"20px 20px 5px 20px",display:"flex",color:"black"}}>{item.translations[i18n.language].title}</Link>
            )}
    </>
  )
}
