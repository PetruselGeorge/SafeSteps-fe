import { authorizedFetch } from "../../Auth/AuthApi/api"; 


export const getTrailImages = async (trailId) => {
  const response = await authorizedFetch(`/trails/${trailId}/images`);
  if (!response.ok) {
    throw new Error("Failed to fetch trail images");
  }
  return await response.json();
};

export const fetchTrailImageAsBase64 = async (trailId, imageId) => {
  const response = await authorizedFetch(`/trails/${trailId}/images/${imageId}`);
  if (!response.ok) throw new Error("Failed to fetch image");

  const blob = await response.blob();

  return await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};