import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import ProductContext from '../contexts/products/ProductContext'

import styled from 'styled-components'

import { RiSearch2Line } from 'react-icons/ri'

function SearchModal() {
	const productContext = useContext(ProductContext)

	const navigate = useNavigate()

	let [searchInput, setSearchInput] = useState("")



	return (
		<StyledSearchModal className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content ">
					<div className="modal-header ">
						<h5 className="modal-title" id="exampleModalLabel">Search</h5>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						<div className="input-group border border-dark">
							<input type="search" name='searchInput' onChange = {(e) => {setSearchInput(e.target.value)}} className="form-control border border-none" placeholder="Search our store..." aria-label="Search" aria-describedby="search-addon" />
							<button type="button" className="btn" onClick={()=> {productContext.setSearchInput(searchInput); navigate("/categories/all")}} data-bs-dismiss="modal" ><RiSearch2Line/></button>
						</div>
					</div>
				</div>
			</div>
		</StyledSearchModal>
	)
}

const StyledSearchModal = styled.div`

.modal{
	z-index: 10;
}

.modal-header{
	display: block;
	position: relative;
	border-bottom: none;
	background-color: ${({ theme }) => theme.colours.light};

	.btn-close{
		position: absolute;
		right: 20px;
		top: 25px;

	}
}

.modal-content{
	border-radius: 0px!important;
	
}

.form-control {
	border: none!important;
}

.modal-header h5{
	text-align: center!important;
}

.modal-body{
	padding: 2rem;
}

.btn-close{
	margin: none;
}

`

export default SearchModal