// src/api.js

export const login = async (credentials) => {
  try {
    const response = await fetch("http://localhost:8081/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials), // Send username and password as the request body
    });

    if (!response.ok) {
      throw new Error("Login failed: " + response.status);
    }

    return await response.json(); // Parse and return the response JSON
  } catch (error) {
    console.error("Login failed:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};
