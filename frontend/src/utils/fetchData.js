// utils/fetchData.js

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
