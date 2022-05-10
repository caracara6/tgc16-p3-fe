import axios from 'axios'

import {
    getHttpHeaders
} from './users'

const BASE_API_URL = "https://cccc-tgc16-p3-api2.herokuapp.com/api"


export async function checkout() {
    try{
        if(localStorage.getItem('userInfo')){
            let authHeaders = getHttpHeaders();
            console.log(authHeaders)
            let responseStripe = await axios.post(BASE_API_URL + '/checkout', {headers: getHttpHeaders()})
    
            return responseStripe.data.url
        } else {
            return false
        }
    } catch (e) {
        console.log(e)
    }
    
}