// Loads the state from localStorage
export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('smart-kart-state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    }
    catch (err) {
        console.error(err);
    }
};

// Saves the state to localStorage
export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('smart-kart-state', serializedState);
    }
    catch (err) {
        console.error(err);
    }
};

// Deletes the localStorage store, logging user out
export const clearState = () => {
    try {
        localStorage.removeItem('smart-kart-state');
        const serializedState = localStorage.getItem('smart-kart-state');
        return serializedState === undefined;
    }
    catch (err) {
        console.error(err);
    }
};
