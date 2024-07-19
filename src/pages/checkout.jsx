import React, { useState,useEffect } from 'react';
import axios from 'axios';

const Checkout = ({products}) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
	



  const telegramBotId = "7078533011:AAHsVoC-XESagP6v9d_eE0z18ghji3Q4G0g";
  const chatId = 6562691323;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedMessage = `Products : ${products.map(product => `${product.title} - ${product.quantity}`)} \nName: ${name}\nLocation: ${location}\nMessage: ${message}`;

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
      const response = await axios(settings);
      console.log(response);
    } catch (error) {
      console.error(error);
    }

    setName('');
    setLocation('');
    setMessage('');
  };
  return (
    <>
		{products.map(( product)=>
		<p>{product.title} {product.quantity}</p>
		)}

<form onSubmit={handleSubmit} >
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          required
        />
      </div>
      <div>
        <label>Location</label>
        <input
          type="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          id="email"
          required
        />
      </div>
      <div>
        <label>Message:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="message"
          required
        ></textarea>
      </div>
      <button type="submit">Send</button>
    </form>
		</>
  );
};

export default Checkout;
