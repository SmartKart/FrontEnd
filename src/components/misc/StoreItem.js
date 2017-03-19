import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteStoreItem } from '../../actions/storeActions';
import styled from 'styled-components';
import Paper from 'material-ui/Paper';
import Delete from 'material-ui/svg-icons/action/delete';

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

const ItemImg = styled.img`
    max-width: 100px;
    min-width: 50px;
    max-height: 100px;
    min-height: 50px;
`;

const ItemNav = styled.div`
    width: 100%;
    text-align: right;
`;

const ItemNavItem = styled.a`
    display: inline-block;
    cursor: pointer;
`;

const CustomDelete = styled(Delete)`
    & :hover {
        color: red;
    }
`;


// name, id, quantity, url, price, onSale, salePercent
class StoreItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shadow: 1
        };

        this.hover = this.hover.bind(this);
        this.unHover = this.unHover.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }


    onDelete() {
        let { handleDelete, itemId } = this.props;
        handleDelete(itemId);
    }

    hover() {
        this.setState({shadow: 2});
    }

    unHover() {
        this.setState({shadow: 1});
    }

    render() {
        const { itemName, itemQuantity, imgUrl, itemPrice, onSale, itemSalePercent } = this.props;
        const { shadow } = this.state;
        return (
            <Wrapper>
                <CustomPaper zDepth={shadow} onMouseEnter={this.hover} onMouseLeave={this.unHover}>
                    <ItemNav>
                        <ItemNavItem onClick={this.onDelete}><CustomDelete style={{color: '#a8a8a8'}}/></ItemNavItem>
                    </ItemNav>
                    <Title>{itemName}</Title>
                    <p>{onSale ? `Sale Percent: ${itemSalePercent}` : ''}</p>
                    <ItemImg src={imgUrl} />
                    <p>Price: ${itemPrice}</p>
                    <p>Total Quantity: {itemQuantity}</p>
                </CustomPaper>
            </Wrapper>
        );
    }
}

export default connect(
    null,
    dispatch => {
        return {
            handleDelete: (itemId) => {
                dispatch(deleteStoreItem(itemId));
            }
        };
    }
)(StoreItem);
