import React, { useState } from 'react'
import { Offcanvas } from 'react-bootstrap'
import styled from 'styled-components'

function FilterOffCanvas(props) {

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

    const handlePriceChange = (p) => {
        if (props.priceRangeSelected.id === p.id) {
            props.setPriceRangeSelected({})
        } else {
            props.setPriceRangeSelected(p)
        }
    }


    return (
        <StyledOffCanvasWrapper>
        <Offcanvas show={props.show} onHide={props.handleClose}>
            <Offcanvas.Header closeButton>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <StyledFilterOffCanvas >
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
                                                    checked={props.regionSelected.includes(r)}
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
                                                    checked={props.vintageSelected.includes(v.toString())}
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
                                            onChange={() => { handlePriceChange(p) }}
                                            name='priceRange'
                                            checked={props.priceRangeSelected.id === p.id}
                                        />
                                        <span>{p.display}</span>
                                    </label>
                                </div>
                            </React.Fragment>
                        })
                    }


                </StyledFilterOffCanvas>
            </Offcanvas.Body>
        </Offcanvas>
        </StyledOffCanvasWrapper>
    )
}

const StyledOffCanvasWrapper = styled.div`
.offcanvas-start{
    width: 70vw;
    color: red;
    
}

.offcanvas {
    background-color: ${({theme})=>theme.colours.light};
}
`

const StyledFilterOffCanvas = styled.aside`


div label input {
    margin-right: 100px;
}

h6{
    margin-top: 2rem;
}

.box{
    margin: 4px;
    border: 1px solid black;
    // overflow: hidden;
    // float: left;
    display: inline-block;
}

.box label {
    // float: left; 
    // line-height: 3.0em;
    // width: 8.0em; 
    // height: 2.0em;
    // padding : 10px 10px;
}

.box label span {
    text-align: center;
    padding: 8px 5px 8px 5px;
    display: block;
}

.box label input {
    position: absolute;
    display: none;
    color: #fff !important;
}


.box input:checked + span::after{
    position: relative;
    content: 'x';
    left: 10px;
    // bottom: 12px;
    color: lightgrey;
    padding-right: 10px
}

// .box input:checked + span {
//     color: black;
//     text-shadow: 0 0  6px rgba(0, 0, 0, 0.8);
// }
@media (min-width: ${({ theme }) => theme.md}) {
    .box label span{
        font-size: 1.2rem;
        padding: 8px;
    }
    h6 {
        font-size: 1.5rem;
    }
}
`


export default FilterOffCanvas