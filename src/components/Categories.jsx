import React from 'react'
import { useState,useEffect } from 'react';
import axios from './../service/api';
import { Link } from 'react-router-dom';
export default function Categories() {

    const [data,setData] = useState([])
    useEffect(() => {
      axios
          .get("categories/")
          .then((res) => setData(res.data.results));
  }, []);
  return (
    <>
            {data?.map((item)=>
                <Link to={`/${item.id}`} style={{fontWeight:"800",fontSize:"18px",padding:"5px",display:"flex",color:"black"}}>{item.title}</Link>
            )}
    </>
  )
}
