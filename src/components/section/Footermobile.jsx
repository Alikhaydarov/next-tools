import React from 'react';
import { FaShoppingCart, FaLanguage } from 'react-icons/fa';
import { IoHome } from "react-icons/io5";

import './Footermobile.css';
import { Link } from 'react-router-dom'

const Footermobile = () => {
  return (
    <div className="footer">
      <Link style={{textDecoration:"none"}} to={'/'}>
        <div className="icon-container">
        <IoHome /> 
        <span>Home</span>
      </div>
      </Link>
      <Link style={{textDecoration:"none"}} to={'/cart'}>
      <div className="icon-container">
        <FaShoppingCart />
        <span>Karzinka</span>
      </div>
      </Link>
      {/* <div className="icon-container">
        <FaLanguage />
        <span>UZ</span>
      </div> */}
  
    </div>
  );
};

export default Footermobile;
