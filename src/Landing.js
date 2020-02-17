import React from 'react';
import styled from 'styled-components';
import bgImg from './assets/bgImg.jpg';

const Styles = styled.div`
    .background{
        background-image: url(${bgImg}) ;
    }
`;

export const Landing = () => (
    <Styles>
        <div className = 'background'>
            </div>
    </Styles>
)