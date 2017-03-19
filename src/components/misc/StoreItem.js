import React from 'react';
import styled from 'styled-components';
import Paper from 'material-ui/Paper';

const Wrapper = styled.div`
    display: inline-block;
    width: 20rem;
    max-width: 500px;
    text-align: center;
`;

const Title = styled.h1`
    font-size: 1.5rem;
    color: currentColor;
`;

const CustomPaper = styled(Paper)`
    width: 100%%;
    padding: 20px;
    margin: 10px;
`;

const StoreItem = ({ itemName, itemQuantity }) => {
    return (
        <Wrapper>
            <CustomPaper>
                <Title>{itemName}</Title>
                <p>Total Quantity {itemQuantity}</p>
            </CustomPaper>
        </Wrapper>
    );
};

export default StoreItem;
