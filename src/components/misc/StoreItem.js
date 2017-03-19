import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteStoreItem } from '../../actions/storeActions';
import styled from 'styled-components';
import Paper from 'material-ui/Paper';
import Delete from 'material-ui/svg-icons/action/delete';
import Edit from 'material-ui/svg-icons/editor/mode-edit';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import { editStoreItem } from '../../actions/storeActions';

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

const CustomEdit = styled(Edit)`
    & :hover {
        color: green;
    }
`;

const ModalWrapper = styled.div`
    text-align: center;
`;

const CustomToggle = styled(Toggle)`
    text-align: center;

    & label {
        width: initial;
    }
`;

// name, id, quantity, url, price, onSale, salePercent
class StoreItem extends Component {
    constructor(props) {
        super(props);
        const { itemName, itemQuantity, imgUrl, itemPrice, onSale, itemSalePercent } = this.props;
        this.state = {
            shadow: 1,
            editOpen: false,
            name: itemName,
            quantity: itemQuantity,
            url: imgUrl,
            price: itemPrice,
            onSale: onSale,
            salePercent: itemSalePercent
        };

        this.hover = this.hover.bind(this);
        this.unHover = this.unHover.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.toggleOpen = this.toggleOpen.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    onDelete() {
        let { handleDelete, itemId } = this.props;
        handleDelete(itemId);
    }

    onEdit() {
        let { handleEdit, itemId } = this.props;
        handleEdit(itemId);
    }

    hover() {
        this.setState({shadow: 2});
    }

    unHover() {
        this.setState({shadow: 1});
    }

    toggleOpen() {
        let { itemId } = this.props;
        this.setState({editOpen: !this.state.editOpen});
        console.log(itemId);
    }

    handleChange(e) {
        switch (e.target.name) {
            case 'name': {
                this.setState({
                    name: e.target.value
                });
                break;
            }
            case 'price' :{
                this.setState({
                    price: e.target.value
                });
                break;
            }
            case 'quantity': {
                this.setState({
                    quantity: e.target.value
                });
                break;
            }
            case 'url': {
                this.setState({
                    url: e.target.value
                });
                break;
            }
            case 'sale': {
                this.setState({
                    onSale: !this.state.onSale
                });
                break;
            }
            case 'salePercent': {
                this.setState({
                    salePercent: e.target.value
                });
                break;
            }
            default:
                console.warn('What??');
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        let { onSubmit, itemId } = this.props;
        let { name, quantity, url, price, onSale, salePercent } = this.state;
        onSubmit(name, itemId, quantity, url, price, onSale, salePercent);
        this.setState({editOpen: !this.state.editOpen});
    }

    render() {
        const { itemName, itemQuantity, imgUrl, itemPrice, onSale, itemSalePercent } = this.props;
        const { shadow, editOpen } = this.state;
        return (
            <Wrapper>
                <Dialog
                    title='Edit Item in Store'
                    modal={true}
                    open={editOpen}
                >
                    <ModalWrapper>
                        <form name='storeEdit' onSubmit={this.handleSubmit} onChange={this.handleChange}>
                            <TextField name='name' floatingLabelText='Item Name' hintText={itemName} />
                            <br />
                            <TextField name='url' floatingLabelText='Image Url' hintText={imgUrl} />
                            <br />
                            <TextField name='price' type='number' floatingLabelText='Price' hintText={`$${itemPrice}`} />
                            <br />
                            <TextField name='quantity' type='number' floatingLabelText='Quantity' hintText={itemQuantity} />
                            <br />
                            <CustomToggle
                                name='sale'
                                label='On Sale'
                            />
                            {onSale ?
                                <TextField name='salePercent' type='number' floatingLabelText='Percent Off' hintText={`${itemSalePercent}%`} />
                                :
                                ''
                            }
                            <br />

                                <FlatButton
                                    label='Cancel'
                                    secondary={true}
                                    onTouchTap={this.toggleOpen}
                                />
                                <FlatButton
                                    label='Submit'
                                    type='submit'
                                    primary={true}
                                    onTouchTap={this.toggleOpen}
                                />
                        </form>
                    </ModalWrapper>
                </Dialog>
                <CustomPaper zDepth={shadow} onMouseEnter={this.hover} onMouseLeave={this.unHover}>
                    <ItemNav>
                        <ItemNavItem onClick={this.toggleOpen}><CustomEdit style={{color: '#a8a8a8'}} /></ItemNavItem>
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
            },
            onSubmit: (name, id, quantity, url, price, onSale, salePercent) => {
                dispatch(editStoreItem(name, id, quantity, url, price, onSale, salePercent));
            }
        };
    }
)(StoreItem);
