import React, { useState, useContext, useEffect } from 'react'
// import { getProductById } from '../services/products'
import ProductContext from '../contexts/products/ProductContext'
import { useParams, Link } from 'react-router-dom'

import styled from 'styled-components'

import { Breadcrumb, Accordion } from 'react-bootstrap'

function ProductSingle() {
	let context = useContext(ProductContext)

	let params = useParams()

	let [activeProduct, setActiveProduct] = useState({})
	let [categoryName, setCategoryName] = useState("")
	let [quantity, setQuantity] = useState(1)

	useEffect(() => {
		context.setActiveProductId(params.productId)
		setCategoryName(getCategoryName());
	}, [])

	useEffect(() => {
		setActiveProduct(context.getActiveProduct())
	}, [context])

	console.log('activeProduct', activeProduct)


	function getCategoryName() {
		console.log("CategoryId", context.allCategories())
		let categoryObject = context.allCategories().filter(c => parseInt(params.categoryFilter) === c.id)
		console.log(categoryObject[0].name)
		return categoryObject[0].name
	}

	const increaseQuantity = () => {
		setQuantity(quantity++)
	}

	const decreaseQuantity = () => {
		setQuantity(quantity > 1 ? quantity-- : 1)
	}

	return (
		<>
			<StyledProductSinglePage>
				<Breadcrumb>
					<Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
						Home
					</Breadcrumb.Item>
					<Breadcrumb.Item linkAs={Link} linkProps={{ to: "/categories/" + params.categoryFilter }}>
						{categoryName ? categoryName : ""}
					</Breadcrumb.Item>
					<Breadcrumb.Item active>
						{activeProduct.name ? activeProduct.name.slice(0, 31) + '...' : ""}
					</Breadcrumb.Item>
				</Breadcrumb>

				<div className='container-img'>
					<img src={activeProduct.image_url} />
				</div>
				<div className='container-action'>
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

							<button className='add-to-cart-btn btn border border-primary d-block mb-3'>
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
					<p>Grape Varietals: {activeProduct.name ? activeProduct.grape_varietals.map(g => { return <span>{g.name}, </span> }) : ""}</p>
					<p>Volume: {activeProduct.name ? activeProduct.sizes.map(s => { return <span>{s.name} - {s.volume}ml</span> }) : ""}</p>
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
								<img src={activeProduct.name ? activeProduct.producer.producer_image_url : ""} />
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
	border: 1px solid red;
	display: flex;
  	flex-wrap: wrap;

		.container-img, .container-action, .container-info{
			flex: 100%;
			width: 100%!important;
			border: 1px solid blue;
		}

		img {
			max-width: 100%;
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
`

export default ProductSingle