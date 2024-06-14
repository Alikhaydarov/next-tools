import { useEffect,useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from "../Cards/Card";
import { useTranslation, } from 'react-i18next';
import "./Section.css"


function Section() {
  const { t } = useTranslation();

  const [data,setData] = useState([])
  useEffect(()=>{
    fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(json => setData(json))
  },[])
  console.log("Data base",data['products'])
  return (
    <Container fluid className='aside-container'>
      <Row>
        <Col md={3} xs={12} className="left-col">
          {/* <div className="left-side-container">
 
          </div> */}
          {data['products']?.slice(9,12)?.map((item)=>
              <Col className="card-responsive"><Card title={item.title} image={item.images[0]} price={item.price} id={item.id}/></Col>
          )}
        </Col>
        <Col md={9} xs={12}  className='right-col' >
          <Row > 
            <h5 style={{color:"#848896",}}>{t('Cardlang.card7')}</h5>
            {data['products']?.slice(0,8)?.map((item)=>
              <Col><Card title={item.title} image={item.images[0]} price={item.price} id={item.id}/></Col>
            )}
              <h5 style={{color:"#848896",marginTop:"25px"}}>{t('Cardlang.card8')}</h5>
            {data['products']?.slice(10,18)?.map((item)=>
              <Col><Card title={item.title} image={item.images[0]} price={item.price} id={item.id}/></Col>
            )}
              <h5 style={{color:"#848896",marginTop:"25px"}}>{t('Cardlang.card9')}</h5>
            {data['products']?.slice(18,26)?.map((item)=>
              <Col><Card title={item.title} image={item.images[0]} price={item.price} id={item.id}/></Col>
            )}
              <h5 style={{color:"#848896",marginTop:"25px"}}>{t('Cardlang.card10')}</h5>
            {data['products']?.slice(8,16)?.map((item)=>
              <Col><Card title={item.title} image={item.images[0]} price={item.price} id={item.id}/></Col>
            )}
           </Row>
        </Col>
      </Row>
    </Container>
     
  );
}

export default Section;