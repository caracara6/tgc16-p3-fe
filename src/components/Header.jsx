import React from 'react'

import { NavLink } from 'react-router-dom'

// import NavOffCanvas from './NavOffCanvas'
// import SearchModal from './SearchModal'



function Header() {
	return (
		<React.Fragment>


			<div className='d-flex justify-content-between border border-danger'>

				<button className="btn btn-primary d-md-none "
					type="button" data-bs-toggle="offcanvas"
					data-bs-target="#offcanvasExample"
					aria-controls="offcanvasExample"
				>
					NavSM
				</button>


				<NavLink to="/" className='mx-auto'>
					<h1 className=''>
						Project 3
					</h1>
				</NavLink>


				<div className='border border-danger'>
					<NavLink to="/account/login" className='d-none d-md-inline'>
					<button type="button" className="btn btn-primary">
					Login
					</button>
					</NavLink>
					<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#cartModal">
						Cart
					</button>
					<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
						Search
					</button>

				</div>


			</div>


			{/* <NavOffCanvas />
			<SearchModal /> */}
		</React.Fragment>

	)
}

export default Header