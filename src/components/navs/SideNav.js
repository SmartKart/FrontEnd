import React from 'react';
import styled from 'styled-components';
import { IndexLink, Link } from 'react-router';

const Wrapper = styled.div`
    position: relative;
    width: 15rem;
    max-width: 225px;
    -ms-flex: 0 0 15rem;
    -webkit-flex: 0 0 15rem;
    flex: 0 0 20rem;
    align-items: center;
    background-color: #525252;
    color: #fff;
    height: 100%;
    border-right: 1px solid #ccc;
`;

const Title = styled.h1`
    text-align: center;
    font-size: 1.5rem;
`;

const NavList = styled.ul`
    list-style-type: none;
    text-decoration: none;
    padding-left: 0px;
    display: flex;
    flex-direction: column;

    & > li {
        width: 100%;
        height: 2rem;
        text-align: center;
        vertical-align: middle;
    }

    & > li > a {
        text-decoration: none;
        color: currentColor;
        width: 100%;
        height: 100%;
        display: block;
    }

    & > li > a.active {
        background-color: #fff;
        color: #525252;
    }
`;

const SideNav = () => {
    return (
        <Wrapper>
            <Title>SmartKart Manager</Title>
            <hr />
            <NavList>
                <li><IndexLink to='/' activeClassName='active'>Store</IndexLink></li>
                <li><Link to='/carts' activeClassName='active'>Carts</Link></li>
            </NavList>
        </Wrapper>
    );
};

export default SideNav;
