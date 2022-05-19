import React, { useState, useContext, useEffect } from 'react'

import ProductContext from '../contexts/products/ProductContext'
import CartContext from '../contexts/cart/CartContext'

import { useParams, Link, useNavigate } from 'react-router-dom'

import { checkout } from '../services/checkout'

import styled from 'styled-components'

import { FaChevronRight } from 'react-icons/fa'

import { Breadcrumb, Accordion } from 'react-bootstrap'

function ProductSingle() {
	let productContext = useContext(ProductContext)
	let cartContext = useContext(CartContext)

	let params = useParams()

	let [activeProduct, setActiveProduct] = useState({})
	let [quantity, setQuantity] = useState(1)

	let [checkOutMsg, setCheckoutMsg] = useState("")

	const navigate = useNavigate()

	useEffect(() => {
		productContext.setActiveProductId(params.productId)
		// setCategoryName(getCategoryName());
	}, [])

	useEffect(() => {
		setActiveProduct(productContext.getActiveProduct())
	}, [productContext])


	// function getCategoryName() {
	// 	console.log('testing refresh', params.categoryFilter)
	// 	console.log(productContext.allCategories())
	// 	let categoryResultArray = productContext.allCategories().filter(c => parseInt(params.categoryFilter) === c.id)
	// 	console.log(categoryResultArray)
	// 	return categoryResultArray[0].name
	// }

	const increaseQuantity = () => {
		setQuantity(quantity++)
	}

	const decreaseQuantity = () => {
		setQuantity(quantity > 1 ? quantity-- : 1)
	}

	const handleCheckout = async () => {
		
		if (localStorage.getItem('userTokenInfo')) {

			let resultAddToCart = await cartContext.addToCart(activeProduct, quantity)
			console.log('resultAddToCart', resultAddToCart)
			// && resultAddToCart.message === 'You have added this item to your cart successfully'
			if (resultAddToCart.status) {
				let result = await checkout()
				console.log('result', result)
				if (result.status) {
					
					window.location.href = result.url;
				} else {
					setCheckoutMsg(result.message)
					cartContext.refreshCartItems()
				}
			} else {
				setCheckoutMsg(resultAddToCart.message)
			}
		} else {
			navigate('/account/login')
		}
	}

	return (
		<>
			<StyledProductSinglePage>
				<Breadcrumb className='breadcrumb-wrapper pt-2'>
					<Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
						Home
					</Breadcrumb.Item>
					<Breadcrumb.Item linkAs={Link} linkProps={{ to: "/categories/" + params.categoryFilter }}>
						{activeProduct.name ? activeProduct.category.name : ''}
					</Breadcrumb.Item>
					<Breadcrumb.Item active>
						{/* {activeProduct.name ? activeProduct.name.slice(0, 31) + '...' : ""} */}
						{activeProduct.name ? activeProduct.name.length > 30 ? activeProduct.name.slice(0, 31) + '...' : activeProduct.name : ""}
					</Breadcrumb.Item>
				</Breadcrumb>

				<div className='container-img '>
					<img className='' src={activeProduct.image_url} alt={activeProduct.name} />
				</div>
				<div className='container-action mb-3 p-2 px-3'>
					<h2>{activeProduct.name ? activeProduct.name.toUpperCase() : null}</h2>
					<div className='call-to-action pb-2'>
						<div className='price-header py-2 ps-3'>{activeProduct ? `$${(activeProduct.price / 100).toFixed(2)}` : ""}</div>
						<div className='add-to-cart pt-3 px-3'>
							<div className='quantity-wrapper mt-3 mb-4'>
								<span>Quantity</span>
								<div className='counter d-flex'>
									<button className='btn flex-grow-1' onClick={() => { decreaseQuantity() }}>
										-
									</button>
									<div className='flex-grow-1'>{quantity.toString()}</div>
									<button className='btn flex-grow-1' onClick={() => { increaseQuantity() }}>
										+
									</button>
								</div>

							</div>

							<button className='add-to-cart-btn btn d-block mb-3 py-2'
								data-bs-toggle="modal" data-bs-target="#cartModal"
								onClick={async () => { await cartContext.addToCart(activeProduct, quantity) }}
							>
								ADD TO CART +
							</button>
							<button className='buy-it-now-btn btn d-block mb-3 py-2' onClick={async() => { handleCheckout() }}>
								BUY IT NOW
							</button>
							<div className='px-5 d-flex justify-content-end'>
								<Link to={"/categories/" + params.categoryFilter}>
									<button className='back-btn btn'>
										BACK
										<FaChevronRight />
									</button>
								</Link>
							</div>
							<p>{checkOutMsg}</p>
						</div>
					</div>

				</div>
				<div className='container-info'>
					<p><strong>Vintage: </strong>{activeProduct.name ? activeProduct.vintage : ""}</p>
					<p><strong>Origin: </strong>{activeProduct.name ? activeProduct.region.name : ""}, {activeProduct.name ? activeProduct.origin_country.name : ""}</p>
					<p><strong>Grape Varietal: </strong>{activeProduct.name ? activeProduct.grape_varietals.map(g => { return <span key={g.id}>{g.name}, </span> }) : ""}</p>
					<p><strong>Volume: </strong>{activeProduct.name ? activeProduct.sizes.map(s => { return <span key={s.id}>{s.name} - {s.volume}ml</span> }) : ""}</p>
					<Accordion className='mb-5'>
						<Accordion.Item className='shadow-none' eventKey="0">
							<Accordion.Header>DESCRIPTION</Accordion.Header>
							<Accordion.Body>
								{activeProduct.description ? activeProduct.description : ""}
							</Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="1" className={activeProduct.nose_attribute ? 'd-block' : 'd-none'}>
							<Accordion.Header>OLFACTORY NOTES</Accordion.Header>
							<Accordion.Body>
								{activeProduct.nose_attribute ? activeProduct.nose_attribute : ""}
							</Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="3" className={activeProduct.mouth_attribute ? 'd-block' : 'd-none'}>
							<Accordion.Header>TASTING NOTES</Accordion.Header>
							<Accordion.Body>
								{activeProduct.mouth_attribute ? activeProduct.mouth_attribute : ""}
							</Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="4">
							<Accordion.Header>WINERY PROFILE</Accordion.Header>
							<Accordion.Body>
								<strong><p>{activeProduct.name ? activeProduct.producer.name : ""}</p></strong>
								<br />
								<img src={activeProduct.name ? activeProduct.producer.producer_image_url : ""}
									alt={activeProduct.name ? activeProduct.name : ""}
									className='mb-3'
								/>
								<p>{activeProduct.name ? activeProduct.producer.description : ""}</p>

							</Accordion.Body>
						</Accordion.Item>
					</Accordion>
				</div>
			</StyledProductSinglePage>
		</>
	)
}

