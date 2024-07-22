import axios from 'axios'
import React, { useState } from 'react'

const Checkout = ({ products, total }) => {
	const [call_number, setCall_number] = useState('')
	const [location, setLocation] = useState('')
	// const [message, setMessage] = useState('');

	const telegramBotId = '7078533011:AAHsVoC-XESagP6v9d_eE0z18ghji3Q4G0g'
	const chatId = 5361211545

	const handleSubmit = async e => {
		e.preventDefault()

		const formattedMessage = `Products : ${products.map(
			product => `${product.title} - ${product.quantity}`
		)}\nNarx: ${total} sum \nTelefon: ${call_number}\nLocation: ${location}`

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
			console.log(response)
		} catch (error) {
			console.error(error)
		}

		setCall_number('')
		setLocation('')
		// setMessage('');
	}
	return (
		<>
			{products.map(product => (
				<p>
					{product.title} {product.quantity}
				</p>
			))}
			<p>{total} sum</p>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Telefon:</label>
					<input
						placeholder='+998'
						type='tel'
						value={call_number}
						onChange={e => setCall_number(e.target.value)}
						id='name'
						required
            minLength={'10'}
            maxLength={'11'}
					/>
				</div>
				<br />
				<div>
					<label>Location</label>
					<input
						type='location'
						value={location}
						onChange={e => setLocation(e.target.value)}
						id='email'
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
				<button type='submit'>Send</button>
			</form>
		</>
	)
}

export default Checkout
