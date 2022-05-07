import React from 'react'
import { Link, useParams } from 'react-router-dom'

import ProductContext from '../contexts/products/ProductContext'

import styled from 'styled-components'

function ProductCard({ product }) {

    // let context = useContext(ProductContext);

    // let { categoryFilter } = useParams();
    // console.log('cardParams => ', categoryFilter)



    return (


        <StyledProductCard >
            <Link to={`/categories/${product.category.id}/${product.id}`}>
                <div className='card-img-wrapper'>
                    <img src={product.image_url} alt={product.name} />
                </div>
            </Link>

            <div className='card-body'>
                <Link to={`/categories/${product.category.id}/${product.id}`}>
                    {product.vintage} {product.name}
                </Link>
                <br />
                ${(product.price / 100).toFixed(2)}
            </div>

        </StyledProductCard>


    )
}

const StyledProductCard = styled.div`
min-height: 40vh;
border: 1px solid red;
margin-bottom: 1rem;
overflow-y: auto;

.card-img-wrapper{
    min-height: 70%;
    border: 1px solid blue;

}

img {
    object-fit: cover;
    max-width: 100%;
    height: 100%;
    border: 1px solid black
}

.card-body{
    text-align: center
}

`





export default ProductCard