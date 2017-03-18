import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    height: 50px;
    width: 100%;
`;

const ContextBar = () => {
    return (
        <Wrapper>
            <h1>ContextBar</h1>
        </Wrapper>
    );
};

export default ContextBar;
