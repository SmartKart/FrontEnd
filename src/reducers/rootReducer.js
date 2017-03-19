import { combineReducers } from 'redux';
import storeReducer from './storeReducer';
import cartReducer from './cartReducer';
import cartItemReducer from './cartItemReducer';

const rootReducer = combineReducers({
    items: storeReducer,
    carts: cartReducer,
    cartData: cartItemReducer
});

export default rootReducer;
