import React, { useState, useContext, useEffect, } from 'react'
import { useParams } from 'react-router-dom'
import ProductContext from '../contexts/products/ProductContext';

import { StyledProductListingsLayout, StyledProductListings } from '../components/styles/ProductListings.styled'

import SideFilter from '../components/SideFilter'
import ProductCard from '../components/ProductCard';



function ProductListings() {

	let context = useContext(ProductContext);

	let [products, setProducts] = useState([])
	let [regionFilters, setRegionFilters] = useState([])
	let [regionSelected, setRegionSelected] = useState([])


	useEffect(() => {
		//need to await async here??
		setProducts(context.allProducts())

	}, [context.allProducts()])

	useEffect(() => {
		// let regionFilters = products.length ? products.map( p => {return p.region.name}) : null
		let regionFilters = context.allProducts().length ? [...new Set(context.allProducts().map( p => p.region.name))] : []
		setRegionFilters(regionFilters)

	}, [context.allProducts()])

	useEffect(() => {
		let selectedProducts = [];

		console.log(regionSelected)

		// regionSelected.map( r => {  

		for (let r of regionSelected) {
			console.log('1st loop', r)
			// products.map ( p => p.region.name === r ? selectedProducts.push(p) : null)

			for (let p of products) {
				if (p.region.name === r) {
					console.log('2nd loop', r) 
					selectedProducts.push(p)
				}
			}
		}
			


		// })

		// selectedProducts.length ? setProducts(selectedProducts) : null

		console.log(selectedProducts)

		if(selectedProducts.length > 0) {
			setProducts(selectedProducts)
		} else {
			setProducts(context.allProducts())
		}
	}, [regionSelected])

	let { categoryFilter } = useParams()
	// console.log(categoryFilter)

	if(categoryFilter === "all"){
		context.setCategoryFilter("")
	} else {
		context.setCategoryFilter(categoryFilter)
	}

	

	return (
		<React.Fragment>
			<StyledProductListingsLayout>

				
					<SideFilter regionFilters = {regionFilters.length ? regionFilters : []} 
								setRegionFilters={setRegionFilters}
								regionSelected = {regionSelected}
								setRegionSelected={setRegionSelected}
								/>



				<StyledProductListings className='row'>
					
					{products.map(p => { return <div key={p.id} className='col col-6 col-md-4 col-lg-3 mx-auto'>
						<ProductCard
							product={p}
						/>
						</div>
					})}

				
				</StyledProductListings>




			</StyledProductListingsLayout>




		</React.Fragment>


	)
}

export default ProductListings