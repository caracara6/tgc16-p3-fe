import React, { useState, useContext, useEffect, } from 'react'
import { useParams } from 'react-router-dom'
import ProductContext from '../contexts/products/ProductContext';

import { StyledProductListingsLayout, StyledProductListings } from '../components/styles/ProductListings.styled'

import SideFilter from '../components/SideFilter'
import ProductCard from '../components/ProductCard';

import { Row, Col, Button, Offcanvas, Dropdown } from 'react-bootstrap'

function ProductListings() {

	const productContext = useContext(ProductContext);

	let [products, setProducts] = useState([])

	let [uniqueRegions, setUniqueRegions] = useState([])
	let [regionSelected, setRegionSelected] = useState([])

	let [uniqueCountries, setUniqueCountries] = useState([])
	let [countrySelected, setCountrySelected] = useState([])

	let [uniqueVintages, setUniqueVintages] = useState([])
	let [vintageSelected, setVintageSelected] = useState([])

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {
		setProducts(productContext.allProducts())

	}, [productContext.allProducts()])

	useEffect(() => {
		// let uniqueRegions = products.length ? products.map( p => {return p.region.name}) : null
		//returns an array of unique region names
		let uniqueRegions = productContext.allProducts().length ? [...new Set(productContext.allProducts().map(p => p.region.name))] : []
		setUniqueRegions(uniqueRegions)

		let uniqueCountries = productContext.allProducts().length ? [...new Set(productContext.allProducts().map(p => p.origin_country.name))] : []
		setUniqueCountries(uniqueCountries)

		let uniqueVintages = productContext.allProducts().length ? [...new Set(productContext.allProducts().map(p => p.vintage))] : []
		setUniqueVintages(uniqueVintages)



	}, [productContext.allProducts()])

	useEffect(() => {
		let selectedProducts = [];

		// let filterFields = regionSelected.concat(countrySelected).concat(vintageSelected)

		// console.log(filterFields)

		if(regionSelected.length){
			selectedProducts = productContext.allProducts().filter( p => {
				for (let r of regionSelected) {
					if(p.region.name === r){
						return p
					}
				}
			})

			console.log('selectedProducts for regions', selectedProducts)
		} else {

			console.log('..........')
			selectedProducts = productContext.allProducts()
		}

		if(countrySelected.length){
			selectedProducts = selectedProducts.filter( p => {
				for (let c of countrySelected) {
					if(p.origin_country.name === c){
						return p
					}
				}
			})
		} 
		// else{
		// 	selectedProducts = productContext.allProducts()
		// }

		if(vintageSelected.length){
			selectedProducts = selectedProducts.filter( p => {
				for (let v of vintageSelected) {
					if(p.vintage === parseInt(v)){
						return p
					}
				}
			})
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

		console.log('selectedProducts', selectedProducts)

		if (selectedProducts.length > 0) {
			setProducts(selectedProducts)
		} else {
			setProducts([])
		}
	}, [regionSelected, countrySelected, vintageSelected])

	// useEffect(() => {
	// 	let selectedProducts = [];

	// 	// console.log(countrySelected)

	// 	countrySelected.map( c => {  
	// 		productContext.allProducts().map ( p => p.origin_country.name === c ? selectedProducts.push(p) : null)
	// 	})

	// 	if (selectedProducts.length > 0) {
	// 		setProducts(selectedProducts)
	// 	} else {
	// 		setProducts(productContext.allProducts())
	// 	}

	// }, [countrySelected])

	let { categoryFilter } = useParams()

	if (categoryFilter === "all") {
		productContext.setCategoryFilter("")
	} else {
		productContext.setCategoryFilter(categoryFilter)
	}



	return (
		<React.Fragment>



			<StyledProductListingsLayout>

				<Row className='d-lg-none mx-0 border border-success filter-wrapper'>
					<Col xs={12} md={6}>
						<Button className='w-100 my-2 d-lg-none' onClick={handleShow}>
							Filter
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

				<Offcanvas show={show} onHide={handleClose}>
					<Offcanvas.Header closeButton>
						<Offcanvas.Title>Offcanvas</Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body>
						Some text as placeholder. In real life you can have the elements you
						have chosen. Like, text, images, lists, etc.
					</Offcanvas.Body>
				</Offcanvas>





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
				/>



				<StyledProductListings className='row'>

					{products.length ? products.map(p => {
						return <div key={p.id} className='col col-6 col-md-4 col-lg-3 mx-auto'>
							<ProductCard
								product={p}
							/>
						</div>
					}) : <p>There are zero results for your search</p>}


				</StyledProductListings>




			</StyledProductListingsLayout>




		</React.Fragment>


	)
}

export default ProductListings