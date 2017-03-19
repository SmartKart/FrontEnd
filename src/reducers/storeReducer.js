const storeReducer = (state=[], action) => {
    switch (action.type) {
        case 'ADD_STORE_ITEM': {
            return [
                {
                    itemName: action.itemName,
                    itemId: action.itemId,
                    itemQuantity: action.itemQuantity,
                    imgUrl: action.imgUrl,
                    itemPrice: action.itemPrice,
                    onSale: action.onSale,
                    itemSalePercent: action.itemSalePercent
                },
                ...state
            ];
        }
        case 'DELETE_STORE_ITEM': {
            return state.filter((item) => {
                return item.itemId !== action.itemId;
            });
        }
        case 'EDIT_STORE_ITEM': {
            const oldState = state.filter((item) => {
                return item.itemId !== action.itemId;
            });
            return [
                {
                    itemName: action.itemName,
                    itemId: action.itemId,
                    itemQuantity: action.itemQuantity,
                    imgUrl: action.imgUrl,
                    itemPrice: action.itemPrice,
                    onSale: action.onSale,
                    itemSalePercent: action.itemSalePercent
                },
                ...oldState
            ];
        }
        default:
            return state;
    }
};

export default storeReducer;
