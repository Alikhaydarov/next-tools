import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link} from 'react-router-dom'
import axios from './../service/api'

export default function Categories({ onClose}) {
	const { t, i18n } = useTranslation()
  const handleCategoryClick = () => {
    // Perform any actions needed when a category is clicked
    onClose(); // Call the onClose function to close the Categories component
  };
	
	const [data, setData] = useState([])					// onClick={handleClick()}

	useEffect(() => {
		axios.get('categories/').then(res => setData(res.data.results))
	}, [])
	return (
		<>
			{data?.map(item => (
				<Link
					to={`/${item.id}`}
					style={{
						fontWeight: '800',
						fontSize: '18px',
						padding: '20px 20px 5px 20px',
						display: 'flex',
						color: 'black',
					}}
				>
					{item.translations[i18n.language].title}
				</Link>
			))}
		</>
	)
}
