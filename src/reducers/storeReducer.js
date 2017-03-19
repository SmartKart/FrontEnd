const storeReducer = (state=[], action) => {
    switch (action.type) {
        case 'ADD_STORE_ITEM':
            return [
                {
                    itemName: action.itemName,
                    itemId: action.itemId,
                    itemQuantity: action.itemQuantity
                },
                ...state
            ];
        default:
            return state;
    }
};

export default storeReducer;
