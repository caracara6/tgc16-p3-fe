import React, { useState, useContext, useEffect } from 'react'

import ProductContext from '../contexts/products/ProductContext'
import CartContext from '../contexts/cart/CartContext'

import { useParams, Link } from 'react-router-dom'

import styled from 'styled-components'

import { Breadcrumb, Accordion } from 'react-bootstrap'

function ProductSingle() {
	let productContext = useContext(ProductContext)
	let cartContext = useContext(CartContext)

	let params = useParams()

	let [activeProduct, setActiveProduct] = useState({})
	// let [categoryName, setCategoryName] = useState("")
	let [quantity, setQuantity] = useState(1)

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

	return (
		<>
			<StyledProductSinglePage>
				<Breadcrumb className='breadcrumb-wrapper d-flex justify-content-center pt-2 border border-warning border-3'>
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

				<div className='container-img border border-success border-3'>
					<img className='border border-success border-3' src={activeProduct.image_url} alt={activeProduct.name}/>
				</div>
				<div className='container-action mb-3 p-2 border border-success border-3'>
					<h2>{activeProduct.name}</h2>
					<div className='call-to-action py-2 border border-success'>
						<div className='price-header ms-3'>{activeProduct ? `$${(activeProduct.price / 100).toFixed(2)}` : ""}</div>
						<div className='add-to-cart border border-primary pt-3 px-3'>
							<div className='quantity-wrapper mb-3'>
								<span className='border border-success'>Quantity</span>
								<div className='counter d-flex'>
									<button className='btn border border-success flex-grow-1' onClick={() => { decreaseQuantity() }}>
										-
									</button>
									<div className='border border-success flex-grow-1'>{quantity.toString()}</div>
									<button className='btn border border-success flex-grow-1' onClick={() => { increaseQuantity() }}>
										+
									</button>
								</div>

							</div>

							<button className='add-to-cart-btn btn border border-primary d-block mb-3'
									data-bs-toggle="modal" data-bs-target="#cartModal"
									onClick={async() => {await cartContext.addToCart(activeProduct, quantity)}}
							>
								Add To Cart
							</button>
							<button className='buy-it-now-btn btn border border-primary d-block mb-3'>
								Buy It Now
							</button>
							<div className='px-5 d-flex justify-content-end'>
								<Link to={"/categories/" + params.categoryFilter}>
									<button className='back-btn btn border border border-primary'>
										Back
									</button>
								</Link>
							</div>
						</div>
					</div>

				</div>
				<div className='container-info'>
					<p>Vintage: {activeProduct.name ? activeProduct.vintage : ""}</p>
					<p>Origin: {activeProduct.name ? activeProduct.region.name : ""}, {activeProduct.name ? activeProduct.origin_country.name : ""}</p>
					<p>Grape Varietals: {activeProduct.name ? activeProduct.grape_varietals.map(g => { return <span key={g.id}>{g.name}, </span> }) : ""}</p>
					<p>Volume: {activeProduct.name ? activeProduct.sizes.map(s => { return <span key={s.id}>{s.name} - {s.volume}ml</span> }) : ""}</p>
					<Accordion>
						<Accordion.Item eventKey="0">
							<Accordion.Header>Description</Accordion.Header>
							<Accordion.Body>
								{activeProduct.description ? activeProduct.description : ""}
							</Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="1" className={activeProduct.nose_attribute ? 'd-block' : 'd-none'}>
							<Accordion.Header>Olfactory Notes</Accordion.Header>
							<Accordion.Body>
								{activeProduct.nose_attribute ? activeProduct.nose_attribute : ""}
							</Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="3" className={activeProduct.mouth_attribute ? 'd-block' : 'd-none'}>
							<Accordion.Header>Tasting Notes</Accordion.Header>
							<Accordion.Body>
								{activeProduct.mouth_attribute ? activeProduct.mouth_attribute : ""}
							</Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="4">
							<Accordion.Header>Winery Profile</Accordion.Header>
							<Accordion.Body>
								{activeProduct.name ? activeProduct.producer.name : ""}
								<br />
								<img src={activeProduct.name ? activeProduct.producer.producer_image_url : ""} 
									alt={activeProduct.name ? activeProduct.name : ""}
								/>
								{activeProduct.name ? activeProduct.producer.description : ""}

							</Accordion.Body>
						</Accordion.Item>
					</Accordion>
				</div>
			</StyledProductSinglePage>
		</>
	)
}

const StyledProductSinglePage = styled.section`
	// border: 1px solid red;
	margin-top: 15vh;
	display: flex;
  	flex-wrap: wrap;
	position: relative;
	padding-left: 2rem;
	padding-right: 2rem;

		.container-img, .container-action, .container-info, .breadcrumb-wrapper{
			flex: 100%;
			// width: 100%!important;
			
		}

		// .breadcrumb{
		// 	margin: 0 auto;
		// }

		img {
			width: 100%;
			object-fit: cover;
		}

		.call-to-action {
			width: 100%;
		}

		.add-to-cart {
			width: 100%;
		}

		.quantity-wrapper{
			display: flex;
			justify-content: space-between
		}

		.add-to-cart-btn, .buy-it-now-btn {
			width: 100%
		}

		@media (min-width: ${({ theme }) => theme.md}) {
			.container-action{
				margin-left: 1rem;
				margin-right: 1rem;
			}
		}

		@media (min-width: ${({ theme }) => theme.lg}) {

			margin-left: 1rem;

			.container-img{
				flex-basis: 400px
			}
			.container-action{
				flex: 40%;
				position: sticky;
				top: 30px;
				bottom: 20px
			}
			.container-info{
				margin-top: 1rem;
				flex: 0;
				flex-basis: 450px;
				margin-right: auto
			}
			.call-to-action{
				margin-top: 1rem
			}
		}
`

export default ProductSingle