import React, { useContext } from 'react'

import ProductContext from '../contexts/products/ProductContext';

import { StyledNavMD, StyledNavList } from '../components/styles/NavMD.styled'



import { NavLink, Link } from 'react-router-dom'

function NavHeader() {

	let context = useContext(ProductContext);

	return (
		<React.Fragment>

			<StyledNavMD className='nav border border-primary' >
				<StyledNavList>


				<NavLink to='/'>
					<li className="nav__listitem">Home</li>
					</NavLink>
					<li className="nav__listitem">About Us</li>
					<li className="nav__listitem">Complete Collections
						<div className="nav__listitemdrop">

						<NavLink to='/categories/all'><ul>All Wines</ul></NavLink>

							{context.allCategories().map( c => 
							<ul key={c.id}><Link to={"/categories/" + c.id}>{c.name}</Link></ul>)}
							{/* <ul>Reds</ul>
							<ul>Whites</ul>
							<ul>Rose</ul>
							<ul>Champagne</ul>
							<ul>Sparkling</ul> */}
						</div>
					</li>

				</StyledNavList>



			</StyledNavMD>




			

		</React.Fragment>

	)
}

export default NavHeader