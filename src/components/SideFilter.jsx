import React from 'react'

import { StyledSideFilter } from '../components/styles/ProductListings.styled'


function SideFilter(props) {

	// let [counter, setCounter] = useState(1)

	// useEffect(() => {
	// 	setCounter(counter++)
	// }, [])

	// let handleClick = (e) => {
	// 	// setCounter(parseInt(e.target.value))
	// 	// setCounter(counter++)
	// 	props.setUniqueRegions(['1', '2', '3'])
	// }

	// useEffect(() => {
	// 	props.uniqueRegions.length ? props.uniqueRegions.map( r => {}) : null
	// }, [props.uniqueRegions])

	const updateRegionSelected = (e) => {
		if (props.regionSelected.includes(e.target.value)) {
			let indexToRemove = props.regionSelected.findIndex(
				value => value === e.target.value
			)
			props.setRegionSelected([...props.regionSelected.slice(0, indexToRemove), ...props.regionSelected.slice(indexToRemove + 1)])
		} else {
			props.setRegionSelected([...props.regionSelected, e.target.value])
		}
	}

	const updateCountrySelected = (e) => {
		if (props.countrySelected.includes(e.target.value)) {
			let indexToRemove = props.countrySelected.findIndex(
				value => value === e.target.value
			)
			props.setCountrySelected([...props.countrySelected.slice(0, indexToRemove), ...props.countrySelected.slice(indexToRemove + 1)])
		} else {
			props.setCountrySelected([...props.countrySelected, e.target.value])
		}
	}

	const updateVintageSelected = (e) => {

		console.log(typeof e.target.value)

		if (props.vintageSelected.includes(e.target.value)) {
			let indexToRemove = props.vintageSelected.findIndex(
				value => value === e.target.value
			)
			props.setVintageSelected([...props.vintageSelected.slice(0, indexToRemove), ...props.vintageSelected.slice(indexToRemove + 1)])
		} else {
			props.setVintageSelected([...props.vintageSelected, e.target.value])
		}
	}

	return (

		<StyledSideFilter>
			{/* <button value='3' onClick = { () => {}}>Click</button> */}
			<div>SideFilter</div>
			{/* <h6>Regions</h6> */}
			{props.uniqueRegions.length ?
				(<React.Fragment>
					<h6>Regions</h6>
					{
						props.uniqueRegions.map((r, i) => {
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
						})
					}
				</React.Fragment>)
				: null}

			{props.uniqueCountries.length ?
				(<React.Fragment>
					<h6>Countries</h6>
					{
						props.uniqueCountries.map((c, i) => {
							return <React.Fragment key={i}>
								<div className='box'>
									<label>
										<input type='checkbox'
											value={c}
											onChange={updateCountrySelected}
										/>
										<span>{c}</span>
									</label>
								</div>
							</React.Fragment>
						})
					}
				</React.Fragment>)
				: null}

			{props.uniqueVintages.length ?
				(<React.Fragment>
					<h6>Vintage</h6>
					{
						props.uniqueVintages.map((v, i) => {
							return <React.Fragment key={i}>
								<div className='box'>
									<label>
										<input type='checkbox'
											value={v}
											onChange={updateVintageSelected}
										/>
										<span>{v}</span>
									</label>
								</div>
							</React.Fragment>
						})
					}
				</React.Fragment>)
				: null}


		</StyledSideFilter>

	)
}

export default SideFilter