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

        addToCart: async (productId, quantity) => {

            if (localStorage.getItem('userInfo')) {
                //if logged in
                try {
                    let responseAddToCart = await addToCart(productId, quantity)

                    setCartItems(await getCart())

                    return responseAddToCart
                } catch (e) {
                    console.log(e)
                }
            } else {
                //if guest 

                let indexToUpdate = cartItems.findIndex(c => c.product_id === productId)

                if (indexToUpdate === -1) {
                    setCartItems(
                        ...cartItems,
                        {
                            product_id: productId,
                            quantity: quantity
                        }
                    )

                } else {
                    let productToUpdate = cartItems.slice(indexToUpdate, indexToUpdate + 1)[0]
                    productToUpdate.quantity = quantity
                    setCartItems(
                        ...cartItems.slice(0, indexToUpdate),
                        productToUpdate,
                        ...cartItems.slice(indexToUpdate + 1),
                    )
                }
            }

        },

        updateQuantityCart: async (productId, quantity) => {
            if (localStorage.getItem('userInfo')) {
                //if logged in
                try {
                    let responseUpdateQuantityCart = await updateQuantityCart(productId, quantity)

                    setCartItems(await getCart())

                    return responseUpdateQuantityCart

                } catch (e) {
                    console.log(e)
                }
            } else {
                //if guest
                let indexToUpdate = cartItems.findIndex(c => c.product_id === productId)

                if (quantity === 0) {
                    setCartItems(
                        ...cartItems.slice[0, indexToUpdate],
                        ...cartItems.slice(indexToUpdate + 1)
                    )
                } else {
                    let productToUpdate = cartItems.slice(indexToUpdate, indexToUpdate + 1)[0]
                    productToUpdate.quantity = quantity
                    setCartItems(
                        ...cartItems.slice(0, indexToUpdate),
                        productToUpdate,
                        ...cartItems.slice(indexToUpdate + 1),
                    )
                }
            }

        },

        deleteFromCart: async (productId) => {
            if (localStorage.getItem('userInfo')) {
                //if logged in
                try {
                    let responseDeleteFromCart = await deleteFromCart(productId)

                    setCartItems(await getCart())

                    return responseDeleteFromCart
                } catch (e) {
                    console.log(e)
                }
            } else {
                //if guest
                let indexToRemove = cartItems.findIndex(c => c.product_id === productId)
                setCartItems(
                    ...cartItems.slice[0, indexToRemove],
                    ...cartItems.slice(indexToRemove + 1)
                )
            }

        }
    }

    useEffect(() => {

        const fetchUserCart = async () => {
            let cartItems = await getCart()
            
            setCartItems(cartItems)
        }

        if (userContext.getLoginStatus()) {
            
            fetchUserCart();
        }
        //else, get from local storage??
        //listen for change in cart items state, then set into local storage??

    }, [userContext.getLoginStatus()])

    useEffect(() => {

        localStorage.removeItem('cartItems')
        localStorage.setItem('cartItems', JSON.stringify(cartItems))

    }, [cartItems])

    return (
        <CartContext.Provider value={context}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider