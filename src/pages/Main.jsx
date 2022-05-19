import React from 'react'
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import { Container } from 'react-bootstrap';


import Header from '../components/Header'
import NavMD from '../components/NavMD'
import Login from './Login'
import Register from './Register'
import Landing from './Landing'
import AboutUs from './AboutUs'
import ProductListings from './ProductListings'
import ProductSingle from './ProductSingle'
import Checkout from './Checkout';

import NavOffCanvas from '../components/NavOffCanvas'
import SearchModal from '../components/SearchModal'
import CartModal from '../components/CartModal'
import Footer from '../components/Footer'



function Main() {
    return (
        <React.Fragment>
            <BrowserRouter>
                <Container fluid>


                    <Header />
                    <NavMD />

                    <NavOffCanvas />
                    <CartModal />
                    <SearchModal />

                    <div className='main-content'>
                        <Routes>
                            <Route path="/" element={<Landing />} />
                            <Route path="/about-us" element={<AboutUs />} />
                            <Route path="/account/login" element={<Login />} />
                            <Route path="/account/Register" element={<Register />} />
                            <Route path="/categories/:categoryFilter" element={<ProductListings />} />
                            <Route path="/categories/:categoryFilter/:productId" element={<ProductSingle />} />
                            <Route path="/checkout-success" element={<Checkout />} />

                        </Routes>
                    </div>
                    <Footer />
                </Container>
            </BrowserRouter>

        </React.Fragment>

    )
}

export default Main