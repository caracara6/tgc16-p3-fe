import React, { useContext, useState, useEffect } from 'react'
import ProductContext from '../contexts/products/ProductContext';

import { StyledProductListingsLayout, StyledSideFilter, StyledProductListings } from '../components/styles/ProductListings.styled'

import SideFilter from '../components/SideFilter'
import ProductCard from '../components/ProductCard';

function ProductListings() {
	let context = useContext(ProductContext);
	const [products, setProducts] = useState([])
	console.log('=============')
	console.log(products)

	useEffect(() => {
		setProducts(context.allProducts())
	}, [context])

	return (
		<React.Fragment>
			<StyledProductListingsLayout>

				<StyledSideFilter>
					<SideFilter />

				</StyledSideFilter>


				<StyledProductListings className='row'>
					
					{products.map(p => { return <div className='col col-6 col-md-4 col-lg-3 mx-auto'>
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