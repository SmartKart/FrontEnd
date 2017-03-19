export const addStoreItem = (itemName, itemId, itemQuantity) => {
    return {
        type: 'ADD_STORE_ITEM',
        itemName,
        itemId,
        itemQuantity
    };
};
