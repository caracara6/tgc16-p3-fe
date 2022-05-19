import React, { useContext, useEffect, useState } from 'react'
import { checkout } from '../services/checkout'
import CartContext from '../contexts/cart/CartContext'

import { useNavigate } from 'react-router-dom'

import Modal from 'react-bootstrap/Modal'



import styled from 'styled-components'

import { Container, Row, Col, Button } from 'react-bootstrap'

function CartModal() {

	const cartContext = useContext(CartContext)

	let [cartItems, setCartItems] = useState([])

	let [updateCartMsg, setUpdateCartMsg] = useState("")

	let [modalState, setModalState] = useState("")

	const navigate = useNavigate()

	const changeQuantity = async (productId, quantity) => {
		let updateCartMsg = await cartContext.updateQuantityCart(productId, quantity)

		setUpdateCartMsg(updateCartMsg)
	}

	const handleCheckout = async () => {

		if (localStorage.getItem('userTokenInfo')) {
			let result = await checkout();
			if (result.status) {
				setModalState("modal")
				setUpdateCartMsg("")
				window.location.href = result.url;
			} else {
				console.log('testing cart at checkout')
				setModalState("")
				setUpdateCartMsg(result.message)
				cartContext.refreshCartItems()
			}
		} else {
			setModalState("modal")
			navigate('/account/login')
		}
	}

	function renderCartItems() {

		if (cartItems.length) {

			return <React.Fragment>
				<p>{updateCartMsg}</p>
				{
					cartItems.map((c, i) => {
						return <React.Fragment key={i}>
							<Col xs={12} md={6} >
								<Row className='d-flex'>
									<Col className='cart-image-wrapper align-self-center' xs={4}><img src={c.product.image_url} /></Col>
									<Col xs={8}>{c.product.name}</Col>
								</Row>
								
							</Col>
							<Col className="px-0 d-flex align-items-center" xs={12} md={6} >
								<div className='d-flex my-2 justify-content-between action-wrapper'>
									<div className='counter d-flex'>
										<button className='btn ' onClick={() => { changeQuantity(c.product.id, c.quantity - 1) }}>
											-
										</button>
										<div className='count '>{c.quantity}</div>
										<button className='btn ' onClick={() => { changeQuantity(c.product.id, c.quantity + 1) }}>
											+
										</button>
									</div>

									<div className='price align-self-center'>
										${(c.product.price / 100).toFixed(2)}
									</div>
								</div>
							</Col>
						</React.Fragment>
					})
				}
			</React.Fragment>

		} else {
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
						<h5 className="modal-title" id="cartModalLabel">SHOPPING CART</h5>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { setUpdateCartMsg("") }}></button>
					</div>
					<div className="modal-body">
						<Container>
							<Row className='eachCartRow'>
								{renderCartItems()}
							</Row>
							<Row>
								<Col xs={12} md={6} className='mt-3'>
									<Button id='continue-shopping-btn' data-bs-dismiss="modal">
										CONTINUE SHOPPING
									</Button>
								</Col>
								<Col xs={12} md={6} className='mt-3'>
									<Button id='checkout-btn' data-bs-dismiss={modalState} onClick={() => { handleCheckout() }}>
										CHECKOUT
									</Button>
								</Col>
							</Row>
						</Container>

					</div>
				</div>
			</div>
		</StyledCartModal>
	)
}

const StyledCartModal = styled.div`

.modal-header{
	display: block!important;
	background-color: ${({ theme }) => theme.colours.light};
	position: relative;
	border-bottom: none;
	text-align: center;

	.btn-close{
		position: absolute;
		right: 20px;
		top: 25px;
	}
}

.modal-backdrop {
	background-color: red;
}

.action-wrapper{
	width: 100%;
	padding: 0 0rem 0.5rem;
	border-bottom: 1px solid ${({ theme }) => theme.colours.dark}

}

.count{
	padding: 0.7rem 0.7rem 0.25rem;
}

.counter button {
	background-color: ${({ theme }) => theme.colours.dark};
	border-radius: 0px!important;
	color: white;
	font-size: 1.5rem;
	padding: 0.1rem 0.75rem;
}

.modal-content{
	border-radius: 0px!important;
}

.cart-image-wrapper{
	height: 100%!important
}

.cart-image-wrapper img{
	max-width: 100%;
	object-fit: cover;
}

img {
	height: 100%
}

#checkout-btn{
	width: 100%;
	border-radius: 0px;
	background-color: black;
	border: 0px!important;
	border-color: transparent!important;
}

#continue-shopping-btn{
	width: 100%;
	border-radius: 0px;
	background-color: ${({ theme }) => theme.colours.light};
	color: black;
	border: 0px!important;
	border-color: transparent!important;
}

@media (min-width: ${({ theme }) => theme.md}) {
	.action-wrapper {
		padding: 0 1rem, 0;
		border-bottom: none;
	}

	.eachCartRow > div {
		border-bottom: 1px solid ${({ theme }) => theme.colours.dark};
		margin-bottom: 1rem;
		padding-bottom: 1rem;
	}
}


`

export default CartModal