import React from 'react';
import styled from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CartMap from '../misc/CartMap';

const PageTitle = styled.h1`
    text-align: center;
`;

const CartsPage = () => {
    return (
        <MuiThemeProvider>
            <div>
                <PageTitle>Cart Tracker</PageTitle>
                <CartMap />
            </div>
        </MuiThemeProvider>
    );
};

export default CartsPage;
