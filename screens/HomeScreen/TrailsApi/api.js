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

export async function fetchTrailImageAsBase64WithAuth(mainImageUrl) {
  const normalizedUrl = mainImageUrl.startsWith("/api")
    ? mainImageUrl.replace("/api", "")
    : mainImageUrl;

  try {
    const response = await authorizedFetch(normalizedUrl, {
      method: "GET",
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Image fetch failed. Status: ${response.status}`);
    }

    const blob = await response.blob();
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        console.log("Base64 image loaded:", reader.result?.slice(0, 100));
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (err) {
    console.error("[fetchTrailImageAsBase64WithAuth] Error:", err);
    return null;
  }
}

export async function searchTrailsWithFilters(
  name = "",
  maxDistance = "",
  difficulty = "",
  page = 0,
  size = 10
) {
  const params = new URLSearchParams();
  if (name !== "") params.append("name", name);
  if (maxDistance !== "") params.append("maxDistance", maxDistance);
  if (difficulty !== "") params.append("difficulty", difficulty);
  params.append("page", page);
  params.append("size", size);

  const url = `/trails/search-with-filters?${params.toString()}`;

  const response = await authorizedFetch(url, {
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
    const error = new Error(
      data?.message || "Failed to search trails with filters."
    );
    error.status = response.status;
    error.details = data;
    throw error;
  }

  return data;
}
