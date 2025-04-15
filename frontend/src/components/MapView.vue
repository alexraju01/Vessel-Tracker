<script setup>
import { GoogleMap } from "vue3-google-map";
import VesselMarkers from "./VesselMarkers.vue";
import { ref, watch, computed } from "vue";
import { addVessel } from "@/services/vesselServices";
import { showErrorToast, showSuccessToast, showWarningToast } from "@/utils/toastUtils";

const { vessels, centerVessel } = defineProps({
  vessels: {
    type: Array,
    default: () => [],
  },
  centerVessel: {
    type: Object,
    default: null,
  },
});

const center = ref({ lat: 0, lng: 0 });
const userMarkers = ref([]);

watch(
  () => centerVessel,
  (newVessel) => {
    if (newVessel?.latitude && newVessel?.longitude) {
      center.value = {
        lat: newVessel.latitude,
        lng: newVessel.longitude,
      };
    }
  }
);

const emit = defineEmits(["vessel-added"]);

const isWater = async (lat, lng) => {
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

const handleMapDblClick = async (event) => {
  const lat = event.latLng.lat();
  const lng = event.latLng.lng();

  const checkWater = await isWater(lat, lng);
  if (!checkWater) {
    showWarningToast("You can only place markers in water.");
    return;
  }

  const name = prompt("Enter marker name:");
  if (!name) return;

  const newMarker = { name, latitude: lat, longitude: lng };

  try {
    const savedMarker = await addVessel(newMarker);
    emit("vessel-added", savedMarker);
    showSuccessToast("Successfully added a new vessel marker");
  } catch {
    showErrorToast("Failed to add vessel");
  }
};

// Combine backend vessels with user-added markers
const allVessels = computed(() => [...vessels, ...userMarkers.value]);
</script>

<template>
  <GoogleMap
    api-key="AIzaSyCRw65xRwgahOdl_hucX-urs8596WO2Idk"
    style="width: 100%; height: 100%"
    mapId="b3dd8a6215269852"
    :center="center"
    :zoom="6"
    @dblclick="handleMapDblClick"
  >
    <VesselMarkers :vessels="allVessels" />
  </GoogleMap>
</template>
