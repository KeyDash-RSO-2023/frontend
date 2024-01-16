

// if (import.meta.env.MODE === "development") {
//   import.meta.env.VITE_USERS_API_URL = "http://localhost:5000/users/v1/users/";
// } else {
//   import.meta.env.VITE_USERS_API_URL = "http://
// }

// const USERS_URL = import.meta.env.VITE_USERS_API_URL

let environment = import.meta.env.MODE

const USERS_URL = environment == "development" ? import.meta.env.VITE_USERS_API_URL : process.env.VITE_USERS_API_URL;

// const USERS_URL = "http://20.240.34.248/users/v1/users/";

export const checkSession = async (requestData) => {
  try {
    const response = await fetch(USERS_URL + "session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
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
