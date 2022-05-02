import React from 'react'

import { StyledNavMD, StyledNavList } from '../components/styles/NavMD.styled'



import { NavLink } from 'react-router-dom'

function NavHeader() {
	return (
		<React.Fragment>

			<StyledNavMD className='nav border border-primary' >
				<StyledNavList>


				<NavLink to='/'>
					<li className="nav__listitem">Home</li>
					</NavLink>
					<li className="nav__listitem">About Us</li>
					<NavLink to='/collections/all'><li className="nav__listitem">Complete Collections
						<div className="nav__listitemdrop">

						<NavLink to='/collections/all'><ul>All Wines</ul></NavLink>
							<ul>Reds</ul>
							<ul>Whites</ul>
							<ul>Rose</ul>
							<ul>Champagne</ul>
							<ul>Sparkling</ul>
						</div>
					</li></NavLink>

				</StyledNavList>



			</StyledNavMD>




			{/* <nav className="nav">

				<NavLink to='/'><span className="nav-link">Home</span></NavLink>
				<NavLink to='/collections/all'><span className="nav-link">Complete Collections</span></NavLink>


			</nav> */}

		</React.Fragment>

	)
}

export default NavHeader