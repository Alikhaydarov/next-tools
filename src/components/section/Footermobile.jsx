import React from 'react';
import { FaShoppingCart, FaLanguage } from 'react-icons/fa';
import { IoHome } from "react-icons/io5";
import { useTranslation } from 'react-i18next';
import './Footermobile.css';
import { Link } from 'react-router-dom'

const Footermobile = () => {
  const { t, i18n } = useTranslation()

  return (
    <div className="footer">
      <Link style={{textDecoration:"none"}} to={'/'}>
        <div className="icon-container">
        <IoHome /> 
        <span>{t("navbarTop.nav13")}</span>
      </div>
      </Link>
      <Link style={{textDecoration:"none"}} to={'/cart'}>
      <div className="icon-container">
        <FaShoppingCart />
        <span>{t("navbarTop.nav5")}</span>
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
