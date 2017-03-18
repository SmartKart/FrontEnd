// Allows for polyfill
import 'babel-polyfill';
// Main React dependencies
import React from 'react';
import ReactDOM from 'react-dom';
// Material shit
import injectTapEventPlugin from 'react-tap-event-plugin';
// Redux Shit
import { Provider } from 'react-redux';
import  { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers/rootReducer';
// import routes from './routes';
// Local Storage
// import { loadState, saveState } from './utils/localStorage';
// Other
// import throttle from 'lodash/throttle';
import App from './components/pages/App';

//----------------------------------------------------------------------------
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
//----------------------------------------------------------------------------
injectTapEventPlugin();

//----------------------------------------------------------------------------
// Load in cached data from localStorage
//----------------------------------------------------------------------------
// const persistedState = loadState();

//----------------------------------------------------------------------------
// Initiate store
//----------------------------------------------------------------------------
const loggerMiddleware = createLogger();
const store = createStore(
    rootReducer,
    // persistedState,
    applyMiddleware(
        thunkMiddleware, // Allows us to dispatch() in actions
        loggerMiddleware // Logs actions for easy debugging (use in dev-mode only)
    )
);

// console.log(store.getState());

//----------------------------------------------------------------------------
// Cache data here!
// Listens for any changes and saves them to localStorage for faster app loads
// Throttle ensures that we don't write to localStorage more than 1/sec
//----------------------------------------------------------------------------
// store.subscribe(throttle(() => {
//     saveState({
//     });
// }, 2000));

//----------------------------------------------------------------------------
// Rendered out to DOM
//----------------------------------------------------------------------------
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);