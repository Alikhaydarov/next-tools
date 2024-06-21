import {useState,useEffect} from "react"

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import img from "../header/Nest_tools-removebg-preview.png"
import Offcanvas from "react-bootstrap/Offcanvas";
import "./Header.css";
import Navbars from "./Navbar";
import { BsCreditCard2Back, BsGlobe,BsNewspaper,BsInstagram,BsTelegram,BsFacebook } from "react-icons/bs";
import {MdClose} from "react-icons/md"
import { BiSearch } from "react-icons/bi";
import { TbTruckDelivery, TbShoppingCart } from "react-icons/tb";
import { FiHeart, FiUser } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import {IoIosPeople,} from "react-icons/io"
import {IoInformationCircle} from "react-icons/io5"
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import { Link } from "react-router-dom";
import { useTranslation,  } from 'react-i18next';
import Modal from 'react-bootstrap/Modal';
import {Row,Col} from 'react-bootstrap'
import axios from './../../service/api';
import ProductDetail from "../../pages/ProductDetail";
import Categories from '../Categories'
// import  axios  from 'axios';



function OffcanvasExample() {
  const [data,setData] = useState([])
  const [lgShow, setLgShow] = useState(false);

  const handleClose = () => setLgShow(false);
  const handleShow = () => setLgShow(true);
  let box = document.querySelector(".search-block")


  const [value,setValue] = useState();
  useEffect(()=>{
    const getData = async () => {
      try {
        const res = await axios.get(`products/?search=${value}`).then(res=> 
        setData(res.data.results)).then(r=>r).catch(E=>console.log(E))
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  },[value])
  console.log(data)

  function close(){
    if (value = "") {
      box.classList(".menu-none");
    }
  }
  function closeSearch(){
    setValue("")
  }

  const { t, i18n } = useTranslation();
  return (
    <>
    <div className="modall" >
    <Modal 
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        onClick={closeSearch}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg" className="modal-title" >
             <h4>{t('modalLang.modal1')}</h4> 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <MdClose className="modal-close-icon" onClick={() => setLgShow(false)}/>
          <Row>
            <Col lg={8} md={8} >
          <form  className="modal-form" action="#">
            <label htmlFor="#">{t('modalLang.modal2')}</label>
            <input type="text" placeholder="+998(__)___-__-__"/>
            <button>{t('modalLang.modal3')}</button>
          </form></Col>
          <Col lg={4} md={4} onClick={closeSearch}>
          <div className="modal-body-right-container">
             <div className="modal-body-right-item">
              <img src="https://asaxiy.uz/custom-assets/images/icons/market.svg" alt="" />
              <div className="modal-body-right-item-text">
                <h5>{t('footerLang.footer1')}</h5>
                <span>{t('footerLang.footer6')}</span>
              </div>
             </div>
             <div className="modal-body-right-item">
              <img src="https://asaxiy.uz/custom-assets/images/icons/fast-delivery.svg" alt="" />
              <div className="modal-body-right-item-text">
                <h5>{t('footerLang.footer2')}</h5>
                <span>{t('footerLang.footer7')}</span>
              </div>
             </div>
             <div className="modal-body-right-item">
              <img src="https://asaxiy.uz/custom-assets/images/icons/return.svg" alt="" />
              <div className="modal-body-right-item-text">
                <h5>{t('footerLang.footer3')}</h5>
                <span>{t('footerLang.footer8')}</span>
              </div>
             </div>
             <div className="modal-body-right-item">
              <img src="https://asaxiy.uz/custom-assets/images/icons/card.svg" alt="" />
              <div className="modal-body-right-item-text">
                <h5>{t('footerLang.footer4')}</h5>
                <span>{t('footerLang.footer9')}</span>
              </div>
             </div>
          </div>
          </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
      {["lg"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="header-navbar-main"
          onClick={closeSearch}
          
        >
          <Container fluid>
            <Navbar.Toggle
              aria-controls={`offcanvasNavbar-expand-${expand}`}
              className="navbar-toggle"
            >
              <RxHamburgerMenu size={30} color="#17b978"  />
            </Navbar.Toggle>
            <Navbar.Brand href="#">
              <Link to="/">
                <img
                  src={img}
                  alt=""
                  width={200}
                />
              </Link>
             
            </Navbar.Brand>

            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <img
                    src={img}
                    alt=""
                    width={100}
                  />
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <div className="navbar-search navbar-search-none">
                  <Form className="d-flex" style={{zIndex:"12"}}>
                    <Form.Control
                      type="text"
                      placeholder={t('navbarTop.nav1')}
                      className="me-2"
                      aria-label="Search"
                      style={{ color: "#17b978" }}
                      value={value}
                      onChange={(e)=>setValue(e.target.value)}
                    />
                    {/* <Button variant="outline-success">
                      <BiSearch size={20} />
                      {t('navbarTop.nav2')}
                    </Button> */}
                  </Form>
                  {/* [value] */}
                  {value === "" ? (""):(<div className="search-block">
                    {data?.map((item) => (
              <Link className="link-s" to={`product/${item.id}`} style={{textDecoration:"none",color:"#17b978"}}>  
              <div className="box">
                <img src={item.image_main} alt=""/>
                 <ul>
                <li>{item.translations[i18n.language].title}</li>
             </ul>

              </div>
              </Link>
              ))}
                  </div>)}
                </div>

                <Nav className="navbar-header-class">
                  {/* <div className="header-link">
                    <BsCreditCard2Back className="left-side-icon-responsive" />
                    <span ><Link to="/order-pay" className="header-page-link">{t('navbarTop.nav3')}</Link></span>
                  </div> */}

                  {/* <div className="header-link">
                    <TbTruckDelivery className="left-side-icon-responsive" />
                    <span><Link to="/order-pay-status" className="header-page-link">{t('navbarTop.nav4')}</Link></span>
                  </div> */}

                  <div className="header-language-container header-language-container-responsive">
                    <BsGlobe
                      size={25}
                      style={{ marginBottom: -8 }}
                      className="dropdown-language-responsive"
                    />
                    <NavDropdown
                      title={i18n.language=='uz'? "O'zbekcha":"Русский"}
                      id={`offcanvasNavbarDropdown-expand-${expand}`}
                    >
                      <NavDropdown.Item onClick={()=>i18n.changeLanguage('uz')}>
                        O'zbekcha
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={()=>i18n.changeLanguage('ru')}>
                        Русский
                      </NavDropdown.Item>
                    </NavDropdown>
                  </div>

                 <Link style={{textDecoration:"none"}} to={`/cart`}>
                 <div className="header-link header-link-responsive-none ">
                    <TbShoppingCart className="left-side-icon-responsive" />
                    <span>{t('navbarTop.nav5')}</span>
                  </div>
                 </Link>
{/*///////////////////////////////////////////////////////////Shop hover status  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/}
                  <div className="shop-hover-container" style={{backgroundColor:'#f1f9ff'}}>
                    <div className="shop-hover-top"></div>
                    <div className="shop-hover-bottom">
                      <div className="shop-status">
                        <span style={{color:"gray",fontWeight:"500"}}>{t('navbarTop.nav9')}</span>
                        <span style={{fontWeight:"600"}}>0 {t('navbarTop.nav10')}</span>
                      </div>
                      <div className="shop-hover-button">
                           <button className="button1">{t('navbarTop.nav11')}</button>
                           <button className="button2">{t('navbarTop.nav12')}</button>
                      </div>
                    </div>
                  </div>

{/*///////////////////////////////////////////////////////////Shop hover status end\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/}

                 <div className="header-link">
                    <span><Link  style={{textDecoration:"none"}} className="header-page-link"><Categories/></Link></span>
                  </div>

{/*/////////////////////////////////////////// Responsive Header icons ////////////////////////////////////////////////////////*/}


{/*/////////////////////////////////////////// Responsive Header icons end ////////////////////////////////////////////////////////*/}                  

                  {/* <div className="header-link header-link-responsive-none" onClick={handleShow} >
                    <FiUser className="left-side-icon-responsive"  />
                    <span>{t('navbarTop.nav7')}</span>
                  </div> */}
                  <div className="header-language-container header-language-container-desktop ">
                    <BsGlobe
                      size={25}
                      style={{ marginBottom: -8 }}
                      className="dropdown-language-responsive"
                    />
                    <NavDropdown
                      title={i18n.language=='uz'? "O'zbekcha":"Русский"}
                      id={`offcanvasNavbarDropdown-expand-${expand}`}
                      className="language-selector"
                    >
                      <NavDropdown.Item onClick={()=>i18n.changeLanguage('uz')}>
                        O'zbekcha
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={()=>i18n.changeLanguage('ru')}>
                        Русский
                      </NavDropdown.Item>
                    </NavDropdown>
                  </div>
{/*//////////////////////////////////////// Left Side bar Networks \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/}
                  <div className="left-side-bar-network">
                    <a href="https://www.instagram.com/asaxiy.uz/" target='blank' style={{cursor:"default"}}><BsInstagram className="left-side-bar-network-icon"/></a> 
                    <a href="https://t.me/asaxiyuz" target='blank' style={{cursor:"default"}}><BsTelegram className="left-side-bar-network-icon"/></a>
                    <a href="https://www.facebook.com/asaxiyshop/" target='blank' style={{cursor:"default"}}><BsFacebook className="left-side-bar-network-icon"/></a>
                  </div>
{/*//////////////////////////////////////// Left Side bar Networks end \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
        
      ))}
      <div className="navbar-search navbar-search-bottom" style={{zIndex:"100"}}>
        <Form className="d-flex">
          <Form.Control
            type="text"
            placeholder={t('navbarTop.nav1')}
            className="me-2"
            aria-label="Search"
            style={{ color: "#17b978" }}
            value={value}
            onChange={(e)=>setValue(e.target.value)}
          />
          <Button variant="outline-success" style={{zIndex:"100"}}>
            <BiSearch size={20} />
            {/* {t('navbarTop.nav2')} */}
          </Button>
        </Form>
        {value === "" ? (""):(<div className="search-block">
                    {data?.map((item) => (
              <Link className="link-s" to={`product/${item.id}`} style={{textDecoration:"none"}}>  
              <div className="box">
                <img src={item.image_main} alt=""  width={"30px"}/>
                 <ul>
                <li>{item.translations[i18n.language].title}</li>
             </ul>

              </div>
              </Link>
              ))}
                  </div>)}
      </div>
      <Navbars closeSearch={setValue}/>
      {/* <div style={{display:"none"}}>
      <ProductDetail closeSearch={setValue}/>
      </div> */}
    </>
  );
}

export default OffcanvasExample;
