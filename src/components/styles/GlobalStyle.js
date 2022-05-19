import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`

@font-face {
    src: url(assets/fonts/rotunda-light.otf);
    font-family: RotundaLight;
}

* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    outline: none !important;
    box-shadow: none !important;
    // overflow-x: hidden;
}

.container-fluid{
	padding: 0;
}

* {
	font-family: 'Montserrat', sans-serif;
}

svg{
	width: 1.5rem;
	height: 1.5rem;
}

::selection{
	background: ${({ theme }) => theme.colours.dark};
	color: ${({ theme }) => theme.colours.light}
}

.modal-backdrop.show{
  background-color: black;
  opacity: 0.85
}

.offcanvas-start{
  width: 70vw;
  background-color: ${({ theme }) => theme.colours.light}
}

.nav-offcanvas{
	background-color: white;
	.btn{
		display: block
	}
	.accordion-header{
		white-space: nowrap;
	}
	.accordion-item {
		border: none
	}
	button {
		padding: 1rem!important
	}
	.accordion-button:not(.collapsed){
		background-color: white;
		color: ${({ theme }) => theme.colours.dark}
	}
}


.off-canvas-body .accordion-header button {
	padding: 1rem!important
}

.offcanvas-body 


a {
  	text-decoration: none;
  	color: ${({ theme }) => theme.colours.dark}
}

`

export default GlobalStyles