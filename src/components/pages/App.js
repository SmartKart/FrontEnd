import React, { PropTypes } from 'react';
import SideNav from '../navs/SideNav';
import ContextBar from '../navs/ContextBar';
import styled from 'styled-components';

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
    overflow: hidden;
    z-index: -1;
`;

const App = ({ children }) => {
    return (
        <Wrapper>
            <SideNav />
            <Content>
                <ContextBar />
                {children}
            </Content>
        </Wrapper>
    );
};

App.PropTypes = {
    children: PropTypes.any
};

export default App;
