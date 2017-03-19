import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import Add from 'material-ui/svg-icons/content/add';
import StoreItemContainer from '../../containers/StoreItemContainer';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { ifProp } from 'styled-tools';
import { addStoreItem } from '../../actions/storeActions';

const PageWrapper = styled.div`
    padding: 0 2rem;

    ${ifProp('isOpen', css`
        z-index: -1;
    `)}
`;

const PageTitle = styled.h1`
    text-align: center;
`;

const ModalWrapper = styled.div`
    text-align: center;
`;

class StorePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            name: '',
            id: null,
            quantity: null
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            case 'quantity': {
                this.setState({
                    quantity: e.target.value
                });
                break;
            }
            default:
                console.log('What??');
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { onSubmit } = this.props;
        const { name, id, quantity } = this.state;
        onSubmit(name, id, quantity);
        this.setState({
            isOpen: false,
            name: '',
            id: null,
            quantity: null
        });
    }

    render() {
        const { isOpen, name, id, quantity } = this.state;
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
                                <TextField name='id' type='number' floatingLabelText='Item ID' hintText='ID' />
                                <br />
                                <TextField name='quantity' type='number' floatingLabelText='Quantity' hintText='#' />
                                <br />
                                    <FlatButton
                                        label='Cancel'
                                        primary={true}
                                        onTouchTap={this.closeModal}
                                    />
                                    <FlatButton
                                        label='Submit'
                                        type='submit'
                                        primary={true}
                                        disabled={!name || !id || !quantity}
                                        onTouchTap={this.toggleModal}
                                    />
                            </form>
                        </ModalWrapper>
                    </Dialog>
                    <IconButton onClick={this.toggleModal}><Add /></IconButton>
                    <PageWrapper isOpen={isOpen}>
                        <PageTitle>Current Store Items</PageTitle>
                        <StoreItemContainer />
                    </PageWrapper>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default connect(
    null,
    dispatch => {
        return {
            onSubmit: (name, id, quantity) => {
                dispatch(addStoreItem(name, id, quantity));
            }
        };
    })(StorePage);
