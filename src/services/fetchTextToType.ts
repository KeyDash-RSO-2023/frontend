const API_URL = "http://51.12.152.201/generator/get?punctuation=true";

// process.env.REACT_APP_BACKEND_URL || "http://localhost:8080/get";

export const fetchTextToType = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.textToType; // Assuming the API returns an object with a "text" property
  } catch (error) {
    console.error("Fetching text failed", error);
    return ""; // Return a default string in case of an error
  }
};
