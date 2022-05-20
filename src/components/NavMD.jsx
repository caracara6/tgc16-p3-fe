import React, { useContext } from 'react'

import ProductContext from '../contexts/products/ProductContext';

import { StyledNavMD, StyledNavList } from '../components/styles/NavMD.styled'



import { NavLink, Link } from 'react-router-dom'

function NavHeader() {

	const productContext = useContext(ProductContext);
	function printCat(){

		console.log('==========', productContext.allCategories())
	}
	return (
		<React.Fragment>

			<StyledNavMD className='nav d-none d-md-block'>
				<StyledNavList>


					<NavLink to='/'>
						<li className="nav__listitem">HOME</li>
					</NavLink>
					<NavLink to='/about-us'>
						<li className="nav__listitem">ABOUT US</li>
					</NavLink>
					<li className="nav__listitem">COMPLETE COLLECTIONS
						<div className="nav__listitemdrop">

							<Link to='/categories/all' onClick={() => { productContext.setSearchInput("") }}><ul>ALL WINES</ul></Link>
							{/* <div>{JSON.stringify(productContext.allCategories())}</div> */}
							{printCat()}
							{
								productContext.allCategories().length ? productContext.allCategories().map(c =>
									<ul key={c.id}><Link to={"/categories/" + c.id} onClick={() => { productContext.setSearchInput(""); productContext.setLoaded(!productContext.getLoaded()); console.log('hello world') }}>{c.name.toUpperCase()}</Link></ul>) : null
							}

						</div>
					</li>

				</StyledNavList>



			</StyledNavMD>






		</React.Fragment>

	)
}

export default NavHeader