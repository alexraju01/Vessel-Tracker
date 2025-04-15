export const fetchData = async ({ url, method = "GET", data = null, headers = {} }) => {
  try {
    // Set default headers and add Content-Type for JSON
    const config = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    // If there's data, add it to the request body as a JSON string
    if (data) config.body = JSON.stringify(data);

    // Make the HTTP request
    const response = await fetch(url, config);

    // Get the content type from the response headers
    const contentType = response.headers.get("content-type");

    // If the response was not OK (status code not in 200–299)
    if (!response.ok) {
      let errorDetails;

      // Try to parse the error as JSON if possible
      if (contentType && contentType.includes("application/json")) {
        errorDetails = await response.json();
      } else {
        errorDetails = await response.text();
      }

      // Create a friendly error message
      const message = errorDetails?.message || JSON.stringify(errorDetails);
      throw new Error(`Error ${response.status}: ${message}`);
    }

    // If the response is JSON, return it, otherwise return null
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return null;
    }
  } catch (error) {
    // Log the error and rethrow it
    console.error("FetchData Error:", error.message);
    throw error;
  }
};
