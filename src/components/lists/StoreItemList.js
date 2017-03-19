import React, { PropTypes } from 'react';
import styled from 'styled-components';
import StoreItem from '../misc/StoreItem';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const StoreItemList = ({ items }) => {
    return (
        <Wrapper>
            {items.map((item) =>
                <StoreItem key={item.itemId} {...item} />
            )}
        </Wrapper>
    );
};

StoreItemList.propTypes = {
    items: PropTypes.array
};

StoreItemList.defaultProps = {
    items: [
        {
            itemName: 'coke',
            itemId: 0,
            itemQuantity: 25
        },
        {
            itemName: 'chips',
            itemId: 1,
            itemQuantity: 15
        },
        {
            itemName: 'computers',
            itemId: 2,
            itemQuantity: 45
        }
    ]
};

export default StoreItemList;
