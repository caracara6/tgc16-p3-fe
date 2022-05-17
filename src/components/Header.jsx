import React, { useContext } from 'react'

import styled from 'styled-components'

import { RiSearch2Line } from 'react-icons/ri'
import { CgShoppingBag } from 'react-icons/cg'
import { AiOutlineMenu } from 'react-icons/ai'


import { NavLink, Link } from 'react-router-dom'

import { Dropdown } from 'react-bootstrap'

import UserContext from '../contexts/users/UserContext'
import CartContext from '../contexts/cart/CartContext'

import NavOffCanvas from './NavOffCanvas'
// import SearchModal from './SearchModal'


function Header() {
	const userContext = useContext(UserContext)
	const cartContext = useContext(CartContext)

	const cartItemCounter = () => {
		let numCartItems = cartContext.getCartItems().length
		return numCartItems > 0 ? `(${numCartItems})` : ""
	}

	return (
		<StyledHeaderWrapper>
			
			<StyledHeader>
			<div className='d-flex justify-content-between h-100'>

				<button className="btn d-md-none "
					type="button" data-bs-toggle="offcanvas"
					data-bs-target="#offcanvasExample"
					aria-controls="offcanvasExample"
				>
					<AiOutlineMenu/>
				</button>


				<NavLink to="/" className='mx-auto'>
					<img src={require('../assets/images/tgc16-p3-logo.jpg')}/>
				</NavLink>


				<div className='d-flex align-items-center' id='user-options-wrapper'>
					{userContext.getLoginStatus() ? <Dropdown>
						<Dropdown.Toggle id="dropdown-basic" className='btn me-2'>
							ACCOUNT
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item><Link to="/account/profile">Action</Link></Dropdown.Item>
							<Dropdown.Item as={Link} to="/" onClick={() => {userContext.userLogout()}}>LOGOUT</Dropdown.Item>
							
						</Dropdown.Menu>
					</Dropdown> : <NavLink to="/account/login" className='d-none d-md-inline'>
						<button type="button" className="btn me-2">
							LOGIN
						</button>
					</NavLink>
					}


					<button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#cartModal">
						<CgShoppingBag className='d-md-none'/> <span className='d-none d-md-inline-block'>CART</span> {cartItemCounter()}
					</button>
					<button type="button" className="btn " data-bs-toggle="modal" data-bs-target="#exampleModal">
						<RiSearch2Line/>
					</button>

				</div>


			</div>


			<NavOffCanvas />
			{/* <SearchModal /> */}
			</StyledHeader>
		</StyledHeaderWrapper>

	)
}

const StyledHeaderWrapper = styled.header`
position: fixed;
top: 0;
left: 0;
width: 100vw;
height: 10vh;
background-color: white;
z-index: 5;

@media (min-width: ${({ theme }) => theme.md}) {
	height: 15vh;
}


`

const StyledHeader = styled.div`
position: relative;
height: 10vh;

.btn {
	white-space: nowrap;
}

img{
	height: 100%;
	// object-fit: cover;
}

#user-options-wrapper {
	position: absolute;
	right: 0;
}

& > div > button:first-of-type{
	position:absolute;
	left: 0;
}

@media (min-width: ${({ theme }) => theme.md}) {
	height: 15vh;
	#user-options-wrapper {
		margin-right: 1rem
	}
}






`

export default Header