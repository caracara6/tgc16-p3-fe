import styled from 'styled-components'

export const StyledNavMD = styled.nav`

// position: fixed;
width: 100%;
position: relative;

`

export const StyledNavList = styled.ul`
    width: 100%;
    display:flex!important;
    justify-content: center!important;
    align-items: center;
    gap: 2rem;
    // margin: 0 2rem;


    .nav__listitem {
        list-style: none;
        // position: relative;
        padding:1.5rem 1rem;
        cursor: pointer;

        &:hover .nav__listitemdrop, &:focus .nav__listitemdrop{
            opacity:1;
            visibility:visible;
        }

        &drop{
            position: absolute;
            top:100% ;
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