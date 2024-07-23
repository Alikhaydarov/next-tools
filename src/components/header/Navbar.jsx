import React,{useState,useEffect} from 'react';
import './Navbar.css';
import { Link } from "react-router-dom";
// language
import { useTranslation, } from 'react-i18next';

import axios from "../../service/api"



export default function Navbar({closeSearch}) {
  const { t , i18n} = useTranslation();
  const [open,setOpen] = useState(false)
  // const openToggle=()=>{
  //   setOpen(!open)
  // }
  const closeSerch =()=>{
    closeSearch('')
  }
  const [data,setData] = useState([])
  useEffect(() => {
    axios
        .get("categories/")
        .then((res) => setData(res.data.results));
}, []);

  return (
    <div className='header-navbar' onClick={closeSerch}>
        <ul>
        {data?.map((item)=>
                <li><Link to={`/${item.id}`}>{item.translations[i18n.language].title}</Link></li>
            )}
            {/* <li onClick={openToggle} style={{display:'flex',alignItems:'center'}}>{open?<MdOutlineClose size={23} style={{marginRight:'10px',color:"#008dff",cursor:'pointer'}}/>:<RxHamburgerMenu className='hamburger-menu' size={23} style={{marginRight:'10px',color:"#008dff",cursor:'pointer',}}/>}<Link to="/">{t('navbar.nav1')}</Link></li> */}
            {/* <li><Link to='/news'>{t('navbar.nav2')}</Link></li>
            <li><Link to='/newProduct'>{t('navbar.nav3')}</Link></li>
            <li><Link to='/Discounts'>{t('navbar.nav4')}</Link></li>
            <li><Link to='/books'>{t('navbar.nav5')}</Link></li>
            <li><Link to='/telephones'>{t('navbar.nav6')}</Link></li>
            <li><Link to='/tv'>{t('navbar.nav7')}</Link></li>
            <li><Link to='/sports'>{t('navbar.nav8')}</Link></li> */}
        </ul>
     
        
    </div>
  )
}
