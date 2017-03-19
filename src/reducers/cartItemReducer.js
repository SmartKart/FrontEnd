const cartItemReducer = (state=[], action) => {
    switch (action.type) {
        case 'RECEIVE_CART_DATA': {
            return [
                ...action.cartData
            ];
        }
        default:
            return state;
    }
};

export default cartItemReducer;
