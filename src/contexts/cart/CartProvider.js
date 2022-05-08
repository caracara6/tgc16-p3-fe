import React, { useState } from 'react'

import CartContext from './CartContext';



function CartProvider(props) {

    context = {

    }

  return (
    <CartContext.Provider value={context}>
        {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider