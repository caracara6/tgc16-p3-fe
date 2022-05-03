import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import ProductProvider from "./contexts/products/ProductProvider";

import Main from "./pages/Main";

import React from 'react'

function App() {
	return (
		<>
		<ProductProvider>
			<Main />
		</ProductProvider>
		
		</>
	)
}

export default App