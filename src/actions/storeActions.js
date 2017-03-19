// Adds an item to the store (client-side)
export const addStoreItem = (itemName, itemId, itemQuantity, imgUrl, itemPrice, onSale, itemSalePercent) => {
    return {
        type: 'ADD_STORE_ITEM',
        itemName,
        itemId,
        itemQuantity,
        imgUrl,
        itemPrice,
        onSale,
        itemSalePercent
    };
};

// Deletes an item from the store (client-side)
export const deleteStoreItem = (itemId) => {
    return {
        type: 'DELETE_STORE_ITEM',
        itemId
    };
};
