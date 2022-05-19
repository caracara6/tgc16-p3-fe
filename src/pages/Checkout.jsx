import React from 'react'
import styled from 'styled-components'

function Checkout() {
  return (
    <StyledCheckout>
      <h2>Thank you for your order</h2>
    </StyledCheckout>

  )
}

const StyledCheckout = styled.div`
margin-top: 15vh;
padding: 0 2rem 0;

@media (min-width: ${({ theme }) => theme.md}) {
  margin-top: 5vh;
  padding: 0 10vw 0;
}
`

export default Checkout