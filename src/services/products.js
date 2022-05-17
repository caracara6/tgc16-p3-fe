import axios from 'axios'

const BASE_API_URL = "https://cccc-tgc16-p3-api2.herokuapp.com/api"
// const BASE_API_URL = "http://localhost:8080"


export async function getCategories() {
   
    let response = await axios.get(BASE_API_URL + '/product-related/categories');
    return response.data
}

export async function getCountries() {
    let response = await axios.get(BASE_API_URL + '/product-related/countries');
    return response.data
}

export async function getRegions() {
    let response = await axios.get(BASE_API_URL + '/product-related/regions');
    return response.data
}

export async function getProducers() {
    let response = await axios.get(BASE_API_URL + '/product-related/producers');
    return response.data
}

export async function getGrapeVarietals() {
    let response = await axios.get(BASE_API_URL + '/product-related/grape-varietals');
    return response.data
}

export async function getAllProducts(searchInput, categoryFilter) {
    //search filter here

    let payload = {
        params: {}
    }

    if(searchInput) {
        payload.params = {
            searchInput
        }
    }

    if(categoryFilter) {
        payload.params = {
            categoryFilter: categoryFilter
        }
    }


    // console.log('payload=> ', payload)

    let responseProducts = await axios.get(BASE_API_URL + '/product-related/products', payload);
    // console.log('responseProduct => ', responseProducts.data)
    return responseProducts.data
}

export async function getProductById(productId) {
    let response = await axios.get(BASE_API_URL + '/product-related/products/' + productId.toString());
    return response.data
}