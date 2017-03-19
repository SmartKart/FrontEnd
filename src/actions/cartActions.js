import fetch from 'isomorphic-fetch';
import API_URL from '../utils/config';

export const receiveCartLocations = (carts) => {
    return {
        type: 'RECEIVE_CART_LOCATIONS',
        carts
    };
};

export const receiveCartData = (cartData) => {
    return {
        type:'RECEIVE_CART_DATA',
        cartData
    };
};

// Asynchronously retreive all registered cart locations
export const refreshCartLocations = () => {
    return (dispatch) => {
        return fetch(`${API_URL}/carts`, {
            method: 'GET',
            mode: 'cors'
        })

        .then(res => res.json())

        .then((res) => {
            dispatch(receiveCartLocations(res));
        })

        .catch(err => console.error(err));
    };
};

// Asynchronously retreive all registered cart locations
// (Should take cartId, but not built into API)
export const getCartData = () => {
    return (dispatch) => {
        return fetch(`${API_URL}/cartItems`, {
            method: 'GET',
            mode: 'cors'
        })

        .then(res => res.json())

        .then((res) => {
            dispatch(receiveCartData(res));
        })

        .catch(err => console.error(err));
    };
};
