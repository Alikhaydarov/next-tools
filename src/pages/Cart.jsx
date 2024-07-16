import {
	MDBBtn,
	MDBCard,
	MDBCardBody,
	MDBCardHeader,
	MDBCardImage,
	MDBCol,
	MDBContainer,
	MDBIcon,
	MDBInput,
	MDBListGroup,
	MDBListGroupItem,
	MDBRipple,
	MDBRow,
	MDBTooltip,
	MDBTypography,
} from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import './Cart.css'
export default function Cart() {
	const [total, setTotal] = useState(0);
	const [products, setProducts] = useState([])
	useEffect(() => {
		const productLocalStorage =
			typeof window !== 'undefined'
				? JSON.parse(window.localStorage.getItem('carts') || '[]')
				: []
		setProducts(productLocalStorage)
	}, [])

	// +
	const removeProduct = (id) => {
    const updatedCart = products.filter((product) => product.id !== id);
    if (typeof window !== 'undefined') {
        window.localStorage.setItem('carts', JSON.stringify(updatedCart));
    }
    setProducts(updatedCart);
};

const handleIncrement = (id) => {
    const updatedCart = products.map((product) => {
        if (product.id === id) {
            return {
                ...product,
                quantity: product.quantity + 1,
            };
        }
        return product;
    });
    if (typeof window !== 'undefined') {
        window.localStorage.setItem('carts', JSON.stringify(updatedCart));
    }
    setProducts(updatedCart);
};
// -
const handleDecrement = (id) => {
	const existProduct = products.find((product) => product.id === id);

	if (existProduct?.quantity === 1) {
			removeProduct(existProduct.id);
	} else {
			const updatedCart = products.map((product) => {
					if (product.id === id) {
							return {
									...product,
									quantity: product.quantity - 1,
							};
					}
					return product;
			});
			if (typeof window !== 'undefined') {
					window.localStorage.setItem('carts', JSON.stringify(updatedCart));
			}
			setProducts(updatedCart);
	}
};

useEffect(() => {
	const total = products.reduce((acc, item) => {
			return acc + item.price * item.quantity;
	}, 0);
	setTotal(total);
}, [products]);




	return (
		<>
		{products.length ? (<section className='h-100 gradient-custom'>
			<MDBContainer className='py-5 h-100'>
				<MDBRow className='justify-content-center my-4'>
					<MDBCol md='8'>
						<MDBCard className='mb-4'>
							<MDBCardHeader className='py-3'>
								<MDBTypography tag='h5' className='mb-0'>
									Cart - {products.length}items
								</MDBTypography>
							</MDBCardHeader>
							<MDBCardBody>
								{products.map(product => (
									<>
										<MDBRow key={product.id}>
											<MDBCol lg='3' md='12' className='mb-4 mb-lg-0'>
												<MDBRipple
													rippleTag='div'
													rippleColor='light'
													className='bg-image rounded hover-zoom hover-overlay'
												>
													<img
														src={product.image_main}
														className='w-100'
													/>
													<a href='#!'>
														<div
															className='mask'
															style={{
																backgroundColor: 'rgba(251, 251, 251, 0.2)',
															}}
															></div>
													</a>
												</MDBRipple>
											</MDBCol>

											<MDBCol lg='5' md='6' className=' mb-4 mb-lg-0'>
												<p>
													<strong>{product.title}</strong>
												</p>

												<MDBBtn
												style={{backgroundColor:"#17b978"}}
													wrapperProps={{ size: 'sm' }}
													wrapperClass='me-1 mb-2 color:black'
													title='Remove item'
													onClick={() => removeProduct(product.id)}
												>
													<MDBIcon fas icon='trash' />
												</MDBBtn >
											</MDBCol>
											<MDBCol lg='4' md='6' className='mb-4 mb-lg-0'>
												<div
													className='d-flex mb-4'
													style={{ maxWidth: '300px' }}
													>
													<MDBBtn  onClick={() => handleDecrement(product.id)} style={{backgroundColor:"#17b978"}} className='px-3 me-2'>
														<MDBIcon fas icon='minus' />
													</MDBBtn>

													<MDBInput
														value={product.quantity}
														min={1}
														type='number'
														label='Quantity'
													/>

													<MDBBtn onClick={() => handleIncrement(product.id)} style={{backgroundColor:"#17b978"}} className='px-3 ms-2'>
														<MDBIcon fas icon='plus' />
													</MDBBtn>
												</div>

												<p className='text-start text-md-center'>
													<strong>{product.price}</strong>
												</p>
											</MDBCol>
										</MDBRow>

										<hr className='my-4' />
									</>
								))}
							</MDBCardBody>
						</MDBCard>

						<MDBCard className='mb-4'>
							<MDBCardBody>
								<p>
									<strong>Expected shipping delivery</strong>
								</p>
								<p className='mb-0'>12.10.2020 - 14.10.2020</p>
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
					<MDBCol md='4'>
						<MDBCard className='mb-4'>
							<MDBCardHeader>
								<MDBTypography tag='h5' className='mb-0'>
									Summary
								</MDBTypography>
							</MDBCardHeader>
							<MDBCardBody>
								<MDBListGroup flush>
									<MDBListGroupItem className='d-flex justify-content-between align-items-center border-0 px-0 pb-0'>
										Products
										<span>$53.98</span>
									</MDBListGroupItem>
									<MDBListGroupItem className='d-flex justify-content-between align-items-center px-0'>
										Shipping
										<span>Gratis</span>
									</MDBListGroupItem>
									<MDBListGroupItem className='d-flex justify-content-between align-items-center border-0 px-0 mb-3'>
										<div>
											<strong>Total amount</strong>
											<strong>
												<p className='mb-0'>(including VAT)</p>
											</strong>
										</div>
										<span>
											<strong>{total}	</strong>
										</span>
									</MDBListGroupItem>
								</MDBListGroup>

								<MDBBtn style={{backgroundColor:"#17b978"}} block size='lg'>
									Go to checkout
								</MDBBtn>
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
		</section>):(<><p>Savatchada hech qanday narsa yo'q</p><br /><button>Katalog</button></>)}
													</>
	)
}
