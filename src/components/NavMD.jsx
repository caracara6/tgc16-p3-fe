import React, { useContext } from 'react'

import ProductContext from '../contexts/products/ProductContext';

import { StyledNavMD, StyledNavList } from '../components/styles/NavMD.styled'



import { NavLink, Link } from 'react-router-dom'

function NavHeader() {

	let productContext = useContext(ProductContext);

	return (
		<React.Fragment>

			<StyledNavMD className='nav d-none d-md-block'>
				<StyledNavList>


					<NavLink to='/'>
						<li className="nav__listitem">Home</li>
					</NavLink>
					<NavLink to='/about-us'>
						<li className="nav__listitem">About Us</li>
					</NavLink>
					<li className="nav__listitem">Complete Collections
						<div className="nav__listitemdrop">

							<NavLink to='/categories/all' onClick={() => { productContext.setSearchInput("") }}><ul>All Wines</ul></NavLink>

							{
								productContext.allCategories().length ? productContext.allCategories().map(c =>
									<ul key={c.id}><Link to={"/categories/" + c.id} onClick={() => { productContext.setSearchInput(""); productContext.setLoaded(!productContext.getLoaded()) }}>{c.name}</Link></ul>) : null
							}

						</div>
					</li>

				</StyledNavList>



			</StyledNavMD>






		</React.Fragment>

	)
}

export default NavHeader