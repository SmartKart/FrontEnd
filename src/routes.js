import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './components/pages/App';
import StorePage from './components/pages/StorePage';
import CartsPage from './components/pages/CartsPage';
import NoMatch from './components/pages/NoMatch';

export default (
    <Route path='/' component={App}>
        <IndexRoute component={StorePage} />
        <Route path='/carts' component={CartsPage} />
        <Route path='*' component={NoMatch} />
    </Route>
);
