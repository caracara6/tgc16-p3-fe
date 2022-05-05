import React, { useContext, useState, useEffect, } from 'react'
import { useParams } from 'react-router-dom'
import ProductContext from '../contexts/products/ProductContext';

import { StyledProductListingsLayout, StyledSideFilter, StyledProductListings } from '../components/styles/ProductListings.styled'

import SideFilter from '../components/SideFilter'
import ProductCard from '../components/ProductCard';

function ProductListings() {

	let context = useContext(ProductContext);
	// const [products, setProducts] = useState([])
	// console.log('=============')
	// console.log(context.allProducts())

	useEffect(() => {
		// setProducts(context.allProducts())
	}, [context])

	let { categoryFilter } = useParams()
	console.log(categoryFilter)

	if(categoryFilter == "all"){
		context.setCategoryFilter("")
	} else {
		context.setCategoryFilter(categoryFilter)
	}

	

	return (
		<React.Fragment>
			<StyledProductListingsLayout>

				<StyledSideFilter>
					<SideFilter />

				</StyledSideFilter>


				<StyledProductListings className='row'>
					
					{context.allProducts().map(p => { return <div key={p.id} className='col col-6 col-md-4 col-lg-3 mx-auto'>
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