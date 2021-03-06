import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import ProductProvider from "./contexts/products/ProductProvider";
import UserProvider from "./contexts/users/UserProvider";
import CartProvider from "./contexts/cart/CartProvider";


import Main from "./pages/Main";

import React from 'react'

import { ThemeProvider } from 'styled-components'
import GlobalStyles from './components/styles/GlobalStyle'

const theme = {

	colours: {
		light: '#EAE8FF',
		dark: '#2D232E',
		accent: '#CBA2A6'
	},

	sm: '576px',
	md: '768px',
	lg: '992px',
	xl: '1200px'
}

function App() {


	return (
		<ThemeProvider theme={theme}>


			<>
				<GlobalStyles />
				<UserProvider>
					<ProductProvider>
						<CartProvider>
							<Main />
						</CartProvider>
					</ProductProvider>
				</UserProvider>

			</>

		</ThemeProvider>
	)
}

export default App