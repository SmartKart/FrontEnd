import React from 'react';
import styled from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const PageTitle = styled.h1`
    text-align: center;
`;

const CartsPage = () => {
    return (
        <MuiThemeProvider>
            <div>
                <PageTitle>Cart Tracker</PageTitle>
            </div>
        </MuiThemeProvider>
    );
};

export default CartsPage;
