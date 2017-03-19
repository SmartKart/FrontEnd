import React from 'react';
import styled from 'styled-components';
import ContextBar from '../navs/ContextBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import Add from 'material-ui/svg-icons/content/add';
import StoreItemContainer from '../../containers/StoreItemContainer';

const PageWrapper = styled.div`
    padding: 0 2rem;
`;

const PageTitle = styled.h1`
    text-align: center;

`;

const ContextTitle = styled.h1`
    font-size: 1.5rem;
    display: inline-block;
    margin-top: 5px;
`;

const Wrapper = styled.span`
    float: right;
    padding-right: 20px;
`;

const StorePage = () => {
    return (
        <MuiThemeProvider>
            <div>
                <ContextBar>
                    <ContextTitle>Your Store</ContextTitle>
                    <Wrapper>
                        <IconButton><Add /></IconButton>
                    </Wrapper>
                </ContextBar>
                <PageWrapper>
                    <PageTitle>Current Store Items</PageTitle>
                    <StoreItemContainer />
                </PageWrapper>
            </div>
        </MuiThemeProvider>
    );
};

export default StorePage;
