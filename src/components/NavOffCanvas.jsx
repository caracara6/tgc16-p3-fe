import React from 'react'

import { NavLink } from 'react-router-dom'

function NavOffCanvas() {
	return (
		<React.Fragment >
			<div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
				<div className="offcanvas-header">
					<h5 className="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
					<button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
				</div>
				<div className="offcanvas-body">
					<div>
						Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
					</div>
					<NavLink to="/account/login" data-bs-dismiss="">Login</NavLink>
				</div>
			</div>

		</React.Fragment>

	)
}

export default NavOffCanvas