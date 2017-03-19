import React, { PropTypes } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    height: 40px;
    width: 100%;
    padding: 0 1rem;
`;

const ContextBar = ({ children }) => {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    );
};

ContextBar.propTypes = {
    children: PropTypes.any
};

export default ContextBar;
