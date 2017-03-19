import React, { PropTypes } from 'react';
import styled from 'styled-components';
import StoreItem from '../misc/StoreItem';

const Wrapper = styled.div`
    overflow-y: scroll;
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

export default StoreItemList;
