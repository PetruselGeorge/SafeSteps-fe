import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
const BASE_URL = API_URL;

async function request(endpoint, method = "GET", body) {
  try {
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

export async function uploadTrailGpx(fileUri, fileName = "trail.gpx") {
  try {
    const token = await AsyncStorage.getItem("accessToken");

    if (!token || token === "null" || token === "undefined") {
      throw new Error("Missing access token.");
    }

    const formData = new FormData();
    formData.append("file", {
      uri: fileUri,
      type: "application/gpx+xml",
      name: fileName,
    });

    const response = await fetch(`${BASE_URL}/trails/upload`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const contentType = response.headers.get("content-type") || "";

    const data = contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      const error = new Error(data?.message || "Upload failed.");
      error.status = response.status;
      error.details = data;
      throw error;
    }

    return data;
  } catch (error) {
    console.error("[TrailUpload] Error:", error);
    throw error;
  }
}

