import React, { useState, useContext, useEffect, } from 'react'
import { useParams } from 'react-router-dom'
import ProductContext from '../contexts/products/ProductContext';

import { StyledProductListingsLayout, StyledProductListings } from '../components/styles/ProductListings.styled'

import SideFilter from '../components/SideFilter'
import FilterOffCanvas from '../components/FilterOffCanvas';
import ProductCard from '../components/ProductCard';

import { Row, Col, Button, Dropdown } from 'react-bootstrap'

function ProductListings() {

	const productContext = useContext(ProductContext);

	let [products, setProducts] = useState([])

	const [activeHeaders, setActiveHeaders] = useState({})

	let [uniqueRegions, setUniqueRegions] = useState([])
	let [regionSelected, setRegionSelected] = useState([])

	let [uniqueCountries, setUniqueCountries] = useState([])
	let [countrySelected, setCountrySelected] = useState([])

	let [uniqueVintages, setUniqueVintages] = useState([])
	let [vintageSelected, setVintageSelected] = useState([])

	let [uniqueProducers, setUniqueProducers] = useState([])
	let [producerSelected, setProducerSelected] = useState([])

	let priceRange = [
		{ id: 1, display: 'Below $50', lowerLimit: 0, upperLimit: 4999 },
		{ id: 2, display: '$50 to $100', lowerLimit: 5000, upperLimit: 9999 },
		{ id: 3, display: '$100 to $150', lowerLimit: 10000, upperLimit: 14999 },
		{ id: 4, display: 'Above $150', lowerLimit: 15000, upperLimit: 99999999999 }
	]

	let [priceRangeSelected, setPriceRangeSelected] = useState({})


	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	let headersArr = [
		{
			id: 'all',
			header: 'All WINE COLLECTION',
			url: 'https://assets.gqindia.com/photos/5fd2295bc7b41e72e9031a5a/master/pass/wine-top-image.jpg'
		},
		{
			id: '1',
			header: 'RED WINE',
			url: 'https://cdn.shopify.com/s/files/1/0507/5540/3951/collections/shutterstock_259104998_2450x.jpg?v=1608741570'
		},
		{
			id: '2',
			header: 'WHITE WINE',
			url: 'https://www.israel21c.org/wp-content/uploads/2020/05/shutterstock_626512295-1000x657.jpg'
		},
		{
			id: '3',
			header: 'ROSÉ WINE',
			url: 'https://www.thespruceeats.com/thmb/as_7iwRVoyusWeVI_yQ6vjnC2vE=/940x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/twenty20_a74f5065-444e-4d33-973b-4dc14fc08f80-5908ca0f5f9b5864705a606e.jpg'
		},
		{
			id: '4',
			header: 'CHAMPAGNE',
			url: 'https://static.onecms.io/wp-content/uploads/sites/23/2020/05/04/pour-sparkling.jpg'
		},
		{
			id: '5',
			header: 'SPARKLING WINE',
			url: 'https://images.ctfassets.net/3s5io6mnxfqz/3JZeSBR1r0kaq4J2CVhBvy/4ab04858a7c8831bdc24b2315606ef57/AdobeStock_185937370.jpeg?fm=jpg&w=900&fl=progressive'
		},

	]

	useEffect(() => {
		setProducts(productContext.allProducts())

		setRegionSelected([])
		setCountrySelected([])
		setVintageSelected([])
		setProducerSelected([])

	}, [productContext.getLoaded()])

	useEffect(() => {

		setProducts(productContext.allProducts())

		//returns an array of unique region names
		let uniqueRegions = productContext.allProducts().length ? [...new Set(productContext.allProducts().map(p => p.region.name))] : []
		setUniqueRegions(uniqueRegions.sort())

		let uniqueCountries = productContext.allProducts().length ? [...new Set(productContext.allProducts().map(p => p.origin_country.name))] : []
		setUniqueCountries(uniqueCountries.sort())

		let uniqueVintages = productContext.allProducts().length ? [...new Set(productContext.allProducts().map(p => p.vintage))] : []
		setUniqueVintages(uniqueVintages.sort(function(a, b){return a - b}))

		let uniqueProducers = productContext.allProducts().length ? [...new Set(productContext.allProducts().map(p => p.producer.name))] : []
		setUniqueProducers(uniqueProducers.sort())

		setRegionSelected([])
		setCountrySelected([])
		setVintageSelected([])
		setProducerSelected([])

	}, [productContext.allProducts()])

	useEffect(() => {
		// setProducts(productContext.allProducts())

		let selectedProducts = [];

		console.log('__________')

		// let filterFields = regionSelected.concat(countrySelected).concat(vintageSelected)

		// console.log(filterFields)

		if (regionSelected.length) {
			selectedProducts = productContext.allProducts().filter(p => {
				for (let r of regionSelected) {
					if (p.region.name === r) {
						return p
					}
				}
			})

			console.log('selectedProducts for regions', selectedProducts)
		} else {

			console.log('..........')
			selectedProducts = productContext.allProducts()
		}

		if (countrySelected.length) {
			selectedProducts = selectedProducts.filter(p => {
				for (let c of countrySelected) {
					if (p.origin_country.name === c) {
						return p
					}
				}
			})
		}
		// else{
		// 	selectedProducts = productContext.allProducts()
		// }

		if (vintageSelected.length) {
			selectedProducts = selectedProducts.filter(p => {
				for (let v of vintageSelected) {
					if (p.vintage === parseInt(v)) {
						return p
					}
				}
			})
		}

		if (producerSelected.length) {
			selectedProducts = selectedProducts.filter(p => {
				for (let pr of producerSelected) {
					if (p.producer.name === pr) {
						return p
					}
				}
			})
		}

		function filterByPrice(arr, lowerLimit, upperLimit) {
			console.log(lowerLimit, upperLimit)
			let selectedProducts = arr.filter(item => item.price <= upperLimit && item.price >= lowerLimit)
			console.log('selectedProducts', selectedProducts)
			return selectedProducts
		}

		if (priceRangeSelected.id) {
			selectedProducts = filterByPrice(selectedProducts, priceRangeSelected.lowerLimit, priceRangeSelected.upperLimit)
		}


		// else{
		// 	selectedProducts = productContext.allProducts()
		// }

		// filterFields.map(f => {
		// 	productContext.allProducts().map(p => {

		// 		if (p.region.name === f) {
		// 			selectedProducts.push(p)
		// 		} else if (p.origin_country.name === f) {
		// 			selectedProducts.push(p)
		// 		} else if (p.vintage === parseInt(f)) {
		// 			selectedProducts.push(p)
		// 		}
		// 	})
		// })


		// function removeDeplicateProduct( data, key) {
		// 	return [
		// 	...new Map(
		// 	data.map(x => [ key(x), x])
		// 	).values()
		// 	]
		// }

		// selectedProducts = removeDeplicateProduct(selectedProducts, p => p.name)

		if (selectedProducts.length > 0) {
			setProducts(selectedProducts)
		} else {
			setProducts([])
		}
	}, [regionSelected, countrySelected, vintageSelected, priceRangeSelected, producerSelected])

	let { categoryFilter } = useParams()

	useEffect(() => {
		if (categoryFilter === "all") {
			productContext.setCategoryFilter("")
			setActiveHeaders(headersArr[0])
		} else {
			let activeHeaders = headersArr.filter(h => h.id === categoryFilter)
			setActiveHeaders(activeHeaders[0])
			productContext.setCategoryFilter(categoryFilter)
		}
	}, [categoryFilter])

	useEffect(() => {

		if (categoryFilter === "all") {
			productContext.setCategoryFilter("")
			setActiveHeaders(headersArr[0])
		} else {
			let activeHeaders = headersArr.filter(h => h.id === categoryFilter)
			setActiveHeaders(activeHeaders[0])
			productContext.setCategoryFilter(categoryFilter)
		}

	}, [])




	return (
		<React.Fragment>
			<StyledProductListingsLayout>
				<Row className='header mx-0 '>
					<Col xs={12} className='px-0'>
						<div className="header-img-wrapper">
							<img className='w-100' src={activeHeaders.url} alt={activeHeaders.header} />
						</div>
						<h2>{activeHeaders.header}</h2>
					</Col>
				</Row>


				<Row className='d-lg-none mx-0 mb-4 filter-wrapper'>
					<Col xs={12} md={6}>
						<Button className='w-100 my-2 d-lg-none filter-btn' onClick={handleShow}>
							FILTER
						</Button>
					</Col>
					<Col xs={12} md={6}>
						<Dropdown>
							<Dropdown.Toggle className='w-100 my-2' variant="success" id="dropdown-basic">
								Dropdown Button
							</Dropdown.Toggle>

							<Dropdown.Menu>
								<Dropdown.Item >Action</Dropdown.Item>
								<Dropdown.Item >Another action</Dropdown.Item>
								<Dropdown.Item >Something else</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
						{/* <Button className='w-100 my-2'>
							Sort
						</Button> */}
					</Col>
				</Row>

				<FilterOffCanvas show={show} handleClose={handleClose}

					uniqueRegions={uniqueRegions.length ? uniqueRegions : []}
					setUniqueRegions={setUniqueRegions}
					regionSelected={regionSelected}
					setRegionSelected={setRegionSelected}

					uniqueCountries={uniqueCountries.length ? uniqueCountries : []}
					setUniqueCountries={setUniqueCountries}
					countrySelected={countrySelected}
					setCountrySelected={setCountrySelected}

					uniqueVintages={uniqueVintages.length ? uniqueVintages : []}
					setUniqueVintages={setUniqueVintages}
					vintageSelected={vintageSelected}
					setVintageSelected={setVintageSelected}

					priceRange={priceRange}
					priceRangeSelected={priceRangeSelected}
					setPriceRangeSelected={setPriceRangeSelected}

					uniqueProducers={uniqueProducers.length ? uniqueProducers : []}
					setUniqueProducers={setUniqueProducers}
					producerSelected={producerSelected}
					setProducerSelected={setProducerSelected}
				/>

				<SideFilter uniqueRegions={uniqueRegions.length ? uniqueRegions : []}
					setUniqueRegions={setUniqueRegions}
					regionSelected={regionSelected}
					setRegionSelected={setRegionSelected}

					uniqueCountries={uniqueCountries.length ? uniqueCountries : []}
					setUniqueCountries={setUniqueCountries}
					countrySelected={countrySelected}
					setCountrySelected={setCountrySelected}

					uniqueVintages={uniqueVintages.length ? uniqueVintages : []}
					setUniqueVintages={setUniqueVintages}
					vintageSelected={vintageSelected}
					setVintageSelected={setVintageSelected}

					priceRange={priceRange}
					priceRangeSelected={priceRangeSelected}
					setPriceRangeSelected={setPriceRangeSelected}

					uniqueProducers={uniqueProducers.length ? uniqueProducers : []}
					setUniqueProducers={setUniqueProducers}
					producerSelected={producerSelected}
					setProducerSelected={setProducerSelected}
				/>



				<StyledProductListings className='row'>

					{products.length ? products.map(p => {
						return <div key={p.id} className='col col-6 col-md-4 '>
							<ProductCard
								product={p}
							/>
						</div>
					}) : <p>Sorry, there are zero results for your search</p>}


				</StyledProductListings>




			</StyledProductListingsLayout>






		</React.Fragment>


	)
}

export default ProductListings