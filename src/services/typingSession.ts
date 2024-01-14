const BASE_URL = "http://20.240.34.248/gameplay/v1/gameplay";

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
  try {
    const response = await fetch(
      `${BASE_URL}/new?language=${language}&length=${length}&punctuation=${punctuation}`
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
  accuracy: number
) => {
  const body = {
    currentWpm: wpm,
    accuracy: accuracy,
  };
  try {
    const response = await fetch(`${BASE_URL}/update/${typingSessionId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
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
  try {
    const response = await fetch(`${BASE_URL}/end/${typingSessionId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(typedText),
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
