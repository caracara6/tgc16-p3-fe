import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import ProductProvider from "./contexts/products/ProductProvider";

import Main from "./pages/Main";

import React from 'react'

import GlobalStyles from './components/styles/GlobalStyle'

function App() {
	return (
		<>
		<GlobalStyles />
		<ProductProvider>
			<Main />
		</ProductProvider>
		
		</>
	)
}

export default App