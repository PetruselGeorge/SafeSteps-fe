import { API_URL } from "@env";
import { authorizedFetch } from "../../Auth/AuthApi/api";

const BASE_URL = API_URL;

export async function uploadTrailGpx(fileUri, fileName = "trail.gpx") {
  try {
    const formData = new FormData();
    formData.append("file", {
      uri: fileUri,
      type: "application/gpx+xml",
      name: fileName,
    });

    const response = await authorizedFetch("/trails/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
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

export async function getAllTrails(page = 0) {
  const response = await authorizedFetch(`/trails?page=${page}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const error = new Error(data?.message || "Failed to fetch trails.");
    error.status = response.status;
    error.details = data;
    throw error;
  }

  return data;
}

export async function updateTrailMainImage(
  trailId,
  imageUri,
  fileName = "main-image.jpg"
) {
  try {
    const formData = new FormData();
    formData.append("file", {
      uri: imageUri,
      type: "image/*",
      name: fileName,
    });

    const response = await authorizedFetch(`/trails/${trailId}/main-image`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    const contentType = response.headers.get("content-type") || "";

    const data = contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      const error = new Error(data?.message || "Failed to update trail image.");
      error.status = response.status;
      error.details = data;
      throw error;
    }

    return data;
  } catch (error) {
    console.error("[TrailAPI] Error updating trail image:", error);
    throw error;
  }
}
