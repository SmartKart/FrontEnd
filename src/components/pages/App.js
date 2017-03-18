import React from 'react';
import styled from 'styled-components';
import SideNav from '../navs/SideNav';
import ContextBar from '../navs/ContextBar';

const Wrapper = styled.div`
    display: flex;
`;

const App = () => {
    return (
        <Wrapper>
            <SideNav />
            <ContextBar />
            <h1>Hello, world!</h1>
        </Wrapper>
    );
};

export default App;
