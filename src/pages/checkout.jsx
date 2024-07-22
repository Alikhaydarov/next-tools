import axios from 'axios'
import React, { useState } from 'react'
import './checkout.css' // Import the CSS file here
import { toast } from 'react-toastify'
import { IoMdClose } from "react-icons/io";
import { useTranslation } from 'react-i18next';

const Checkout = ({ products, total ,openClose}) => {
	const { t, i18n } = useTranslation()
	const [loading,SetLoading] = useState(false)

	const [call_number, setCall_number] = useState()
	const [location, setLocation] = useState('')
	const [productss, setProductss] = useState([])

	const TrueLoading = () =>{
		SetLoading(true)
	}
	
	// const [message, setMessage] = useState('');
	const removeProduct = id => {
		const updatedCart = products.filter(product => product.id !== id)
		if (typeof window !== 'undefined') {
			window.localStorage.setItem('carts', JSON.stringify(updatedCart))
		}
		setProductss(updatedCart)
	}
	
	const telegramBotId = '7078533011:AAHsVoC-XESagP6v9d_eE0z18ghji3Q4G0g'
	const chatId = 5361211545

	const handleSubmit = async e => {
		e.preventDefault()

		const formattedMessage = `Продукты : ${products.map(
			product => `${product.title} - ${product.quantity}`
		)}\nИтоговая цена: ${total} sum \nTелефон: ${call_number}\nАдрес: ${location}`

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
		}

		try {
			const response = await axios(settings)
			// console.log(response)
			toast("Buyurtma Berildi");
			SetLoading(false)
			openClose()
		} catch (error) {
			console.error(error)

		}

		setCall_number('')
		setLocation('')
		// setMessage('');
	}
	return (
		<div className='checkout-container'>
		
			<div className='checkout-form'>
				<span onClick={openClose} style={{display:"flex",justifyContent:"right"}}><IoMdClose style={{fontSize:"30px"}}/></span>
				<div className='checkout-products'>
					{products.map(product => (
						<span className='checkout-product-item'>
							{product.title} - {product.quantity} | {""}
						</span>
					))}
				</div>
				<p className='checkout-total'>{total} sum</p>
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="phone">{t('Checkout.cart1')}:</label>
						<input
								// placeholder='+998'
							type='tel'
							value={call_number}
							onChange={e => setCall_number(e.target.value)}
							id='phone'
							required
							minLength={'13'}
							maxLength={'13'}
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
					{/* <div>
        <label>Message:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="message"
          required
        ></textarea>
      </div> */}
			{loading ? <button style={{backgroundColor:"#036e47"}} class="buttonload"><i class="fa fa-spinner fa-spin"></i></button>:<button onClick={TrueLoading} type='submit'>Buyurtma Berish</button>}
				</form>
			</div>
		</div>
	)
}

export default Checkout
