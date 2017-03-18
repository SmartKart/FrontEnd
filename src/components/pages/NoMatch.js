import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    padding: 4rem;
`;

const Title = styled.h1`
    font-size: 2rem;
`;

const NoMatch = () => {
    return (
        <Wrapper>
            <Title>Whoops! We couldn't find that URL.</Title>
            <p>Please check your path and try again</p>
        </Wrapper>
    );
};

export default NoMatch;
