import AsyncStorage from "@react-native-async-storage/async-storage";
import { Buffer } from "buffer";
import { API_URL } from "@env";
const BASE_URL = API_URL;

async function request(endpoint, method = "GET", body, needsAuth = true) {
  try {
    if (needsAuth) {
      const isValid = await validateOrRefreshToken();
      if (!isValid)
        throw new Error("Autentificare expirată. Te rugăm să te reconectezi.");
    }

    const accessToken = await AsyncStorage.getItem("accessToken");

    const options = {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    if (needsAuth && accessToken) {
      options.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (body) options.body = JSON.stringify(body);

    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    const contentType = response.headers.get("content-type") || "";
    let data;

    try {
      data = contentType.includes("application/json")
        ? await response.json()
        : await response.text();
    } catch (parseError) {
      console.error("[Auth] Error parsing server response:", parseError);
      throw new Error("Server error");
    }

    if (!response.ok) {
      const message = data?.message || data || "Server error";
      const error = new Error(message);
      error.status = response.status;
      error.details = data;
      throw error;
    }

    return data;
  } catch (error) {
    console.error("[Auth] Request Error:", error);
    throw error;
  }
}

export async function registerUser(payload) {
  await AsyncStorage.setItem("registered", "true");
  return request("/auth/register", "POST", payload, false);
}

export async function loginUser(payload) {
  try {
    console.log("[Auth] Sending Login Request...", payload);

    const response = await request("/auth/login", "POST", payload, false);
    console.log("[Auth] Raw Response:", response);

    if (!response.jwtToken || !response.refreshToken) {
      console.error("[Auth] Missing Tokens in Response:", response);
      throw new Error("Tokens not found in the login response.");
    }

    console.log("[Auth] Tokens Received:", response);

    await AsyncStorage.multiSet([
      ["accessToken", response.jwtToken],
      ["refreshToken", response.refreshToken],
      ["registered", "false"],
    ]);

    console.log("[Auth] Tokens Saved Successfully");
    return response;
  } catch (error) {
    console.error("[Auth] Login Error:", error);
    throw error;
  }
}

export async function refreshAccessToken() {
  try {
    const refreshToken = await AsyncStorage.getItem("refreshToken");

    if (
      !refreshToken ||
      refreshToken === "null" ||
      refreshToken === "undefined"
    ) {
      console.log("[Auth] No valid refresh token.");
      await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);
      return null;
    }

    console.log("[Auth] Attempting to refresh access token...");

    const response = await fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (response.status === 200) {
      const data = await response.json();

      if (data.jwtToken && data.refreshToken) {
        console.log("[Auth] Tokens refreshed successfully:", data);

        await AsyncStorage.multiSet([
          ["accessToken", data.jwtToken],
          ["refreshToken", data.refreshToken],
        ]);

        return data.jwtToken;
      }
    }

    console.warn("[Auth] Failed to refresh tokens. Logging out...");
    await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);
    return null;
  } catch (error) {
    console.error("[Auth] Error refreshing access token:", error);
    await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);
    return null;
  }
}

export async function validateOrRefreshToken() {
  try {
    let accessToken = await AsyncStorage.getItem("accessToken");

    console.log("[Token] Access Token from Storage:", accessToken);

    if (!accessToken || accessToken === "null" || accessToken === "undefined") {
      console.log("[Token] Invalid Access Token - Not Found or Null");
      await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);
      return false;
    }

    const tokenParts = accessToken.split(".");
    if (tokenParts.length !== 3) {
      console.log("[Token] Invalid Token Format");
      await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);
      return false;
    }

    const payload = JSON.parse(Buffer.from(tokenParts[1], "base64").toString());
    const now = Math.floor(Date.now() / 1000);

    if (payload.exp < now) {
      console.log("[Token] Token Expired Locally");

      const newAccessToken = await refreshAccessToken();
      if (!newAccessToken) {
        console.warn("[Token] Refresh failed. Clearing tokens...");
        await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);
        return false;
      }

      accessToken = newAccessToken;
    }

    console.log("[Token] Token Not Expired, Sending Validation Request...");

    const response = await fetch(`${BASE_URL}/auth/validate-token`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("[Token] Validate Response Status:", response.status);

    if (response.status === 200) {
      console.log("[Token] Access Token Valid");
      return true;
    }

    console.log("[Token] Invalid Token on Server");
    await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);
    return false;
  } catch (error) {
    console.error("[Token] Error validating or refreshing token:", error);
    await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);
    return false;
  }
}

export function checkEmailExists(email) {
  return request(
    `/auth/check-email?email=${encodeURIComponent(email)}`,
    "GET",
    null,
    false
  );
}

export async function authorizedFetch(url, fetchOptions = {}) {
  const isValid = await validateOrRefreshToken();
  if (!isValid) {
    throw new Error("Authentification expired. Please reconnect.");
  }

  const accessToken = await AsyncStorage.getItem("accessToken");

  const headers = {
    ...(fetchOptions.headers || {}),
    Authorization: `Bearer ${accessToken}`,
  };

  return fetch(`${BASE_URL}${url}`, {
    ...fetchOptions,
    headers,
  });
}
