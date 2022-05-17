import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`

* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    // overflow-x: hidden;
}

.container-fluid{
	padding: 0;
}

svg{
	width: 1.5rem;
	height: 1.5rem;
}


.modal-backdrop.show{
  background-color: black;
  opacity: 0.85
}


  //media query for iphone size overflow-x hidden
`

export default GlobalStyles