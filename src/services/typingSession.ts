// const BASE_URL = "http://20.240.34.248/gameplay/v1/gameplay";

// const BASE_URL = import.meta.env.VITE_GAMEPLAY_URL

let environment = import.meta.env.MODE

const BASE_URL = environment == "development" ? import.meta.env.VITE_GAMEPLAY_URL : process.env.VITE_GAMEPLAY_URL;

console.log(process.env)

// process.env.REACT_APP_BACKEND_URL || "http://localhost:8080/get";

export const getTypingSessionRecords = async (typingSessionId: number) => {
  const response = await fetch(`${BASE_URL}/${typingSessionId}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const records = await response.json();
  return records;
};
export const getNewTypingSession = async (
  language: string,
  length: number,
  punctuation: boolean
) => {
  const wordsPerSecond = 5;

  try {
    const response = await fetch(
      `${BASE_URL}/new?language=${language}&length=${
        length * wordsPerSecond
      }&punctuation=${punctuation}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const typingSession = await response.json();
    return typingSession; // Assuming the API returns an object with a "text" property
  } catch (error) {
    console.error("Fetching text failed", error);
    return ""; // Return a default string in case of an error
  }
};

export const updateTypingSession = async (
  typingSessionId: number,
  wpm: number,
  accuracy: number,
  typedText: string
) => {
  const body = {
    currentWpm: wpm,
    accuracy: accuracy,
    typedText: typedText,
  };
  try {
    const response: Response = await fetch(
      `${BASE_URL}/update/${typingSessionId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    // Bad Request
    if (response.status === 400) {
      return false;
      throw new Error(`HTTP error! status: ${response.status}`);
    } else if (!response.ok) {
      return false;
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const endedSession = await response.json();
    return endedSession;
  } catch (error) {
    console.error("Error updating typing session", error);
    return null; // Return null or handle the error as appropriate
  }
};

export const endTypingSession = async (typingSessionId, typedText) => {
  let userId = JSON.parse(localStorage.getItem("session")).userId;
  try {
    const response = await fetch(`${BASE_URL}/end/${typingSessionId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({typedText: typedText, userId: userId}),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const endedSession = await response.json();
    return endedSession;
  } catch (error) {
    console.error("Error ending typing session", error);
    return null; // Return null or handle the error as appropriate
  }
};
