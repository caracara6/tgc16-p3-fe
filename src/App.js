import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import ProductProvider from "./contexts/products/ProductProvider";
import UserProvider from "./contexts/users/UserProvider";


import Main from "./pages/Main";

import React from 'react'

import { ThemeProvider } from 'styled-components'
import GlobalStyles from './components/styles/GlobalStyle'

const theme = {
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
						<Main />
					</ProductProvider>
				</UserProvider>

			</>

		</ThemeProvider>
	)
}

export default App