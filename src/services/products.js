import axios from 'axios'

export async function getCategories() {
    let response = await axios.get(process.env.REACT_API_URL + '/categories');
    return response.data
}

export async function getCountries() {
    let response = await axios.get(process.env.REACT_API_URL + '/countries');
    return response.data
}

export async function getRegions() {
    let response = await axios.get(process.env.REACT_API_URL + '/regions');
    return response.data
}

export async function getProducers() {
    let response = await axios.get(process.env.REACT_API_URL + '/producers');
    return response.data
}

export async function getGrapeVarietals() {
    let response = await axios.get(process.env.REACT_API_URL + '/grape-varietals');
    return response.data
}

export async function getAllProducts() {
    //search filter here
    let response = await axios.get(process.env.REACT_API_URL + '/products');
    return response.data
}

export async function getProductById(productId) {
    //search filter here
    let response = await axios.get(process.env.REACT_API_URL + '/products/' + productId);
    return response.data
}