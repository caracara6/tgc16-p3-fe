import React, { useContext } from 'react'
import ProductContext from '../contexts/products/ProductContext'
import UserContext from '../contexts/users/UserContext'

import { Link } from 'react-router-dom'

import styled from 'styled-components'

import { Row, Col, Accordion } from 'react-bootstrap'

function NavOffCanvas() {

	let productContext = useContext(ProductContext);
	let userContext = useContext(UserContext);

	return (
		<StyledNavOffCanvas className="offcanvas offcanvas-start nav-offcanvas" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
			<div className="offcanvas-header">
				<button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
			</div>
			<div className="offcanvas-body">
				<Row>
					<Col xs={12}>
						<button className='btn' data-bs-dismiss="offcanvas">
							<Link to="/" >Home</Link>
						</button>
					</Col>
					<Col xs={12}>

						<Accordion>
							<Accordion.Item eventKey="0">
								<Accordion.Header>COMPLETE COLLECTIONS</Accordion.Header>
								<Accordion.Body>
									<button className='btn' data-bs-dismiss="offcanvas">
										<Link to={"/categories/all"} onClick={() => { productContext.setSearchInput(""); productContext.setLoaded(!productContext.getLoaded()); }}>ALL WINE</Link>
									</button>
									<button className='btn' data-bs-dismiss="offcanvas">
										<Link to={"/categories/1"} onClick={() => { productContext.setSearchInput(""); productContext.setLoaded(!productContext.getLoaded()); }}>RED WINE</Link>
									</button>
									<button className='btn' data-bs-dismiss="offcanvas">
										<Link to={"/categories/2"} onClick={() => { productContext.setSearchInput(""); productContext.setLoaded(!productContext.getLoaded()); }}>WHITE WINE</Link>
									</button>
									<button className='btn' data-bs-dismiss="offcanvas">
										<Link to={"/categories/3"} onClick={() => { productContext.setSearchInput(""); productContext.setLoaded(!productContext.getLoaded()); }}>ROSE WINE</Link>
									</button>
									<button className='btn' data-bs-dismiss="offcanvas">
										<Link to={"/categories/4"} onClick={() => { productContext.setSearchInput(""); productContext.setLoaded(!productContext.getLoaded()); }}>CHAMPAGNE</Link>
									</button>
									<button className='btn' data-bs-dismiss="offcanvas">
										<Link to={"/categories/5"} onClick={() => { productContext.setSearchInput(""); productContext.setLoaded(!productContext.getLoaded()); }}>SPARKLING WINE</Link>
									</button>
								</Accordion.Body>
							</Accordion.Item>
						</Accordion>

					</Col>
				</Row>

				<button className='btn' data-bs-dismiss="offcanvas">
					{userContext.getLoginStatus() ? <Link to="/" onClick={() => {userContext.userLogout()}} >LOGOUT</Link> : <Link to="/account/login" >LOGIN</Link>}
				</button>

			</div>
		</StyledNavOffCanvas>


	)
}

const StyledNavOffCanvas = styled.div`
width: 70vw

.offcanvas-body .accordion-body a{
	display: block
}

`

export default NavOffCanvas