// services/vesselService.js
import { fetchData } from "@/utils/fetchData";

const baseUrl = "http://localhost:3000/api/vessels";

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
