import React from 'react'
import { Carousel } from 'react-bootstrap'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { FaChevronRight } from 'react-icons/fa'

function Landing() {
	return (
		<StyledLanding>
		<Carousel fade>
			<Carousel.Item>
				<img
					className=""
					src="https://cdn.shopify.com/s/files/1/0507/5540/3951/files/custom_resized_resized_4edc8c70-82c3-457e-84fb-873314ffb736_1512x.jpg?v=1613373431"
					alt="First slide"
				/>
				<Carousel.Caption className='caption1'>
					<h3>WELCOME TO CINQ À SEPT</h3>
					<p>TOP RATED WINES FROM AROUND THE WORLD, WITH FREE SHIPPING ON ALL ORDERS</p>
					<Link to='/categories/all'>YOUR BEST WINES ARE JUST A CLICK AWAY <FaChevronRight/></Link>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img
					className=""
					src='https://cdn.shopify.com/s/files/1/0810/4257/files/noborder_2048x.jpg?v=1636401212'
					alt="Second slide"
				/>

				<Carousel.Caption className='caption2'>
					<h3>OUR CURATION</h3>
					<p>BOUTIQUE WINERIES. BIODYNAMIC. RICH HERITAGE. GLOBAL DISCOVERIES.</p>
					<Link to='/categories/all'>SHOP NOW <FaChevronRight/></Link>

				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img
					className=""
					src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F23%2F2021%2F12%2F15%2Fwinc-wine-cheers-tout.jpg"
					alt="Third slide"
				/>

				<Carousel.Caption className='caption3'>
					<h3>LIFE'S A CELEBRATION</h3>
					<p>KEEP CALM AND POUR ON.</p>
					<Link to='/categories/all'>SHOP NOW <FaChevronRight/></Link>
				</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
		</StyledLanding>
	)
}

const StyledLanding = styled.section`

@keyframes fadeIn {
	from{
		opacity: 0;
		// transform: rotateX(-30deg)
	}

	to{
		opacity: 1;
		transition-delay: 2s;
		// transition-delay: 1s
	}
}

@keyframes zoomIn{
	from{

	}
	to{
		transform: scale(1.5)
	}
}

@keyframes slideIn {
	from{
		width: 0;
	}

	to{
		width: 40px;
		transition: width 0.5s ease-out;
	}
}


h3{
	position: relative;
	display:inline;
}

h3::after{
	content: "";
	width: 40px;
	height: 3px;
	background-color: ${({ theme }) => theme.colours.dark};
	position absolute;
	left: 1rem;
	bottom: -15px;
	margin-left: -15px;
	animation: slideIn 2s
}

.carousel{
	height: 70vh;
}

.carousel-inner, .carousel-item {
	height: 100%;
}

.carousel-caption p {
	margin-top: 3rem;
}

.carousel-action a::after{
	content: '\e913';
	display: block;
	height: 10px;
}

.caption1 a{
	text-decoration: none;
	position: absolute;
	bottom: 8px;
	white-space: nowrap;
	padding: 0.5rem 1rem;
	background-color: ${({ theme }) => theme.colours.dark};
	color: white;
	right: -30px
}


.caption2 a {
	text-decoration: none;
	position: absolute;
	bottom: 8px;
	padding: 0.5rem 1rem;
	background-color: ${({ theme }) => theme.colours.dark};
	color: white;
	right: -10px
}

.caption3 a {
	text-decoration: none;
	position: absolute;
	bottom: 8px;
	padding: 0.5rem 1rem;
	background-color: ${({ theme }) => theme.colours.dark};
	color: white;
	right: -10px
}


img{
	object-fit: cover;
	object-position: 50% 50%;
	width: 100%;
	height: 100%;
	animation: zoomIn 20s ease forwards
}

.carousel-control-next-icon, .carousel-control-prev-icon{
	display: none;
	background-color: ${({ theme }) => theme.colours.dark};
	opacity: 1
}

.carousel-control-next, .carousel-control-prev{
	opacity: 1;
	bottom: 10px!important;
	top: 90%;
}

.carousel-control-prev{
	left: 79%;
}

.carousel-caption{
	position: relative;
	background: RGBA(255,255,255,0.85);
	color: ${({ theme }) => theme.colours.dark};
}

.caption1{
	padding-left: 1.5rem;
	padding-right: 1.5rem;
	padding-bottom: 3rem;
	bottom: 70%;
	left: 1rem;
	width: 80%;
	text-align: left;
	animation: fadeIn ease-in 1s;	
}

.caption2{
	bottom: 60%;
	left: 0.5rem;
	padding-bottom: 3rem;
	width: 70%;
	text-align: left;
	padding-left: 1.5rem;
	padding-right: 1.5rem;
	animation: fadeIn ease-in 1s;	
}

.caption3{
	bottom: 60%;
	right: 1rem;
	width: 80%;
	text-align: right;
	padding-left: 1.5rem;
	padding-right: 1.5rem;
	padding-bottom: 3rem;
	animation: fadeIn ease-in 1s;	

}

@media (min-width: ${({ theme }) => theme.md}) {
	.carousel-control-next-icon, .carousel-control-prev-icon{
		display: block
	}

	.carousel-caption a{
		right: -10px
	}
}

@media (min-width: ${({ theme }) => theme.lg}) {
	.carousel-control-prev{
		left: 80%
	}
}

@media (min-width: ${({ theme }) => theme.xl}){
	.carousel-control-prev{
		left: 82%
	}
	.carousel-control-next{
		right: 0;
	}
	.carousel-caption{
		width: 50%;
	}
}


`




export default Landing