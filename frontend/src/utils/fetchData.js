// utils/fetchData.js

/**
 * Fetches data from a given URL using the Fetch API.
 *
 * @async
 * @function fetchData
 * @param {string} url - The endpoint to send the request to.
 * @param {string} method - The HTTP method to use (e.g., "GET", "POST", "PUT", "DELETE").
 * @param {Object|null} data - The request payload for methods like POST or PUT.
 * @param {Object} headers - Additional headers to include in the request.
 */
export const fetchData = async ({
  url,
  method = "GET",
  data = null,
  headers = {},
  customErrorHandler = null,
}) => {
  try {
    const config = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      ...(data && { body: JSON.stringify(data) }),
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      let errorDetails = "";
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const errorJson = await response.json();
        errorDetails = errorJson?.message || JSON.stringify(errorJson);
      } else {
        errorDetails = await response.text();
      }

      const errorMessage = `Error ${response.status}: ${errorDetails}`;

      if (customErrorHandler) {
        customErrorHandler(errorMessage, response);
      }

      throw new Error(errorMessage);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }

    return null;
  } catch (error) {
    console.error("FetchData Error:", error.message);

    if (customErrorHandler) {
      customErrorHandler(error.message, null);
    }

    throw error;
  }
};
