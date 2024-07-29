import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './checkout.css'; // Import the CSS file here
import { toast } from 'react-toastify';
import { IoMdClose } from "react-icons/io";
import { useTranslation } from 'react-i18next';

const Checkout = ({ products, total, openClose }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [callNumber, setCallNumber] = useState('');
  const [location, setLocation] = useState('');
  const [productList, setProductList] = useState(products);

  useEffect(() => {
    setProductList(products);
  }, [products]);

  const removeProduct = id => {
    const updatedCart = productList.filter(product => product.id !== id);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('carts', JSON.stringify(updatedCart));
    }
    setProductList(updatedCart);
  };

  const telegramBotId = '7078533011:AAHsVoC-XESagP6v9d_eE0z18ghji3Q4G0g';
  const chatId = 6072375468;

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const formattedMessage = `Продукты : ${productList.map(
      product => `${product.title} - ${product.quantity}`
    )}\nИтоговая цена: ${total} sum \nTелефон: ${callNumber}\nАдрес: ${location}`;

    const settings = {
      async: true,
      crossDomain: true,
      url: `https://api.telegram.org/bot${telegramBotId}/sendMessage`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
      },
      data: JSON.stringify({
        chat_id: chatId,
        text: formattedMessage,
      }),
    };

    try {
      await axios(settings);
      toast("Buyurtma Berildi");
      setLoading(false);
      openClose();
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Xatolik yuz berdi!");
    }

    setCallNumber('');
    setLocation('');
  };

  return (
    <div className='checkout-container'>
      <div className='checkout-form'>
        <span onClick={openClose} style={{ display: "flex", justifyContent: "right" }}>
          <IoMdClose style={{ fontSize: "30px" }} />
        </span>
        <div className='checkout-products'>
          {productList.map(product => (
            <span key={product.id} className='checkout-product-item'>
              {product.title} - {product.quantity} |{" "}
            </span>
          ))}
        </div>
        <p className='checkout-total'>{total} sum</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="phone">{t('Checkout.cart1')}:</label>
            <input
              type='tel'
              value={callNumber}
              onChange={e => setCallNumber(e.target.value)}
              id='phone'
              required
              minLength='13'
              maxLength='13'
            />
          </div>
          <br />
          <div>
            <label htmlFor="location">{t('Checkout.cart2')}:</label>
            <input
              type='text'
              value={location}
              onChange={e => setLocation(e.target.value)}
              id='location'
              required
            />
          </div>
          {loading ? (
            <button style={{ backgroundColor: "#036e47" }} className="buttonload">
              <i className="fa fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button type='submit'>{t('Checkout.cart3')}</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Checkout;
