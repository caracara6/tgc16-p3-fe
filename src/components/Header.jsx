import React, { useContext } from 'react'

import { NavLink, Link } from 'react-router-dom'

import { Dropdown } from 'react-bootstrap'

import UserContext from '../contexts/users/UserContext'
import CartContext from '../contexts/cart/CartContext'

import NavOffCanvas from './NavOffCanvas'
import SearchModal from './SearchModal'


function Header() {
	const userContext = useContext(UserContext)
	const cartContext = useContext(CartContext)

	const cartItemCounter = () => {
		let numCartItems = cartContext.getCartItems().length
		return numCartItems > 0 ? `${numCartItems}` : ""
	}

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
					{userContext.getLoginStatus() ? <Dropdown>
						<Dropdown.Toggle id="dropdown-basic" className='btn'>
							Account
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item><Link to="/account/profile">Action</Link></Dropdown.Item>
							<Dropdown.Item as={Link} to="/" onClick={() => {userContext.userLogout()}} >Logout</Dropdown.Item>
							
						</Dropdown.Menu>
					</Dropdown> : <NavLink to="/account/login" className='d-none d-md-inline'>
						<button type="button" className="btn btn-primary">
							Login
						</button>
					</NavLink>
					}


					<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#cartModal">
						Cart ({cartItemCounter()})
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