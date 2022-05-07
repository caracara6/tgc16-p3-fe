import React from 'react'

import { StyledSideFilter } from '../components/styles/ProductListings.styled'


import { useEffect, useState } from 'react'

function SideFilter(props) {

	// let [counter, setCounter] = useState(1)

	// useEffect(() => {
	// 	setCounter(counter++)
	// }, [])

	// let handleClick = (e) => {
	// 	// setCounter(parseInt(e.target.value))
	// 	// setCounter(counter++)
	// 	props.setRegionFilters(['1', '2', '3'])
	// }

	// useEffect(() => {
	// 	props.regionFilters.length ? props.regionFilters.map( r => {}) : null
	// }, [props.regionFilters])

	const updateRegionSelected = (e) => {
		if(props.regionSelected.includes(e.target.value)){
			let indexToRemove = props.regionSelected.findIndex(
				value => value === e.target.value
			) 
			props.setRegionSelected([...props.regionSelected.slice(0, indexToRemove), ...props.regionSelected.slice(indexToRemove + 1)])
		} else {
			props.setRegionSelected([...props.regionSelected, e.target.value])
		}
	}

	return (

		<StyledSideFilter>
			{/* <button value='3' onClick = { () => {}}>Click</button> */}
			<div>SideFilter</div>
			<h6>Regions</h6>
			{props.regionFilters.length ? props.regionFilters.map((r, i) => {
				return <React.Fragment key={i}>
					<div className='box'>
						<label>
							<input type='checkbox' 
							value={r}
							onChange={updateRegionSelected}
							/>
							<span>{r}</span>
						</label>
					</div>
				</React.Fragment>
			}) : null}


		</StyledSideFilter>

	)
}

export default SideFilter