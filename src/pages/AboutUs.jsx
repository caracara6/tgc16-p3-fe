import React from 'react'

import styled from 'styled-components'

function AboutUs() {
    return (
        <StyledAboutUs>
            <h1>Our Story</h1>
            <p>cinq à sept sank·ah·set sæŋk’e’set n : The time between late afternoon and early evening when streets are awash in the warm glow of the vanishing sun and anything is possible.</p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic esse maxime recusandae aut a nisi nesciunt at. 
                Deleniti quo reprehenderit quas error veritatis natus nulla fugiat. Nostrum similique soluta quas. 
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                Commodi error officia id omnis labore consectetur dolores dignissimos mollitia saepe quaerat totam, 
                magni dicta possimus maxime natus corporis magnam iste quibusdam!
            </p>
        </StyledAboutUs>

    )
}

const StyledAboutUs = styled.section`
margin-top: 15vh;
border: 1px solid red;
padding: 0 2rem 0;

@media (min-width: ${({ theme }) => theme.md}){
    margin-top: 5vh;
    padding: 0 3rem 0;
}

@media (min-width: ${({ theme }) => theme.lg}){
    padding: 0 10vw 0;
}


`

export default AboutUs