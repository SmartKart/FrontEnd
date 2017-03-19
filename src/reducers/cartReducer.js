const cartReducer = (state=[], action) => {
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
