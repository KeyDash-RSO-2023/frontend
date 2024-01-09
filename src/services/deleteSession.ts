const USERS_URL = import.meta.env.VITE_USERS_API_URL

export const deleteSession = async (id) => {

    try {
        const response = await fetch(USERS_URL + "sessions/" + id, {
            method: 'DELETE'
        });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
        return data;
    } catch (error) {
        console.error("Delete failed", error);
        return "";
    }
};