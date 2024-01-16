// let environment = import.meta.env.MODE

// const REPORTS_URL = environment == "development" ? import.meta.env.VITE_GRAPHQL_REPORTS_API_URL : process.env.VITE_GRAPHQL_REPORTS_API_URL;
const REPORTS_URL = "http://20.240.34.248/users/v1/reports"
// export const fetchReport = async (id) => {
//   try {
//     const response = await fetch(REPORTS_URL + id);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json();
//     return data; // Assuming the API returns an object with a "text" property
//   } catch (error) {
//     console.error("Fetching user failed", error);
//     return ""; // Return a default string in case of an error
//   }
// };

// export const fetchReports = async () => {
//   try {
//     const response = await fetch(REPORTS_URL);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json();
//     return data; // Assuming the API returns an object with a "text" property
//   } catch (error) {
//     console.error("Fetching user failed", error);
//     return ""; // Return a default string in case of an error
//   }
// };

export const fetchReport = async (id: number) => {
  const graphqlQuery = {
    query: `
      query getReport($id) {
        report(id: $id) {
          id
          accuracy
          startTime
          endTime
        }
      }
    `,
    variables: { id },
  };
  
  try {
    const response = await fetch(REPORTS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(graphqlQuery),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseBody = await response.json();
    if (responseBody.errors) {
      throw new Error(`GraphQL error: ${responseBody.errors.map(e => e.message).join(', ')}`);
    }

    return responseBody.data.report; // Assuming the response has a data field with a report object
  } catch (error) {
    console.error("Fetching report failed", error);
    return null; // Return null or an appropriate default value in case of an error
  }
};
  

export const fetchReports = async () => {
  const graphqlQuery = {
    query: `
      query getReport() {
        reports {
          id
          accuracy
          startTime
          endTime
        }
      }
    `,
  };
  
  try {
    const response = await fetch(REPORTS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(graphqlQuery),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseBody = await response.json();
    if (responseBody.errors) {
      throw new Error(`GraphQL error: ${responseBody.errors.map(e => e.message).join(', ')}`);
    }

    return responseBody.data.report; // Assuming the response has a data field with a report object
  } catch (error) {
    console.error("Fetching report failed", error);
    return null; // Return null or an appropriate default value in case of an error
  }
};

export const fetchReportsByUser = async (userId: number) => {
  const graphqlQuery = {
    query: `
      query($userId: Int!) {
        reportsByUser(userId: $userId) {
          id
          typingSessionId
          userId
          language
          wpm
          accuracy
          endTime
          length
        }
      }
  `,
    variables: { userId },
  };
  
  try {
    const response = await fetch(REPORTS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(graphqlQuery),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseBody = await response.json();
    if (responseBody.errors) {
      // throw new Error(`GraphQL error: ${responseBody.errors.map(e => e.message).join(', ')}`);
    }

    return responseBody.data; // Assuming the response has a data field with a report object
  } catch (error) {
    console.error("Fetching report failed", error);
    return null; // Return null or an appropriate default value in case of an error
  }

    
};