import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { GOOGLE_MAPS_KEY } from '../../utils/secrets.js';
import GoogleMap from 'google-map-react';
import { refreshCartLocations, getCartData } from '../../actions/cartActions';
import Cart from './Cart';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';

const Wrapper = styled.div`
    text-align: center;
`;

const MapWrapper = styled.div`
    width: 800px;
    height: 600px;
    margin: auto;
`;

const ModalWrapper = styled.div`
`;

const ItemSpan = styled.span`
    display: inline-block;
    margin-right: 20px;
`;

class CartMap extends Component {
    constructor(props) {
        super(props);
        // UBC: 49.262400, -123.245122
        this.state = {
            center: {lng: -123.245122, lat: 49.262400},
            zoom: 18,
            err: false,
            isOpen: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSnackClose = this.handleSnackClose.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((pos) => {
                this.state = {
                    center: {
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude
                    },
                    zoom: 18,
                    err: false,
                    isOpen: false,
                    cartId: null
                };
            });
        }
    }

    handleChange(e) {
        this.setState({
            cartId: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { carts } = this.props;
        const { cartId } = this.state;
        let cart = carts.filter((cCart) => {
            return parseFloat(cCart.id) === parseFloat(cartId);
        });
        if (cart[0]) {
            cart = cart[0];
            this.setState({
                center: {
                    lat: parseFloat(cart.lat),
                    lng: parseFloat(cart.lng)
                },
                isOpen: true
            });
        } else {
            this.setState({
                err: true
            });
        }
    }

    handleSnackClose() {
        this.setState({
            err: false
        });
    }

    handleRefresh() {
        const { getCartLocations } = this.props;
        getCartLocations();
    }

    handleToggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    closeModal() {
        this.setState({
            isOpen: false
        });
    }

    render() {
        const { center, zoom, cartId, err, isOpen } = this.state;
        let { carts, cartData } = this.props;

        return (
            <Wrapper>
                <Dialog
                    title='Cart Items'
                    modal={true}
                    open={isOpen}
                >
                    <ModalWrapper>
                        <ul>
                            {cartData.map((item) => {
                                return (
                                    <li key={item.id}>
                                        <ItemSpan>{item.name}</ItemSpan>
                                        <ItemSpan>${item.price}</ItemSpan>
                                        <ItemSpan>Total: {item.quantity}</ItemSpan>
                                    </li>
                                );
                            })}
                        </ul>
                    <FlatButton
                        label='Cancel'
                        secondary={true}
                        onTouchTap={this.closeModal}
                    />
                    </ModalWrapper>
                </Dialog>
                <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                    <TextField name='cartId' floatingLabelText='Search for Cart' hintText='Cart #' />
                    <FlatButton label='Submit' onClick={this.handleSubmit} primary={true}/>
                    <FlatButton label='Refresh' onClick={this.handleRefresh} />
                </form>
                <MapWrapper>
                    <GoogleMap
                        bootstrapURLKeys={{key: GOOGLE_MAPS_KEY}}
                        center={center}
                        zoom={zoom}
                        onChildClick={this.handleToggle}
                    >
                        {carts.map((cart) => {
                            return <Cart
                                key={cart.id}
                                lat={parseFloat(cart.lat)}
                                lng={parseFloat(cart.lng)}
                            />;
                        })}
                    </GoogleMap>
                </MapWrapper>
                <Snackbar
                    open={err}
                    message={`CartId #${cartId} not found.`}
                    autoHideDuration={4000}
                    onRequestClose={this.handleSnackClose}
                />
            </Wrapper>
        );
    }
}

export default connect(
    state => {
        return {
            carts: state.carts,
            cartData: state.cartData
        };
    },
    dispatch => {
        return {
            getCartLocations: () => {
                dispatch(refreshCartLocations());
                dispatch(getCartData());
            }
        };
    }
)(CartMap);
