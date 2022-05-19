import axios from 'axios'

import {
    getHttpHeaders
} from './users'

const BASE_API_URL = "https://cccc-tgc16-p3-api2.herokuapp.com/api"
// const BASE_API_URL = "http://localhost:8080"


export async function checkout() {
    try{
        // if(localStorage.getItem('userInfo')){
            // try{
                let authHeaders = getHttpHeaders();
                console.log(authHeaders)
                let responseStripe = await axios.post(BASE_API_URL + '/checkout', {}, {headers: getHttpHeaders()})
        
                return {status: true, url: responseStripe.data.url }
            // } catch (e) {
            //     console.log('testing checkout', e.response.data.message)
            //     return e.response.data
            // }
            
        // } else {
        //     return false
        // }
    } catch (e) {
        console.log('testing checkout', e)
        console.log(e)
        return {status: false, message: e.response.data}
    }
    
}