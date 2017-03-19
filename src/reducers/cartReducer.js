const cartReducer = (state=[
    {
        id: 0,
        lng: -123.245122,
        lat: 49.262400
    }
], action) => {
    switch (action.type) {
        case 'GET_CART_LOCATION':
            return state.carts.filter((cart) => {
                return cart.cartId === action.cartId;
            });
        default:
            return state;
    }
};

export default cartReducer;
