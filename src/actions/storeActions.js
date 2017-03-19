import fetch from 'isomorphic-fetch';
import API_URL from '../utils/config';

// Adds an item to the store (client-side)
// export const addStoreItem = (itemName, itemId, itemQuantity, imgUrl, itemPrice, onSale, itemSalePercent, itemType) => {
//     return {
//         type: 'ADD_STORE_ITEM',
//         itemName,
//         itemId,
//         itemQuantity,
//         imgUrl,
//         itemPrice,
//         onSale,
//         itemSalePercent,
//         itemType
//     };
// };

// Deletes an item from the store (client-side)
export const deleteStoreItem = (itemId) => {
    return {
        type: 'DELETE_STORE_ITEM',
        itemId
    };
};

// Edits an item that is in the store
// export const editStoreItem = (itemName, itemId, itemQuantity, imgUrl, itemPrice, onSale, itemSalePercent, itemType) => {
//     return {
//         type: 'EDIT_STORE_ITEM',
//         itemName,
//         itemId,
//         itemQuantity,
//         imgUrl,
//         itemPrice,
//         onSale,
//         itemSalePercent,
//         itemType
//     };
// };

export const receiveUpdatedStore = (items) => {
    return {
        type: 'RECEIVE_UPDATED_STORE',
        items
    };
};

// Asynchronously adds a new item to the store
export const addNewItemToStore = (itemName, itemId, itemQuantity, imgUrl, itemPrice, onSale, itemSalePercent, itemType) => {
    return (dispatch) => {
        return fetch(`${API_URL}/store`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify({
                name: itemName,
                id: itemId,
                quantity: itemQuantity,
                image: imgUrl,
                price: itemPrice,
                isOnSale: onSale,
                percentOff: itemSalePercent,
                type: itemType
            }),
            mode: 'cors'
        })

        .then(res => res.json())

        .then((res) => {
            dispatch(receiveUpdatedStore(res));
        })

        .catch((e) => console.error(e));
    };
};

// Asynchronously retreives all store items
export const getAllStoreItems = () => {
    return (dispatch) => {
        return fetch(`${API_URL}/store`, {
            method: 'GET',
            mode: 'cors'
        })

        .then(res => res.json())

        .then((res) => {
            dispatch((receiveUpdatedStore(res)));
        })

        .catch(err => console.error(err));
    };
};

// Asynchronously updates an item in the store
export const updateStoreItem = (itemName, itemId, itemQuantity, imgUrl, itemPrice, onSale, itemSalePercent, itemType) => {
    return (dispatch) => {
        return fetch(`${API_URL}/store/${itemId}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: itemName,
                quantity: itemQuantity,
                image: imgUrl,
                price: itemPrice,
                isOnSale: onSale,
                percentOff: itemSalePercent,
                type: itemType
            }),
            mode: 'cors'
        })

        .then(res => res.json())

        .then((res) => {
            dispatch((receiveUpdatedStore(res)));
        })

        .catch(err => console.error(err));
    };
};

// Asynchronously deletes an item from the store
export const deleteSelectedStoreItem = (itemId) => {
    return (dispatch) => {
        return fetch(`${API_URL}/store/${itemId}`, {
            method: 'DELETE',
            mode: 'cors'
        })

        .then(res => res.json())

        .then((res) => {
            dispatch((receiveUpdatedStore(res)));
        })

        .catch(err => console.error(err));
    };
};
