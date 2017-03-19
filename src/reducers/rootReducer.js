import { combineReducers } from 'redux';
import storeReducer from './storeReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
    items: storeReducer,
    carts: cartReducer
});

export default rootReducer;
