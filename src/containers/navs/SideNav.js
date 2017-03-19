import React from 'react';
import { connect } from 'react-redux';
import SideNav from '../../components/navs/SideNav';

const SideNavContainer = props => <SideNav {...props} />;

const mapStateToProps = (store) => {
    return {
        currentStore: store.currentStore,
        stores: store.stores
    };
};

export default connect(
    mapStateToProps,
    null
)(SideNavContainer);
