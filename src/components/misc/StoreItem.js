import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Paper from 'material-ui/Paper';
import Delete from 'material-ui/svg-icons/action/delete';
import Edit from 'material-ui/svg-icons/editor/mode-edit';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import Snackbar from 'material-ui/Snackbar';
import Chip from 'material-ui/Chip';
import { updateStoreItem, deleteSelectedStoreItem } from '../../actions/storeActions';

const Wrapper = styled.div`
    text-align: center;
    display: inline-block;
    position: relative;
`;

const Title = styled.h1`
    font-size: 1.5rem;
    color: currentColor;
`;

const CustomPaper = styled(Paper)`
    width: 300px;
    height: 400px;
    padding: 20px;
    margin: 10px;
    position: relative;
    display: inline-block;
    vertical-align: top;
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

const Strike = styled.span`
    text-decoration: line-through;
    color: red;
`;

// name, id, quantity, url, price, onSale, salePercent
class StoreItem extends Component {
    constructor(props) {
        super(props);
        const { itemName, itemQuantity, imgUrl, itemPrice, onSale, itemSalePercent, itemType } = this.props;
        this.state = {
            shadow: 1,
            editOpen: false,
            name: itemName,
            quantity: itemQuantity,
            url: imgUrl,
            price: itemPrice,
            onSale: onSale,
            salePercent: itemSalePercent,
            edited: false,
            type: itemType
        };

        this.hover = this.hover.bind(this);
        this.unHover = this.unHover.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.toggleOpen = this.toggleOpen.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSnackClose = this.handleSnackClose.bind(this);
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
        this.setState({editOpen: !this.state.editOpen});
    }

    handleChange(e) {
        switch (e.target.name) {
            case 'name': {
                this.setState({
                    name: e.target.value
                });
                break;
            }
            case 'price': {
                this.setState({
                    price: e.target.value
                });
                break;
            }
            case 'type': {
                this.setState({
                    type: e.target.value
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
        let { name, quantity, url, price, onSale, salePercent, type } = this.state;
        onSubmit(name, itemId, quantity, url, price, onSale, salePercent, type);
        this.setState({editOpen: !this.state.editOpen, edited: true});
    }

    handleSnackClose() {
        this.setState({edited: false});
    }

    render() {
        let { itemName, itemQuantity, imgUrl, itemPrice, itemSalePercent, itemType } = this.props;
        const { shadow, editOpen, edited, onSale, name, quantity, url, price, salePercent, type } = this.state;
        return (
            <Wrapper>
                <Dialog
                    title='Edit Item in Store'
                    modal={true}
                    open={editOpen}
                >
                    <ModalWrapper>
                        <form name='storeEdit' onSubmit={this.handleSubmit} onChange={this.handleChange}>
                            <TextField name='name' floatingLabelText='Item Name' hintText={itemName} value={name} />
                            <br />
                            <TextField name='type' floatingLabelText='Item Type' hintText='Type' value={type} />
                            <br />
                            <TextField name='url' floatingLabelText='Image Url' hintText={imgUrl} value={url}/>
                            <br />
                            <TextField name='price' type='number' floatingLabelText='Price' hintText={`$${itemPrice}`} value={price} />
                            <br />
                            <TextField name='quantity' type='number' floatingLabelText='Quantity' hintText={itemQuantity} value={quantity} />
                            <br />
                            <CustomToggle
                                name='sale'
                                label='On Sale'
                                toggled={onSale}
                            />
                            {onSale ?
                                <TextField name='salePercent' type='number' floatingLabelText='Percent Off' hintText={`${itemSalePercent}%`} value={salePercent} />
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
                    <Chip style={{margin: 'auto', marginBottom: '5px'}}>{itemType}</Chip>
                    <ItemImg src={imgUrl} />
                    <p>Price: {onSale ? <span><Strike>${itemPrice}</Strike> ${itemPrice - (itemPrice * (0.01 * itemSalePercent))}</span>
                    :
                    `$${itemPrice}`}
                    </p>
                    <p>Total Quantity: {itemQuantity}</p>
                    <p style={{color: '#c3c3c3'}}>{onSale ? `Sale: ${itemSalePercent}% off` : ''}</p>
                </CustomPaper>
                <Snackbar
                    open={edited}
                    message={`Successfully edited ${itemName}`}
                    autoHideDuration={4000}
                    onRequestClose={this.handleSnackClose}
                />
            </Wrapper>
        );
    }
}

export default connect(
    null,
    dispatch => {
        return {
            handleDelete: (itemId) => {
                dispatch(deleteSelectedStoreItem(itemId));
            },
            onSubmit: (name, id, quantity, url, price, onSale, salePercent, type) => {
                dispatch(updateStoreItem(name, id, quantity, url, price, onSale, salePercent, type));
            }
        };
    }
)(StoreItem);
