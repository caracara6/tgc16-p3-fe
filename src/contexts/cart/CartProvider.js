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

        addToCart: async (product, quantity) => {

            if (localStorage.getItem('userInfo')) {
                //if logged in
                try {
                    let responseAddToCart = await addToCart(product.id, quantity)

                    setCartItems(await getCart())

                    return responseAddToCart
                } catch (e) {
                    console.log(e)
                }
            } else {
                //if guest 

                let indexToUpdate = cartItems.findIndex(c => c.product.id === product.id)

                if (indexToUpdate === -1) {
                    setCartItems([
                        ...cartItems,
                        {
                            product: product,
                            quantity: quantity
                        }
                    ])

                } else {
                    let cartItemToUpdate = cartItems.slice(indexToUpdate, indexToUpdate + 1)[0]
                    cartItemToUpdate.quantity += quantity
                    setCartItems([
                        ...cartItems.slice(0, indexToUpdate),
                        cartItemToUpdate,
                        ...cartItems.slice(indexToUpdate + 1),
                    ])
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
                let indexToUpdate = cartItems.findIndex(c => c.product.id === productId)

                if (quantity === 0) {
                    setCartItems(
                        ...cartItems.slice[0, indexToUpdate],
                        ...cartItems.slice(indexToUpdate + 1)
                    )
                } else {
                    let cartItemToUpdate = cartItems.slice(indexToUpdate, indexToUpdate + 1)[0]

                    cartItemToUpdate.quantity = quantity
                    console.log(cartItemToUpdate)
                    setCartItems(
                        ...cartItems.slice(0, indexToUpdate),
                        cartItemToUpdate,
                        ...cartItems.slice(indexToUpdate + 1),
                    )

                    console.log(cartItems)
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
                let indexToRemove = cartItems.findIndex(c => c.product.id === productId)
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
        else {

            setCartItems([])
        }

    }, [userContext.getLoginStatus()])


    useEffect(() => {
        if(userContext.getLoginStatus()){
            localStorage.removeItem(`cartOfUser${userContext.getUserInfo().id}`)
            localStorage.setItem(`cartOfUser${userContext.getUserInfo().id}`, JSON.stringify(cartItems))
        } else {
            //if guest user
            if(cartItems.length > 0){

                //to update the cartitems in local storage everytime user edits cart
                localStorage.removeItem('cartItems')

                localStorage.setItem('cartItems', JSON.stringify(cartItems))
                console.log('testing 2')
            } else if(cartItems === []){
                console.log('testing')
                let cartItems = JSON.parse(localStorage.getItem('cartItems'))
                setCartItems(cartItems)
            } 
            // else {
            //     localStorage.removeItem('cartItems')
            // }
        }
    }, [cartItems])

    // useEffect(() => {

    //     // if(cartItems !== []){
    //     //     console.log('cartItems', typeof cartItems)
    //     //     console.log('testing')

    //     // if(localStorage.getItem('cartItem') == "[]" ){
    //     //     console.log(123)
    //     // }

    //     if (localStorage.getItem('cartItems') && localStorage.getItem('cartItems') !== "[]") {
    //         localStorage.removeItem('cartItems')
    //         localStorage.setItem('cartItems', JSON.stringify(cartItems))
    //         // console.log(typeof localStorage.getItem('cartItems'))
    //     } else {
    //         localStorage.setItem('cartItems', JSON.stringify(cartItems))
    //     }


    //     // console.log('cartItems', typeof cartItems)

    //     // } 
    //     // else if (cartItems === []) {
    //     //     localStorage.removeItem('cartItems')
    //     // }

    // }, [cartItems])

    // useEffect(() => {
    //     if(cartItems === []){
    //         localStorage.removeItem('cartItems')
    //     }
    // }, [])

    return (
        <CartContext.Provider value={context}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider