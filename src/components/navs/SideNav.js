import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';

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

const Title = styled.h1`
    text-align: center;
    font-size: 1.5rem;
`;

const NavList = styled.ul`
    list-style-type: none;
    text-decoration: none;
    display: flex;
    flex-direction: column;

    & > li > a {
        text-decoration: none;
        color: currentColor;
    }
`;

const SideNav = () => {
    return (
        <Wrapper>
            <Title>Manager</Title>
            <NavList>
                <li><Link to='/'>Store</Link></li>
                <li><Link to='/carts'>Carts</Link></li>
                <li><Link to='/analytics'>Analytics</Link></li>
            </NavList>
        </Wrapper>
    );
};

export default SideNav;
