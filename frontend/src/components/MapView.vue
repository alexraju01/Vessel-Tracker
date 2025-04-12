<script setup>
import { GoogleMap } from "vue3-google-map";
import VesselMarkers from "./VesselMarkers.vue";
import { ref, watch, computed } from "vue";

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

const handleMapDblClick = async (event) => {
  const lat = event.latLng.lat();
  const lng = event.latLng.lng();
  const name = prompt("Enter marker name:");
  if (!name) return;

  const newMarker = { name, latitude: lat, longitude: lng };

  try {
    const response = await fetch("http://localhost:3000/api/vessels/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMarker),
    });

    const savedMarker = await response.json();
    emit("vessel-added", savedMarker); // 🔥 Notify parent
  } catch (error) {
    console.error("Failed to post marker:", error);
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
