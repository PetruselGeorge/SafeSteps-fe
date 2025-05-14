const BASE_URL = "http://192.168.1.15:8080/api";

async function request(endpoint, method = "GET", body) {
  const options = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  if (body) options.body = JSON.stringify(body);

  const response = await fetch(`${BASE_URL}${endpoint}`, options);

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message = data?.message || data || "Server error";
    const error = new Error(message);
    error.status = response.status;
    error.details = data;
    throw error;
  }

  return data;
}

export function registerUser(payload) {
  return request("/auth/register", "POST", payload);
}

export function loginUser(payload) {
  return request("/auth/login", "POST", payload);
}

export function checkEmailExists(email) {
  return request(`/auth/check-email?email=${encodeURIComponent(email)}`, "GET");
}
