const locationReducer = (state=window.location, action) => {
    switch (action.type) {
        case 'LOCATION_CHANGE':
            return {
                location: action.nextLocation
            };
        default:
            return state;
    }
};

export default locationReducer;
