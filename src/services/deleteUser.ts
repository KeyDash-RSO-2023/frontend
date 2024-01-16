const USERS_URL = import.meta.env.VITE_USERS_API_URL
// const USERS_URL = "http://20.240.34.248/users/v1/users/";

export const deleteUser = async (id) => {
  try {
    const response = await fetch(USERS_URL + id, {
      method: "DELETE",
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
