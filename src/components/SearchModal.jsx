import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import ProductContext from '../contexts/products/ProductContext'

function SearchModal() {
	const productContext = useContext(ProductContext)

	const navigate = useNavigate()

	let [searchInput, setSearchInput] = useState("")



	return (
		<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="exampleModalLabel">Search</h5>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						<div className="input-group">
							<input type="search" name='searchInput' onChange = {(e) => {setSearchInput(e.target.value)}} className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
							<button type="button" className="btn btn-outline-primary" onClick={()=> {productContext.setSearchInput(searchInput); navigate("/categories/all")}} data-bs-dismiss="modal" >search</button>
						</div>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
						<button type="button" className="btn btn-primary">Save changes</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SearchModal