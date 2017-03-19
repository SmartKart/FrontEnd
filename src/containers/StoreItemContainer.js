import { connect } from 'react-redux';
import StoreItemList from '../components/lists/StoreItemList';

const mapStateToProps = (state) => {
    return {
        items: state.items
    };
};

export default connect(
    mapStateToProps,
    null
)(StoreItemList);
