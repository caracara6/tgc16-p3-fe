import styled from 'styled-components'

export const StyledNavMD = styled.nav`
width: 100%;
position: relative;
color: ${({theme}) => theme.colours.dark};

    a{
        text-decoration: none;
        color: ${({theme}) => theme.colours.dark};
    }

`

export const StyledNavList = styled.ul`
    width: 100%;
    display:flex!important;
    margin-top: 15vh;
    justify-content: center!important;
    align-items: center;
    gap: 2rem;
   

    .nav__listitem {
        list-style: none;
        // position: relative;
        
        padding:1.5rem 1rem;
        cursor: pointer;

        &:hover .nav__listitemdrop, 
        &:focus .nav__listitemdrop,
        &:active .nav__listitemdrop {
            opacity: 1;
            visibility: visible;
            z-index: 2;
        }

        &drop{
            position: absolute;
            top:90% ;
            left:0%;
            width: 100%;
            border: 1px solid grey;
            background-color: #fff;
            padding: 1rem ;
            display: flex;
            // flex-direction: column;
            justify-content: space-around;
            gap:0.5rem;
            opacity: 0;
            visibility:hidden;
            transition : opacity 200ms ease-in-out;

            ul{
                padding:0.5rem 1rem;
                transition: background- color 200ms
                ease-in-out;
            }
        }
    }
`