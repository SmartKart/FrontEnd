import React from 'react';
import styled from 'styled-components';
import ContextBar from '../navs/ContextBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';

const ContextTitle = styled.h1`
    font-size: 1.5rem;
    display: inline-block;
    margin-top: 5px;
`;

const Wrapper = styled.span`
    float: right;
    padding-right: 20px;
`;

const CartsPage = () => {
    return (
        <MuiThemeProvider>
            <div>
                <ContextBar>
                    <ContextTitle>Cart Locations</ContextTitle>
                    <Wrapper>
                        <TextField hintText='Search...' />
                    </Wrapper>
                </ContextBar>
            </div>
        </MuiThemeProvider>
    );
};

export default CartsPage;
