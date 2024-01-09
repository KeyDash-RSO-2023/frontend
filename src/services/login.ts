// const API_URL = "http://51.12.152.201/users/v1/users/";
// process.env.REACT_APP_BACKEND_URL || "http://localhost:8080/get";

const USERS_URL = import.meta.env.VITE_USERS_API_URL

export const login = async (requestData) => {

    try {
        const response = await fetch(USERS_URL + "login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
        return data;
    } catch (error) {
        console.error("Login failed", error);
        return "";
    }
};

export const register = async (requestData) => {

    try {
        const response = await fetch(USERS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
        return data;
    } catch (error) {
        console.error("Register failed", error);
        return "";
    }
};
