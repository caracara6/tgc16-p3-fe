import React, { useEffect, useState }from "react";

import ProductContext from './ProductContext';

import {
    getCategories,
    getCountries,
    getRegions,
    getProducers,
    getGrapeVarietals,
    getAllProducts,
} from '../../services/products';





function ProductProvider(props) {

    const [categories, setCategories] = useState([]);
    const [countries, setCountries] = useState([]);
    const [regions, setRegions] = useState([]);
    const [producers, setProducers] = useState([]);
    const [grapeVarietals, setGrapeVarietals] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchInput, setSearchInput] = useState('')
    const [categoryFilter, setCategoryFilter] = useState()

    const context = {

        allCategories: () => {
            return categories
        },

        allCountries: () => {
            return countries
        },

        allRegions: () => {
            return regions
        },

        allProducers: () => {
            return producers
        },

        allGrapeVarietals: () => {
            return grapeVarietals
        },

        allProducts: () => {
            return products;
        },

        getProductByID: (productId) => {
			return products.filter(p => p.id === productId)[0];
		},

        setSearchInput: (searchInput) => {
            return setSearchInput(searchInput)
        },

        setCategoryFilter: (categoryFilter) => {
            return setCategoryFilter(categoryFilter)
        }
    
    }

    useEffect( () => {
        const fetchAllData = async () => {
            
            let categories = await getCategories();
            setCategories(categories);

            let countries = await getCountries();
            setCountries(countries);

            let regions = await getRegions();
            setRegions(regions);

            let producers = await getProducers();
            setProducers(producers);

            let grapeVarietals = await getGrapeVarietals();
            setGrapeVarietals(grapeVarietals);

            let products = await getAllProducts();
            setProducts(products);
            
        }

        fetchAllData()

    }, [])

    useEffect( () => {
        const fetchProducts = async () => {
            let products = await getAllProducts(searchInput, categoryFilter);
            setProducts(products);
        }

        fetchProducts()
    }, [searchInput, categoryFilter])

    return <ProductContext.Provider value={context}>
        {props.children}
    </ProductContext.Provider>
}

export default ProductProvider