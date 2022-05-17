import React from 'react'

import { NavLink } from 'react-router-dom'

import styled from 'styled-components'

function NavOffCanvas() {
	return (
			<StyledNavOffCanvas className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
				<div className="offcanvas-header">
					<h5 className="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
					<button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
				</div>
				<div className="offcanvas-body">
					<div>
						Hello world
					</div>
					<NavLink to="/account/login" data-bs-dismiss="">Login</NavLink>
				</div>
			</StyledNavOffCanvas>


	)
}

const StyledNavOffCanvas = styled.div`
width: 70vw

`

export default NavOffCanvas