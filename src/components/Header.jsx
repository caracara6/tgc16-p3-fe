import React, { useContext } from 'react'

import { NavLink, Link } from 'react-router-dom'

import { Dropdown } from 'react-bootstrap'

import UserContext from '../contexts/users/UserContext'

import NavOffCanvas from './NavOffCanvas'
import SearchModal from './SearchModal'



function Header() {
	let context = useContext(UserContext)
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


				<div className='border border-danger d-flex'>
					{context.getLoginStatus() ? <Dropdown>
						<Dropdown.Toggle id="dropdown-basic" className='btn'>
							Account
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item><Link to="/account/profile">Action</Link></Dropdown.Item>
							<Dropdown.Item as={Link} to="/" onClick={() => {context.userLogout()}} >Logout</Dropdown.Item>
							
						</Dropdown.Menu>
					</Dropdown> : <NavLink to="/account/login" className='d-none d-md-inline'>
						<button type="button" className="btn btn-primary">
							Login
						</button>
					</NavLink>
					}


					<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#cartModal">
						Cart
					</button>
					<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
						Search
					</button>

				</div>


			</div>


			<NavOffCanvas />
			<SearchModal />
		</React.Fragment>

	)
}

export default Header