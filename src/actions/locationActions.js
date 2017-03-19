//----------------------------------------------------------------------------
// For React Router + Redux
//----------------------------------------------------------------------------

export const locationChange = (nextLocation) => {
    return {
        type: 'LOCATION_CHANGE',
        nextLocation
    };
};
