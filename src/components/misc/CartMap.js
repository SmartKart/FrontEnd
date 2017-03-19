import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { GOOGLE_MAPS_KEY } from '../../utils/secrets.js';
import GoogleMap from 'google-map-react';
import { refreshLocations } from '../../actions/cartActions';
import Cart from './Cart';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';

const Wrapper = styled.div`
    text-align: center;
`;

const MapWrapper = styled.div`
    width: 600px;
    height: 600px;
    margin: auto;
`;

class CartMap extends Component {
    constructor(props) {
        super(props);
        // UBC: 49.262400, -123.245122
        this.state = {
            center: {lng: -123.245122, lat: 49.262400},
            zoom: 18,
            err: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSnackClose = this.handleSnackClose.bind(this);
    }

    componentDidMount() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((pos) => {
                this.state = {
                    center: {
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude
                    }
                };
            });
        }
    }

    handleChange(e) {
        this.setState({
            curCart: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { carts } = this.props;
        let cart = carts.filter((curCart) => {
            return curCart.id === this.state.curCart;
        });
        if (cart[0]) {
            cart = cart[0];
            this.setState({
                center: {
                    lat: cart.lat,
                    lng: cart.lng
                }
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

    render() {
        const { center, zoom, curCart, err } = this.state;
        const { carts } = this.props;
        return (
            <Wrapper>
                <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                    <TextField name='cartId' floatingLabelText='Search for Cart' hintText='Cart #' />
                    <FlatButton label='Submit' onClick={this.handleSubmit} primary={true}/>
                </form>
                <MapWrapper>
                    <GoogleMap
                        bootstrapURLKeys={{key: GOOGLE_MAPS_KEY}}
                        center={center}
                        zoom={zoom}
                    >
                        {carts.map((cart) => {
                            return <Cart
                                key={cart.id}
                                lat={cart.lat}
                                lng={cart.lng}
                            />;
                        })}
                    </GoogleMap>
                </MapWrapper>
                <Snackbar
                    open={err}
                    message={`CartId ${curCart} not found.`}
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
            carts: state.carts
        };
    },
    dispatch => {
        return {
            getLocations: () => {
                return dispatch(refreshLocations());
            }
        };
    }
)(CartMap);
