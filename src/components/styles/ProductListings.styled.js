import styled from 'styled-components'

export const StyledProductListingsLayout = styled.div`
display: flex;
// flex-direction: row;
border: 2px solid green;
`

export const StyledSideFilter = styled.aside`

flex: 1;

margin-right: 1rem;
border: 1px dotted red;
display: none;

div label input {
    margin-right: 100px;
}

.box{
    margin: 4px;
    border: 1px solid black;
    overflow: hidden;
    // float: left;
    display: inline;
}

.box label {
    // float: left; 
    line-height: 3.0em;
    // width: 8.0em; 
    height: 3.0em;
    padding : 5px 10px;
}

.box label span {
    text-align: center;
    padding: 3px 0;
    display: block;
}

.box label input {
    position: absolute;
    display: none;
    color: #fff !important;
  }

  .box input:checked + span {
    color: black;
    text-shadow: 0 0  6px rgba(0, 0, 0, 0.8);
}


@media (min-width: ${({ theme }) => theme.lg}) {
    display: block;
}
`

export const StyledProductListings = styled.div`
box-sizing: border-box;
margin:auto;
flex: 3;
border: 1px dotted grey
`