import React from 'react'
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import { Container } from 'react-bootstrap';


import Header from '../components/Header'
import NavMD from '../components/NavMD'
import Login from './Login'
import Register from './Register'
import Landing from './Landing'
import ProductListings from './ProductListings'
import Product from './Product'

import NavOffCanvas from '../components/NavOffCanvas'
import SearchModal from '../components/SearchModal'
import CartModal from '../components/CartModal'



function Main() {
    return (
        <React.Fragment>
            <BrowserRouter>
                <Container fluid>


                    <Header />
                    <NavMD className='d-none d-md-block' />



                    <NavOffCanvas />
                    <SearchModal />
                    <CartModal />

                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/account/login" element={<Login />} />
                        <Route path="/account/Register" element={<Register/>}/>
                        <Route path="/collections/:collectionName" element={<ProductListings/>}/>
                        <Route path="/account/Register" element={<Product/>}/>








                    </Routes>
                </Container>
            </BrowserRouter>

        </React.Fragment>

    )
}

export default Main