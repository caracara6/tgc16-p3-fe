import React from "react";

import ProductContext from './ProductContext'



function ProductProvider(props) {
    return <ProductContext.Provider>
        {props.children}
    </ProductContext.Provider>
}

export default ProductProvider