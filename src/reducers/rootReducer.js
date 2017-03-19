import { combineReducers } from 'redux';
import storeReducer from './storeReducer';

const rootReducer = combineReducers({
    items: storeReducer
});

export default rootReducer;
