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

    // Return parsed response JSON directly
    return await response.json(); // Ensure this is the correct structure from your API
  } catch (error) {
    console.error("Login failed:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};
