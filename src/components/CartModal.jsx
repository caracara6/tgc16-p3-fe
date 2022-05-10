import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { checkout } from '../services/checkout'
import CartContext from '../contexts/cart/CartContext'



import styled from 'styled-components'

import { Container, Row, Col, Button } from 'react-bootstrap'

function CartModal() {

	const cartContext = useContext(CartContext)
	// const navigate = useNavigate();

	const changeQuantity = async (productId, quantity) => {
		await cartContext.updateQuantityCart(productId, quantity)
		
	}

	const handleCheckout = async () => {
		// navigate('/')
		//navigate to session.url??
		let resultUrl = await checkout();
		if(resultUrl){
			window.location.href = resultUrl;
		}
		// if !result
	}

	function renderCartItems () {
		// console.log(cartContext.getCartItems())
		// console.log('testing render cart')

		if(cartContext.getCartItems().length){
			return cartContext.getCartItems().map((c, i) => {
				return <React.Fragment key={i}>
					<Col className="border border-danger" xs={12} md={6} >
						<Row>
							<Col className='cart-image-wrapper' xs={4}><img src={c.product.image_url} /></Col>
							<Col xs={8}>{c.product.name}</Col>
						</Row>
						{/* <div className='cart-image-wrapper'>
					<img src={c.product.image_url}/>
				</div> */}
					</Col>
					<Col className="border border-danger d-flex justify-content-between" xs={12} md={6} >
						<div className='counter d-flex'>
							<button className='btn border border-success flex-grow-1' onClick={() => {changeQuantity(c.product.id, c.quantity - 1)}}>
								-
							</button>
							<div className='border border-success flex-grow-1'>{c.quantity}</div>
							<button className='btn border border-success flex-grow-1' onClick={() => {changeQuantity(c.product.id, c.quantity + 1)}}>
								+
							</button>
						</div>
						<div>
							${(c.product.price/100).toFixed(2)}
						</div>
					</Col>
				</React.Fragment>
			})
		} else {
			// console.log('testing render cart')
			return 
		}
		
	}

	// useEffect(() => {
	// 	renderCartItems()
	// }, [cartContext])

	return (
		<StyledCartModal className="modal fade" id="cartModal" tabIndex="-1" aria-labelledby="cartModalLabel" aria-hidden="true">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="cartModalLabel">Shopping Cart</h5>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body border border-danger">
						<Container>
							<Row>
								{renderCartItems()}
							</Row>
							<Row>
								<Col xs={12} md={6} className='border border-success mt-3'>
									<Button className='cart-btn' data-bs-dismiss="modal">
										Continue Shopping
									</Button>
								</Col>
								<Col xs={12} md={6} className='border border-success mt-3'>
									<Button className='cart-btn' data-bs-dismiss="modal" onClick={() => {handleCheckout()}}>
										Checkout
									</Button>
								</Col>
							</Row>
						</Container>

					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
						<button type="button" className="btn btn-primary">Save changes</button>
					</div>
				</div>
			</div>
		</StyledCartModal>
	)
}

const StyledCartModal = styled.div`

// .cart-body-content{
// 	position: relative;
// 	inset: 1rem 0;
// 	margin: auto;
	
// }

.cart-image-wrapper img{
	max-width: 100%;
	object-fit: cover;
}

img {
	height: 100%
}

.cart-btn{
	width: 100%;
}
`

export default CartModal