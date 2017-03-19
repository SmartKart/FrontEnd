const cartReducer = (state=[
    {
        id: 1,
        lng: -123.245122,
        lat: 49.262400
    }
], action) => {
    switch (action.type) {
        case 'GET_CART_LOCATION': {
            return state.carts.filter((cart) => {
                return cart.cartId === action.cartId;
            });
        }
        case 'RECEIVE_CART_LOCATIONS': {
            return [
                ...action.carts
            ];
        }
        default:
            return state;
    }
};

export default cartReducer;
