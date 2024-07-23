import {
	MDBBtn,
	MDBCard,
	MDBCardBody,
	MDBCardHeader,
	MDBCol,
	MDBContainer,
	MDBIcon,
	MDBInput,
	MDBListGroup,
	MDBListGroupItem,
	MDBRipple,
	MDBRow,
	MDBTypography,
} from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Cart.css';
import Checkout from './checkout';

export default function Cart() {
	const [openCheck, setOpenCheck] = useState(false);
	const { t, i18n } = useTranslation();
	const [total, setTotal] = useState(0);
	const [products, setProducts] = useState([]);

	const openOut = () => setOpenCheck(true);
	const openClose = () => setOpenCheck(false);

	useEffect(() => {
		const productLocalStorage = JSON.parse(window.localStorage.getItem('carts') || '[]');
		setProducts(productLocalStorage);
	}, []);

	const removeProduct = id => {
		const updatedCart = products.filter(product => product.id !== id);
		window.localStorage.setItem('carts', JSON.stringify(updatedCart));
		setProducts(updatedCart);
	};

	const handleIncrement = id => {
		const updatedCart = products.map(product => {
			if (product.id === id) {
				return { ...product, quantity: product.quantity + 1 };
			}
			return product;
		});
		window.localStorage.setItem('carts', JSON.stringify(updatedCart));
		setProducts(updatedCart);
	};

	const handleDecrement = id => {
		const existProduct = products.find(product => product.id === id);
		if (existProduct?.quantity === 1) {
			removeProduct(existProduct.id);
		} else {
			const updatedCart = products.map(product => {
				if (product.id === id) {
					return { ...product, quantity: product.quantity - 1 };
				}
				return product;
			});
			window.localStorage.setItem('carts', JSON.stringify(updatedCart));
			setProducts(updatedCart);
		}
	};

	useEffect(() => {
		const total = products.reduce((acc, item) => acc + item.price * item.quantity, 0);
		setTotal(total);
	}, [products]);

	return (
		<>
			{products.length ? (
				<section className='h-100 gradient-custom'>
					<MDBContainer className='py-0 h-100'>
						<MDBRow className='justify-content-center my-4'>
							<MDBCol md='8'>
								<MDBCard className='mb-4'>
									<MDBCardHeader className='py-3'>
										<MDBTypography tag='h5' className='mb-0'>
											{t('shoppingCart.cart1')} {products.length}
										</MDBTypography>
									</MDBCardHeader>
									<MDBCardBody>
										{products.map(product => (
											<MDBRow key={product.id}>
												<MDBCol lg='3' md='12' className='mb-4 mb-lg-0'>
													<MDBRipple
														rippleTag='div'
														rippleColor='light'
														className='bg-image rounded hover-zoom hover-overlay'
													>
														<img src={product.image_main} className='w-100' alt={product.translations[i18n.language].title} />
														<a href='#!'>
															<div
																className='mask'
																style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}
															></div>
														</a>
													</MDBRipple>
												</MDBCol>

												<MDBCol lg='5' md='6' className='mb-4 mb-lg-0'>
													<p>
														<strong>{product.translations[i18n.language].title}</strong>
													</p>
													<MDBBtn
														style={{ backgroundColor: '#17b978' }}
														size='sm'
														className='me-1 mb-2'
														title='Remove item'
														onClick={() => removeProduct(product.id)}
													>
														<MDBIcon fas icon='trash' />
													</MDBBtn>
												</MDBCol>

												<MDBCol lg='4' md='6' className='mb-4 mb-lg-0'>
													<div className='d-flex mb-4' style={{ maxWidth: '300px' }}>
														<MDBBtn
															onClick={() => handleDecrement(product.id)}
															style={{ backgroundColor: '#17b978' }}
															className='px-3 me-2'
														>
															<MDBIcon fas icon='minus' />
														</MDBBtn>

														<MDBInput
															value={product.quantity}
															min={1}
															type='number'
															label={t('productDetail.product1')}
															readOnly
														/>

														<MDBBtn
															onClick={() => handleIncrement(product.id)}
															style={{ backgroundColor: '#17b978' }}
															className='px-3 ms-2'
														>
															<MDBIcon fas icon='plus' />
														</MDBBtn>
													</div>
												</MDBCol>
												<hr className='my-4' />
											</MDBRow>
										))}
									</MDBCardBody>
								</MDBCard>
							</MDBCol>
							<MDBCol md='4'>
								<MDBCard className='mb-4'>
									<MDBCardHeader>
										<MDBTypography tag='h5' className='mb-0'>
											{t('shoppingCart.cart6')}
										</MDBTypography>
									</MDBCardHeader>
									<MDBCardBody>
										<MDBListGroup flush>
											<MDBListGroupItem className='d-flex justify-content-between align-items-center px-0'>
												{t('shoppingCart.cart3')}
												<span>{t('shoppingCart.cart4')}</span>
											</MDBListGroupItem>
											<MDBListGroupItem className='d-flex justify-content-between align-items-center border-0 px-0 mb-3'>
												<div>
													<strong>{t('shoppingCart.cart2')}</strong>
												</div>
												<span>
													<strong>
														{total} {t('Cardlang.card3')}
													</strong>
												</span>
											</MDBListGroupItem>
										</MDBListGroup>

										<MDBBtn
											onClick={openOut}
											style={{ backgroundColor: '#17b978' }}
											block
											size='lg'
										>
											{t('shoppingCart.cart5')}
										</MDBBtn>
									</MDBCardBody>
								</MDBCard>
							</MDBCol>
						</MDBRow>
					</MDBContainer>
					{openCheck && <Checkout total={total} products={products} openClose={openClose} />}
				</section>
			) : (
				<div className='empty-cart-container'>
					<div className='empty-cart-content'>
						<h1>{t('shoppingCart.cart7')}</h1>
						<p>{t('shoppingCart.cart8')}</p>
						<p>{t('shoppingCart.cart9')}</p>
						<Link to='/' className='back-button'>
							{t('shoppingCart.cart10')}
						</Link>
					</div>
				</div>
			)}
		</>
	);
}
