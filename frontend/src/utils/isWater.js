export const isWater = async (lat, lng) => {
  const apiKey = "AIzaSyCRw65xRwgahOdl_hucX-urs8596WO2Idk";
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    console.log("Geocode response:", data);

    if (!data.results || data.results.length === 0) {
      console.log("No results, assuming it's water.");
      return true;
    }

    const locationTypes = data.results.flatMap((result) => result.types || []);

    console.log("Location types:", locationTypes);

    const isWaterType = locationTypes.includes("plus_code");
    const isLandType = locationTypes.some((type) =>
      [
        "street_address",
        "premise",
        "locality",
        "neighborhood",
        "administrative_area_level_2",
        "administrative_area_level_1",
      ].includes(type)
    );

    return isWaterType && !isLandType;
  } catch (error) {
    console.error("Error determining water status:", error);
    return false; // fallback to "not water" on error
  }
};
