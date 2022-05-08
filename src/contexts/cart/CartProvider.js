import React, { useState, useEffect, useContext } from 'react'

import CartContext from './CartContext';
import UserContext from '../users/UserContext';

import {
    getCart,
    addToCart,
    updateQuantityCart,
    deleteFromCart
} from '../../services/cart'

import {
    getHttpHeaders
} from '../../services/users'



function CartProvider(props) {

    const userContext = useContext(UserContext)

    let [cartItems, setCartItems] = useState([])

    const context = {
        getCartItems: () => {
            return cartItems
        },

        addToCart: async(productId, quantity) => {
            try{
                let responseAddToCart = await addToCart(productId, quantity)
                return responseAddToCart
            } catch (e) {
                console.log(e)
            }
        },

        updateQuantityCart: async(productId, quantity) => {
            try {
                let responseUpdateQuantityCart = await updateQuantityCart(productId, quantity)

                setCartItems(await getCart())
                
                return responseUpdateQuantityCart

            } catch (e) {
                console.log(e)
            }
        },

        deleteFromCart: async(productId) => {
            try {
                let responseDeleteFromCart = await deleteFromCart(productId)
                return responseDeleteFromCart
            } catch (e) {
                console.log(e)
            }
        }
    }

    useEffect(() => {

        const fetchUserCart = async() => {
            let cartItems = await getCart()
            setCartItems(cartItems)
        }

        if(userContext.getLoginStatus()){
            fetchUserCart();
        }
        //else, get from local storage??
        //listen for change in cart items state, then set into local storage??

    }, [userContext.getLoginStatus()])

  return (
    <CartContext.Provider value={context}>
        {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider