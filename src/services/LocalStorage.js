
export const getItem = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (e) {
        return null;
    }
};

export const setItem = (key, item) => {
    localStorage.setItem(key, JSON.stringify(item));
};