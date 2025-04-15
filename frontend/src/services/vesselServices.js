// services/vesselService.js
import { fetchData } from "@/utils/fetchData";

const baseUrl = "http://localhost:3000/api/vessels";

export const fetchVessels = async () => {
  try {
    const response = await fetchData({
      url: baseUrl,
      method: "GET",
    });
    return response?.data;
  } catch (error) {
    console.error("Failed to fetch vessels:", error.message);
    throw error;
  }
};

export const addVessel = async (vesselData) => {
  try {
    const savedMarker = await fetchData({
      url: baseUrl,
      method: "POST",
      data: vesselData,
    });

    return savedMarker;
  } catch (error) {
    console.error("Error adding vessel:", error.message);
    throw error;
  }
};

export const deleteVesselById = async (id) => {
  try {
    await fetchData({
      url: `${baseUrl}/${id}`,
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error deleting vessel:", error.message);
    throw error;
  }
};

export const updateVessel = async (id, vesselData) => {
  try {
    const response = await fetchData({
      url: `${baseUrl}/${id}`,
      method: "PATCH",
      data: vesselData,
    });

    return response?.data;
  } catch (error) {
    console.error("Error updating vessel:", error.message);
    throw error;
  }
};
