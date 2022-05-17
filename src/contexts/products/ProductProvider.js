import React, { useEffect, useState } from "react";

import ProductContext from './ProductContext';

import {
    getCategories,
    getCountries,
    getRegions,
    getProducers,
    getGrapeVarietals,
    getAllProducts,
    getProductById
} from '../../services/products';





function ProductProvider(props) {

    const [categories, setCategories] = useState([]);
    const [countries, setCountries] = useState([]);
    // const [regions, setRegions] = useState([]);
    // const [producers, setProducers] = useState([]);
    // const [grapeVarietals, setGrapeVarietals] = useState([]);
    const [products, setProducts] = useState([]);
    const [activeProductId, setActiveProductId] = useState();
    const [activeProduct, setActiveProduct] = useState({});
    const [searchInput, setSearchInput] = useState('');
    const [categoryFilter, setCategoryFilter] = useState();
    let [loaded, setLoaded] = useState(false);

    const context = {

        allCategories: () => {
            return categories
        },

        allCountries: () => {
            return countries
        },

        // allRegions: () => {
        //     return regions
        // },

        // allProducers: () => {
        //     return producers
        // },

        // allGrapeVarietals: () => {
        //     return grapeVarietals
        // },

        allProducts: () => {
            return products;
        },

        getActiveProduct: () => {
            return activeProduct
        },

        // getProductByID: (productId) => {
        // 	return products.filter(p => p.id === productId)[0];
        // },
        setActiveProductId: (productId) => {
            return setActiveProductId(productId)
        },

        getLoaded: () => {
            return loaded
        },

        setLoaded: () => {
            return setLoaded
        },

        setSearchInput: (searchInput) => {
            setLoaded(false);
            return setSearchInput(searchInput);
        },

        setCategoryFilter: (categoryFilter) => {
            setLoaded(false);
            return setCategoryFilter(categoryFilter);
        }

    }

    useEffect(() => {
        const fetchAllData = async () => {

            console.log('initial loading ')

            let categories = await getCategories();
            setCategories(categories);

            // let countries = await getCountries();
            // setCountries(countries);

            // let regions = await getRegions();
            // setRegions(regions);

            // let producers = await getProducers();
            // setProducers(producers);

            // let grapeVarietals = await getGrapeVarietals();
            // setGrapeVarietals(grapeVarietals);

            // let products = await getAllProducts();
            // setProducts(products);

            setLoaded(true);

        }

        fetchAllData();

    }, [])

    useEffect(() => {
        const fetchProducts = async () => {
            let products = await getAllProducts(searchInput, categoryFilter);
            setProducts(products);

            setLoaded(true);
        }

        fetchProducts();
    }, [searchInput, categoryFilter])

    useEffect(() => {
        const fetchActiveProduct = async (activeProductId) => {
            let activeProduct = await getProductById(activeProductId);
            setActiveProduct(activeProduct);

            setLoaded(true);
        }

        if (activeProductId) {
            fetchActiveProduct(activeProductId)
        }


    }, [activeProductId])



    return <ProductContext.Provider value={context}>
        {props.children}
    </ProductContext.Provider>
}

export default ProductProvider