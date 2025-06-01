import { authorizedFetch } from "../../Auth/AuthApi/api";

export const getTrailImages = async (trailId) => {
  const response = await authorizedFetch(`/trails/${trailId}/images`);
  if (!response.ok) {
    throw new Error("Failed to fetch trail images");
  }
  return await response.json();
};

export const fetchTrailImageAsBase64 = async (trailId, imageId) => {
  const response = await authorizedFetch(
    `/trails/${trailId}/images/${imageId}`
  );
  if (!response.ok) throw new Error("Failed to fetch image");

  const blob = await response.blob();

  return await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};

export const uploadTrailImage = async (trailId, formData) => {
  const response = await authorizedFetch(`/trails/${trailId}/images`, {
    method: "POST",
    body: formData, 
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  return response;
};

export const deleteTrailImage = async (trailId, imageId) => {
  const response = await authorizedFetch(`/trails/${trailId}/images/${imageId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete image");
  }
};

export const getWeatherForecastByTrail = async (trailId) => {
  const response = await authorizedFetch(`/weather/forecast/by-trail/${trailId}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch weather forecast");
  }

  return await response.json();
};