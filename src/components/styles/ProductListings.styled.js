import styled from 'styled-components'

export const StyledProductListingsLayout = styled.div`
@keyframes slideIn {
	from{
		width: 0;
	}

	to{
		width: 40px;
	}
}

@keyframes zoomIn{
	from{

	}
	to{
		transform: scale(1.5)
	}
}

margin-top:15vh;
display: flex;
flex-wrap: wrap;
width: 100vw;

.header{
    width: 100vw;

    img {
        height: 50vh;
        object-fit: cover;
        animation: zoomIn 30s ease forwards;
    }
}

.header-img-wrapper{
    width: 100%;
    overflow: hidden;
}

.filter-wrapper{
    flex-basis:100%;
}

.w-100{
    width:100%;
}

h2 {
    margin-top: 2rem;
    margin-bottom: 2rem;
    text-align: center;
    position: relative;
}

h2::after{
	content: "";
	width: 40px;
	height: 3px;
	background-color: ${({ theme }) => theme.colours.dark};
	position absolute;
	bottom: -15px;
	left: 50%;
	margin-left: -15px;
	animation: slideIn 2s
}

a{
    text-decoration: none;
    color: ${({theme}) => theme.colours.dark};
}

.filter-btn{
    background-color: ${({theme}) => theme.colours.light};
    border-radius: 0px;
    border: none;
    color: ${({theme}) => theme.colours.dark}
}

.dropdown button, .dropdown button:focus{
    background-color: white;
    color: ${({theme}) => theme.colours.dark};
    border-radius: 0px;
    border: 1px solid ${({theme}) => theme.colours.dark};
}

@media (min-width: ${({ theme }) => theme.md}) {
    margin-top:5vh;
    .card-body{
        font-size: 1.2rem;
    }

    a{
        font-size: 1.2rem;
    }
}

@media (min-width: ${({ theme }) => theme.lg}) {

    .row:first-of-type {
        margin-bottom: 4rem;
    }

}


`

export const StyledSideFilter = styled.aside`

flex: 1;

margin-right: 1rem;
margin-left: 2rem;
padding-bottom: 3rem;
display: none;

h6{
    font-size: 1rem;
}

h6:not(:first-of-type){
    margin-top: 2rem;
}

// div label input {
//     margin-right: 100px;
// }

.box{
    margin: 4px;
    border: 1px solid black;
    display: inline-block;
    cursor: pointer;
}

.box:hover{
    cursor: pointer;
}

.box label span {
    text-align: center;
    padding: 5px 8px;
    display: block;
    font-size: 0.8rem;
}

.box label input {
    position: absolute;
    display: none;
    color: #fff !important;
}

.box input:checked + span::after{
    position: relative;
    content: 'x';
    left: 10px;
    // bottom: 12px;
    color: lightgrey;
    padding-right: 10px
}


@media (min-width: ${({ theme }) => theme.lg}) {
    display: block;

}


`

export const StyledProductListings = styled.div`
box-sizing: border-box;
margin:auto;
flex: 3;

.col{
    height: 65vh;
}

// @media (min-width: ${({ theme }) => theme.md}) {
//     .col{
//         height: 60vh;
//     }
// }

@media (min-width: ${({ theme }) => theme.lg}) {
    padding-right: 2rem;
    .col{
        height: 69vh;
    }
    
}

@media (min-width: ${({ theme }) => theme.xl}) {
    .col{
        height: 75vh;
    }
    
}


`