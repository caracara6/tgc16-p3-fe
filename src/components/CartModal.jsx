import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { checkout } from '../services/checkout'
import CartContext from '../contexts/cart/CartContext'



import styled from 'styled-components'

import { Container, Row, Col, Button } from 'react-bootstrap'

function CartModal() {

	const cartContext = useContext(CartContext)

	let [cartItems, setCartItems ] = useState([])
	// const navigate = useNavigate();

	let [updateCartMsg, setUpdateCartMsg] = useState("")

	const changeQuantity = async (productId, quantity) => {
		let updateCartMsg = await cartContext.updateQuantityCart(productId, quantity)

		setUpdateCartMsg(updateCartMsg)

	}

	const handleCheckout = async () => {
		// navigate('/')
		//navigate to session.url??

		// try{
		let result = await checkout();
		if (result.status) {
			setUpdateCartMsg("")
			window.location.href = result.url;
		} else {
			console.log('testing cart at checkout')
			setUpdateCartMsg(result.message)
			cartContext.refreshCartItems()
		}
		// } catch (e) {
		// 	console.log('testing checkout at cart')
		// 	console.log(e)
		// }

		// if !result
	}

	function renderCartItems() {
		// console.log(cartContext.getCartItems())
		// console.log('testing cartContext.getCartItems()', cartContext.getCartItems())

		if (cartItems.length) {

			return <React.Fragment>
				<p>{updateCartMsg}</p>
				{
					cartItems.map((c, i) => {
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
									<button className='btn border border-success flex-grow-1' onClick={() => { changeQuantity(c.product.id, c.quantity - 1) }}>
										-
									</button>
									<div className='border border-success flex-grow-1'>{c.quantity}</div>
									<button className='btn border border-success flex-grow-1' onClick={() => { changeQuantity(c.product.id, c.quantity + 1) }}>
										+
									</button>
								</div>
								<div>
									${(c.product.price / 100).toFixed(2)}
								</div>
							</Col>
						</React.Fragment>
					})
				}
			</React.Fragment>

		} else {
			// console.log('testing render cart')
			return <p>Your cart is empty</p>
		}

	}

	useEffect(() => {
		setCartItems(cartContext.getCartItems())
	}, [cartContext])

	return (
		<StyledCartModal className="modal fade" id="cartModal" tabIndex="-1" aria-labelledby="cartModalLabel" aria-hidden="true">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="cartModalLabel">Shopping Cart</h5>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => {setUpdateCartMsg("")}}></button>
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
									<Button className='cart-btn' data-bs-dismiss="modal" onClick={() => { handleCheckout() }}>
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