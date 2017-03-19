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
                    itemSalePercent: action.itemSalePercent,
                    itemType: action.itemType
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
                    itemSalePercent: action.itemSalePercent,
                    itemType: action.itemType
                },
                ...oldState
            ];
        }
        case 'RECEIVE_UPDATED_STORE': {
            return action.items.map((item) => {
                return {
                    itemId: item.id,
                    imgUrl: item.image,
                    onSale: item.isOnSale,
                    itemName: item.name,
                    itemSalePercent: item.percentOff,
                    itemPrice: item.price,
                    itemQuantity: item.quantity,
                    itemType: item.type
                };
            });
        }
        default:
            return state;
    }
};

export default storeReducer;
