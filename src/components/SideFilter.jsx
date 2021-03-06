import React from 'react'

import { StyledSideFilter } from '../components/styles/ProductListings.styled'

function SideFilter(props) {

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

		if (props.vintageSelected.includes(e.target.value)) {
			let indexToRemove = props.vintageSelected.findIndex(
				value => value === e.target.value
			)
			props.setVintageSelected([...props.vintageSelected.slice(0, indexToRemove), ...props.vintageSelected.slice(indexToRemove + 1)])
		} else {
			props.setVintageSelected([...props.vintageSelected, e.target.value])
		}
	}

	const updateProducerSelected = (e) => {

		if (props.producerSelected.includes(e.target.value)) {
			let indexToRemove = props.producerSelected.findIndex(
				value => value === e.target.value
			)
			props.setProducerSelected([...props.producerSelected.slice(0, indexToRemove), ...props.producerSelected.slice(indexToRemove + 1)])
		} else {
			props.setProducerSelected([...props.producerSelected, e.target.value])
		}
	}

	const handlePriceChange = (p) => {
		if(props.priceRangeSelected.id === p.id){
			props.setPriceRangeSelected({})
		} else {
			props.setPriceRangeSelected(p)
		}
	}

	return (

		<StyledSideFilter >
			{/* <h6>Regions</h6> */}
			{props.uniqueRegions.length ?
				(<React.Fragment>
					<h6>REGION</h6>
					{
						props.uniqueRegions.map((r, i) => {
							return <React.Fragment key={i}>
								<div className='box' style={{
                                                backgroundColor: props.regionSelected.includes(r) ? 'black' : 'white',
                                                color: props.regionSelected.includes(r) ? 'white' : 'black',
                                        }}>
									<label>
										<input type='checkbox'
											value={r}
											onChange={updateRegionSelected}
											checked = {props.regionSelected.includes(r)}
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
					<h6>COUNTRY</h6>
					{
						props.uniqueCountries.map((c, i) => {
							return <React.Fragment key={i}>
								<div className='box' style={{
                                                backgroundColor: props.countrySelected.includes(c) ? 'black' : 'white',
                                                color: props.countrySelected.includes(c) ? 'white' : 'black',
                                    }}>
									<label>
										<input type='checkbox'
											value={c}
											onChange={updateCountrySelected}
											checked={props.countrySelected.includes(c)}
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
					<h6>VINTAGE</h6>
					{
						props.uniqueVintages.map((v, i) => {
							return <React.Fragment key={i}>
								<div className='box' style={{
                                                backgroundColor: props.vintageSelected.includes(v.toString()) ? 'black' : 'white',
                                                color: props.vintageSelected.includes(v.toString()) ? 'white' : 'black',
                                    }}>
									<label>
										<input type='checkbox'
											value={v}
											onChange={updateVintageSelected}
											checked = {props.vintageSelected.includes(v.toString())}
										/>
										<span>{v}</span>
									</label>
								</div>
							</React.Fragment>
						})
					}
				</React.Fragment>)
				: null}

			<h6>PRICE</h6>
			{
				props.priceRange.map(p => {
					return <React.Fragment key={p.id}>
						<div className='box' style={{
                                    backgroundColor: props.priceRangeSelected.id === p.id ? 'black' : 'white',
                                    color: props.priceRangeSelected.id === p.id ? 'white' : 'black',
                                    }}>
							<label>
								<input type='checkbox'
								value={p.id}
								onChange={() => {handlePriceChange(p)}}
								name='priceRange'
								checked = {props.priceRangeSelected.id === p.id}
								/>
								<span>{p.display}</span>
							</label>
						</div>
					</React.Fragment>
				})
			}

			{props.uniqueProducers.length ?
				(<React.Fragment>
					<h6>WINERY</h6>
					{
						props.uniqueProducers.map((p, i) => {
							return <React.Fragment key={i}>
								<div className='box' style={{
                                                backgroundColor: props.producerSelected.includes(p) ? 'black' : 'white',
                                                color: props.producerSelected.includes(p) ? 'white' : 'black',
                                    }}>
									<label>
										<input type='checkbox'
											value={p}
											onChange={updateProducerSelected}
											checked = {props.producerSelected.includes(p)}
										/>
										<span>{p}</span>
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