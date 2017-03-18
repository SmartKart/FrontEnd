import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    position: relative;
    width: 15rem;
    max-width: 200px;
    -ms-flex: 0 0 15rem;
    -webkit-flex: 0 0 15rem;
    flex: 0 0 20rem;
    background-color: #525252;
    color: #fff;
    padding: .25rem;
    padding-left: 1rem;
    padding-right: 1rem;
    height: 100%;
`;

const SideNav = () => {
    return (
        <Wrapper>
            <h1>SideNav</h1>
        </Wrapper>
    );
};

export default SideNav;
