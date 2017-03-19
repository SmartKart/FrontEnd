import React, { PropTypes } from 'react';
import SideNav from '../navs/SideNav';
import styled from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    overflow-y: hidden;
`;

const Content = styled.div`
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    flex-direction: column;
    height: 100%;
    -webkit-box-flex: 1;
    -webkit-flex-grow: 1;
    -moz-flex-grow: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: scroll;
    z-index: 1;
`;

const App = ({ children }) => {
    return (
        <MuiThemeProvider>
            <Wrapper>
                <SideNav />
                <Content>
                    {children}
                </Content>
            </Wrapper>
        </MuiThemeProvider>
    );
};

App.PropTypes = {
    children: PropTypes.any
};

export default App;
