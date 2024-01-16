// const API_URL = "http://51.12.152.201/users/v1/users/";

// const USERS_URL = import.meta.env.VITE_USERS_API_URL

let environment = import.meta.env.MODE

// const USERS_URL = environment == "development" ? import.meta.env.VITE_USERS_API_URL : process.env.VITE_USERS_API_URL;

const USERS_URL = "http://20.240.34.248/users/v1/users/";

// process.env.REACT_APP_BACKEND_URL || "http://localhost:8080/get";

export const fetchUser = async (id) => {
  try {
    const response = await fetch(USERS_URL + id);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data; // Assuming the API returns an object with a "text" property
  } catch (error) {
    console.error("Fetching user failed", error);
    return ""; // Return a default string in case of an error
  }
};

export const fetchUsers = async () => {
  try {
    const response = await fetch(USERS_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data; // Assuming the API returns an object with a "text" property
  } catch (error) {
    console.error("Fetching user failed", error);
    return ""; // Return a default string in case of an error
  }
};
