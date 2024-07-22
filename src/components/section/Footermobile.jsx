import React from 'react';
import { FaShoppingCart, FaLanguage, FaUser } from 'react-icons/fa';
import { IoHome } from "react-icons/io5";

import './Footermobile.css';

const Footermobile = () => {
  return (
    <div className="footer">
        <div className="icon-container">
        <IoHome /> 
        <span>Home</span>
      </div>
      <div className="icon-container">
        <FaShoppingCart />
        <span>Karzinka</span>
      </div>
      <div className="icon-container">
        <FaLanguage />
        <span>UZ</span>
      </div>
  
    </div>
  );
};

export default Footermobile;
