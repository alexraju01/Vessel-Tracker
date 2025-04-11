<template>
  <div ref="map" class="map-container" />
</template>

<script setup>
import { onMounted, ref, nextTick } from "vue";

const map = ref(null);
let googleMapsPromise = null;

function loadGoogleMaps(apiKey) {
  if (window.google?.maps) return Promise.resolve();

  if (!googleMapsPromise) {
    googleMapsPromise = new Promise((resolve, reject) => {
      const existingScript = document.querySelector("script[src*='maps.googleapis.com']");
      if (existingScript) {
        existingScript.onload = resolve;
        existingScript.onerror = reject;
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;
      script.onload = resolve;
      script.onerror = (err) => reject(new Error(`Google Maps failed to load: ${err.message}`));
      document.head.appendChild(script);
    });
  }

  return googleMapsPromise;
}

async function initMap() {
  try {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error("❌ Missing Google Maps API key in .env file.");
      return;
    }

    await nextTick();
    await loadGoogleMaps(apiKey);

    new window.google.maps.Map(map.value, {
      center: { lat: 40.7128, lng: -74.006 }, // New York as an example
      zoom: 5,
      mapId: "DEMO_MAP_ID", // Optional if you don’t use custom styles
    });
  } catch (error) {
    console.error("🛑 Failed to initialize map:", error);
  }
}

onMounted(initMap);
</script>

<style scoped>
.map-container {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
}
</style>