const StyledProductSinglePage = styled.section`
	@keyframes slideIn {
		from{
			width: 0;
		}

		to{
			width: 40px;
			transition: width 0.5s ease-out;
		}
	}
	margin-top: 15vh;
	display: flex;
  	flex-wrap: wrap;
	position: relative;
	padding-left: 2rem;
	padding-right: 2rem;

		.breadcrumb {
			display: flex;
			justify-content: center
		}

		.container-img, .container-action, .container-info, .breadcrumb-wrapper{
			flex: 100%;
			// width: 100%!important;
		}

		svg {
			height: 10px
		}

		a{
			text-decoration: none;
			color: ${({ theme }) => theme.colours.dark};
		}

		img {
			width: 100%;
			object-fit: cover;
		}

		.call-to-action {
			width: 100%;
			border: 1px solid ${({ theme }) => theme.colours.dark};
		}

		.add-to-cart {
			width: 100%;
		}

		.quantity-wrapper{
			display: flex;
			justify-content: space-between
		}

		.add-to-cart-btn, .buy-it-now-btn {
			width: 100%;
			border-radius: 0px;
			border: none!important;
		}

		.add-to-cart-btn {
			background-color: ${({ theme }) => theme.colours.light}
		}

		.buy-it-now-btn {
			background-color: ${({ theme }) => theme.colours.dark};
			color: white;
		}

		.back-btn {
			background-color: ${({ theme }) => theme.colours.dark};
			color: white;
			margin-bottom: 1rem;
			padding-left: 1rem;
			border-radius: 0px
		}

		.price-header{
			background-color: ${({ theme }) => theme.colours.light}
		}

		.container-action h2{
			position: relative;
			margin-bottom: 2rem;
			margin-top: 1rem;
			
		}

		.container-action h2::after{
			content: "";
			width: 40px;
			margin-top: 1rem;
			height: 3px;
			background-color: ${({ theme }) => theme.colours.dark};
			position absolute;
			left: 1rem;
			bottom: -15px;
			margin-left: -15px;
			animation: slideIn 3s
		}

		.counter{
			border: 1px solid ${({ theme }) => theme.colours.dark};
		}

		.counter button {
			background-color: white;
			border-radius: 0px!important;
			color: ${({ theme }) => theme.colours.dark};
			font-size: 0.7rem;
			padding: 0.1rem 0.75rem;
		}

		.counter div {
			padding: 0.4rem 0.8rem 0.25rem;
			background-color: ${({ theme }) => theme.colours.light};
		}

		.accordion-item:focus, .accordion-button:focus{
			background-color: white;
		}

		.accordion-item {
			border: none !important;
			border-left: none!important;
			border-right: none!important;
			border-bottom: none!important;
			border-top: 1px solid ${({ theme }) => theme.colours.dark}!important
		}

		@media (min-width: ${({ theme }) => theme.md}) {
			margin-top: 5vh;
			
			.container-action{
				margin-left: 1rem;
				margin-right: 1rem;
			}
		}

		@media (min-width: ${({ theme }) => theme.lg}) {

			margin-left: 4rem;
			margin-right: 0rem;
			padding-left: 3rem;
			padding-right: 3rem;


			.container-img{
				flex-basis: 40vw;
			}
			.container-action{
				flex: 40%;
				position: sticky;
				top: 15rem;
				display: inline;
				height: fit-content;
			}
			.container-info{
				margin-top: 1rem;
				flex: 0;
				flex-basis: 40vw;
				margin-right: auto
			}
			.call-to-action{
				margin-top: 1rem
			}
		}

		@media (min-width: ${({ theme }) => theme.xl}) {
			padding-left: 8vw;
			padding-right: 15vw;
		}
`

export default ProductSingle