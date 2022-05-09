import axios from 'axios'

import {
    getHttpHeaders
} from './users'

const BASE_API_URL = "http://localhost:8080/api"

export async function getCart() {
    
    //call from api OR send withrelated cart_items when getting user profile?

    if(localStorage.getItem('userTokenInfo')) {
        
        let headers = getHttpHeaders();
        let responseCart = await axios.get(BASE_API_URL + '/cart', {headers: headers})

        let cartItems = []

        responseCart.data.map( c => {
            
            return cartItems.push({
                product: c.product,
                quantity: c.quantity
            })
        })
        
        return cartItems
    }

}

export async function addToCart(productId, quantity) {
    try {
        if(localStorage.getItem('userInfo')) {
        
            let responseAddToCart = await axios.post(BASE_API_URL + '/cart/' + productId.toString(), {
                quantity: quantity
            }, {
                headers: getHttpHeaders()
            })
    
            return responseAddToCart.data.message
        }
    } catch (e) {
        console.log(e)
    }
}

export async function updateQuantityCart(productId, quantity) {
    try{

        if(localStorage.getItem('userInfo')) {
            console.log('testing adding')
            let responseUpdateQuantityCart = await axios.put(BASE_API_URL + '/cart/' + productId, {
                newQuantity: quantity
            }, {
                headers: getHttpHeaders()
            })

            return responseUpdateQuantityCart.data.message
        }
    } catch (e) {
        console.log(e)
    }
}

export async function deleteFromCart(productId) {
    try {
        if(localStorage.getItem('userInfo')) {
            let responseDeleteFromCart = await axios.delete(BASE_API_URL + '/cart/' + productId, {
                headers : getHttpHeaders()
            })
            return responseDeleteFromCart.data.message
        }
    } catch (e) {
        console.log(e)
    }
}