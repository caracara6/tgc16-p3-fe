import React from 'react'
import styled from 'styled-components'
import { GrFacebook } from 'react-icons/gr'
import { FaInstagramSquare} from 'react-icons/fa'


function Footer() {
  return (
      <StyledFooter>
          <h4>
            CINQ A SEPT WINE COMPANY - INFORMATION
          </h4>
          <ul>
              <li>About Us</li>
              <li>Contact Us</li>
          </ul>
          <ul className='socials-wrapper'>
              <li>
                  <GrFacebook/>
              </li>
              <li>
                  <FaInstagramSquare/>
              </li>
          </ul>

      </StyledFooter>
    
  )
}

const StyledFooter = styled.footer`
height: 30vh;
background-color: ${({theme})=>theme.colours.dark};
color: white;
padding: 2rem;

h4 {
    margin-bottom: 2rem;
}

ul {
    list-style: none;
}

li{
    margin-bottom: 1rem;
}

.socials-wrapper{
    display:flex;

    li{
        margin-right: 1rem;
    }
}

  

  
`

export default Footer