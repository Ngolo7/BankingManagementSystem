// src/api.js

// Example function for login API request
export const login = async (username, password) => {
  // Here you would call your backend API
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json(); // Return the response from your API
};
