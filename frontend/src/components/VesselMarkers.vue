<!-- VesselMarkers.vue -->
<script setup>
import { ref, onMounted } from "vue";
import { AdvancedMarker } from "vue3-google-map";

// Reactive array to store vessel marker positions
const vesselMarkers = ref([]);

// Fetch vessel data on component mount
const fetchVesselData = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/vessels");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data } = await response.json();

    vesselMarkers.value = data.map(({ latitude, longitude }) => ({
      position: { lat: latitude, lng: longitude },
    }));
  } catch (error) {
    console.error("Error fetching vessel data:", error);
  }
};

onMounted(fetchVesselData);
</script>

<template>
  <AdvancedMarker
    v-for="(marker, index) in vesselMarkers"
    :key="`vessel-marker-${index}`"
    :options="{ position: marker.position }"
  />
</template>
