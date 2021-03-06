/*
    Lol. So long...
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import StoreItemContainer from '../../containers/StoreItemContainer';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import { addNewItemToStore, getAllStoreItems } from '../../actions/storeActions';

const PageWrapper = styled.div`
    padding: 0 2rem;
    text-align: center;
    overflow-y: scroll;
    padding-bottom: 40px;
`;

const PageTitle = styled.h1`
    text-align: center;
    display: inline-block;
`;

const ModalWrapper = styled.div`
    text-align: center;
`;

const Warning = styled.p`
    text-align: center;

    & > a {
        cursor: pointer;
        color: blue;
    }
`;

const CustomToggle = styled(Toggle)`
    text-align: center;

    & label {
        width: initial;
    }
`;

const HeaderWrapper = styled.div`
    text-align: center;
`;

const CustomFAB = styled(FloatingActionButton)`
    float: right;
    margin-top: 1em;
    margin-right: 2em;
`;

const ButtonWrapper = styled.div`
    float: right;
    display: inline-block;
`;

class StorePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            name: '',
            url: '',
            id: null,
            quantity: null,
            price: null,
            onSale: false,
            type: '',
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
    }

    toggleModal() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    closeModal() {
        this.setState({
            isOpen: false
        });
    }

    handleChange(e) {
        switch (e.target.name) {
            case 'name': {
                this.setState({
                    name: e.target.value
                });
                break;
            }
            case 'id': {
                this.setState({
                    id: e.target.value
                });
                break;
            }
            case 'price' :{
                this.setState({
                    price: e.target.value
                });
                break;
            }
            case 'type' :{
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
        const { onSubmit } = this.props;
        const { name, id, quantity, url, price, onSale, salePercent, type } = this.state;
        onSubmit(name, id, quantity, url, price, onSale, salePercent, type);
    }

    handleRefresh() {
        const { onRefresh } = this.props;
        onRefresh();
    }

    render() {
        const { isOpen, name, id, quantity, price, onSale, type } = this.state;
        const { items } = this.props;
        return (
            <MuiThemeProvider>
                <div>
                    <Dialog
                        title='Add Item to Store'
                        modal={true}
                        open={isOpen}
                    >
                        <ModalWrapper>
                            <form name='storeAdd' onSubmit={this.handleSubmit} onChange={this.handleChange}>
                                <TextField name='name' floatingLabelText='Item Name' hintText='Name' />
                                <br />
                                <TextField name='url' floatingLabelText='Image Url' hintText='Url' />
                                <br />
                                <TextField name='type' floatingLabelText='Item Type' hintText='Type' />
                                <br />
                                <TextField name='id' type='number' floatingLabelText='Item ID' hintText='#' />
                                <br />
                                <TextField name='price' type='number' floatingLabelText='Price' hintText='$' />
                                <br />
                                <TextField name='quantity' type='number' floatingLabelText='Quantity' hintText='#' />
                                <br />
                                <CustomToggle
                                    name='sale'
                                    label='On Sale'
                                />
                                {onSale ?
                                    <TextField name='salePercent' type='number' floatingLabelText='Percent Off' hintText='%' />
                                    :
                                    ''
                                }
                                <br />
                                    <FlatButton
                                        label='Cancel'
                                        secondary={true}
                                        onTouchTap={this.closeModal}
                                    />
                                    <FlatButton
                                        label='Submit'
                                        type='submit'
                                        primary={true}
                                        disabled={!name || !id || !quantity || !price || !type}
                                        onTouchTap={this.toggleModal}
                                    />
                            </form>
                        </ModalWrapper>
                    </Dialog>
                    <PageWrapper>
                        <HeaderWrapper>
                            <PageTitle>Current Store Items</PageTitle>
                            <ButtonWrapper>
                                <CustomFAB
                                    onClick={this.toggleModal}
                                    mini={true}
                                    backgroundColor='green'
                                >
                                    <ContentAdd />
                                </CustomFAB>
                                <FlatButton
                                    onClick={this.handleRefresh}
                                    label='Refresh'
                                    style={{marginTop: '1em'}}
                                />
                            </ButtonWrapper>
                        </HeaderWrapper>
                        {items.length
                            ?
                            <StoreItemContainer />
                            :
                            <Warning>No items in store. Click <a onClick={this.toggleModal}>here</a> to add some.</Warning>
                        }
                    </PageWrapper>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default connect(
    state => {
        return {items: state.items};
    },
    dispatch => {
        return {
            onSubmit: (name, id, quantity, url, price, onSale, salePercent, type) => {
                dispatch(addNewItemToStore(name, id, quantity, url, price, onSale, salePercent, type));
            },
            onRefresh: () => {
                dispatch(getAllStoreItems());
            }
        };
    })(StorePage);
