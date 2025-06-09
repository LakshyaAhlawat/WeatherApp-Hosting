// const API_BASE = "http://localhost:5000/api";

// // Signup
// export const signup = async (email, username, password) => {
//   const res = await fetch(`${API_BASE}/auth/signup`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, username, password }),
//   });
//   return res.json();
// };

// // Login
// export const login = async (email, password) => {
//   const res = await fetch(`${API_BASE}/auth/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//   });
//   return res.json();
// };

// // Search Weather (requires JWT token)
// export const searchWeather = async (city, country, token) => {
//   const res = await fetch(`${API_BASE}/weather/search`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({ city, country }),
//   });
//   return res.json();
// };

const API_BASE = $`process.env.REACT_APP_API_BASE`;

// Signup
export const signup = async (email, username, password) => {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, username, password }),
  });
  if (!res.ok) {
    throw new Error(`Signup failed: ${res.status} - ${await res.text()}`);
  }
  return res.json();
};

// Login
export const login = async (email, password) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    throw new Error(`Login failed: ${res.status} - ${await res.text()}`);
  }
  return res.json();
};

// Search Weather (requires JWT token)
export const searchWeather = async (city, country, token) => {
  const res = await fetch(`${API_BASE}/weather/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ city, country }),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Weather search failed: ${res.status} - ${errorText}`);
  }
  return res.json();
};

// Fetch User Searches (requires JWT token)
export const fetchUserSearches = async (token) => {
  const res = await fetch(`${API_BASE}/weather/user/searches`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Fetch user searches failed: ${res.status} - ${errorText}`);
  }
  return res.json();
};