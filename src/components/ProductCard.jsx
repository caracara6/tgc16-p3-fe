import React from 'react'

import styled from 'styled-components'

function ProductCard({product}) {
  return (
      <StyledProductCard>
          <div className='card-img-wrapper'>
          <img src={product.image_url} alt ={product.name}/>
          </div>
          <div className='card-body'>
            {product.vintage} {product.name}
            <br/>
            ${(product.price/100).toFixed(2)}
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