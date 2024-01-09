const USERS_URL = import.meta.env.VITE_USERS_API_URL

export const checkSession = async (requestData) => {

    try {
        const response = await fetch(USERS_URL + "session", {
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