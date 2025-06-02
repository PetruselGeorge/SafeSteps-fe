import { authorizedFetch } from "../../Auth/AuthApi/api";

export const getTrailCoordinates = async (trailId) => {
  const response = await authorizedFetch(`/trails/${trailId}/coordinates`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch trail coordinates");
  }

  return await response.json();
};