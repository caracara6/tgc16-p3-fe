import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import CartContext from '../contexts/cart/CartContext'

import styled from 'styled-components'

function ProductCard({ product }) {
    const cartContext = useContext(CartContext)
    const navigate = useNavigate();
    // let context = useContext(ProductContext);

    // let { categoryFilter } = useParams();
    // console.log('cardParams => ', categoryFilter)

    const handleAddToCart = async(product) => {
        await cartContext.addToCart(product, 1)
    }

    return (


        <StyledProductCard >
                <div className='card-img-wrapper'>
                    <img src={product.image_url} alt={product.name} />
                    <button className='btn' 
                            data-bs-toggle="modal" 
                            data-bs-target="#cartModal" 
                            onClick={() => {handleAddToCart(product)}}
                            >
                                ADD TO CART + 
                    </button>
                </div>


            <div className='card-body'>
                <Link to={`/categories/${product.category.id}/${product.id}`}>
                    {product.vintage} {product.name.toUpperCase()}
                </Link>
                <br />
                <span>${(product.price / 100).toFixed(2)}</span>
            </div>

        </StyledProductCard>


    )
}

const StyledProductCard = styled.div`

@keyframes fadeIn {
	from {
		opacity: 0;
        visibility: hidden;
		transform: rotateX(-10deg);
	}

	to{
		opacity: 1;
        visibility: visible;
		transform: rotateX(0);
	}
}

// min-height: 40vh;
height: 100%;
margin-bottom: 1rem;
overflow-y: auto;

.card-img-wrapper{
    height: 60%;
    position: relative;
}

.card-img-wrapper button{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-radius: 0px;
    color: white;
    background-color: ${({theme})=>theme.colours.dark};
    opacity: 0;
}

.card-img-wrapper:hover button{
    animation: fadeIn 1s forwards; 
}

img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(234,232,255,1) 55%, rgba(214,214,214,1) 100%);
}

.card-body{
    text-align: center;
    span{
        font-size: 0.8rem
    }
}

@media (min-width: ${({ theme }) => theme.md}){
    .card-body span {
        font-size: 1rem
    }
}

`





export default ProductCard