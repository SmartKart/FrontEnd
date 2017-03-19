// Allows for polyfill
import 'babel-polyfill';
// Main React dependencies
import React from 'react';
import ReactDOM from 'react-dom';
// Material shit
import injectTapEventPlugin from 'react-tap-event-plugin';
// Redux shit
import { Provider } from 'react-redux';
import  { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers/rootReducer';
// Styles
import { injectGlobal } from 'styled-components';
// React Router shit
import { Router, browserHistory } from 'react-router';
import routes from './routes';
// Local Storage
import { loadState, saveState } from './utils/localStorage';
// Other
import throttle from 'lodash/throttle';

//----------------------------------------------------------------------------
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
//----------------------------------------------------------------------------
injectTapEventPlugin();

//----------------------------------------------------------------------------
// Global Styles
//----------------------------------------------------------------------------
injectGlobal`
    @import url('https://fonts.googleapis.com/css?family=Roboto');
    html {
        font-family: 'Roboto', 'Helvetica', sans-serif;
        height: 100vh;
    }

    body, #root {
        padding: 0;
        margin: 0;
        height: 100%;
    }
`;

//----------------------------------------------------------------------------
// Load in cached data from localStorage
//----------------------------------------------------------------------------
const persistedState = loadState();

//----------------------------------------------------------------------------
// Initiate store
//----------------------------------------------------------------------------
const loggerMiddleware = createLogger();
const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(
        thunkMiddleware, // Allows us to dispatch() in actions
        loggerMiddleware // Logs actions for easy debugging (use in dev-mode only)
    )
);

console.log(store.getState());

//----------------------------------------------------------------------------
// Cache data here!
// Listens for any changes and saves them to localStorage for faster app loads
// Throttle ensures that we don't write to localStorage more than 1/sec
//----------------------------------------------------------------------------
store.subscribe(throttle(() => {
    saveState({
        items: store.getState().items
    });
}, 2000));

//----------------------------------------------------------------------------
// Rendered out to DOM
//----------------------------------------------------------------------------
ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('root')
);
