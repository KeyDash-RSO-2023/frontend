const API_URL = "http://51.12.152.201/users/v1/users/";

// process.env.REACT_APP_BACKEND_URL || "http://localhost:8080/get";

export const fetchUser = async (id) => {
  try {
    const response = await fetch(API_URL + id);
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
