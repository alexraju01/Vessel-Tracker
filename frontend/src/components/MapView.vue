<template>
  <div ref="map" class="map-container" />
</template>

<script setup>
import { onMounted, ref, nextTick } from "vue";

const map = ref(null);
let googleMapsPromise = null;

const loadGoogleMaps = async (apiKey) => {
  // If Google Maps already available, skip loading
  if (window.google?.maps) return;

  // If script is already being loaded, wait for it
  if (!googleMapsPromise) {
    googleMapsPromise = new Promise((resolve, reject) => {
      const existingScript = document.querySelector("script[src*='maps.googleapis.com']");

      if (existingScript) {
        existingScript.addEventListener("load", resolve, { once: true });
        existingScript.addEventListener(
          "error",
          () => reject(new Error("Google Maps failed to load.")),
          { once: true }
        );
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;

      script.addEventListener("load", resolve, { once: true });
      script.addEventListener("error", () => reject(new Error("Google Maps failed to load.")), {
        once: true,
      });

      document.head.appendChild(script);
    });
  }

  await googleMapsPromise;
};

const initMap = async () => {
  try {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error("❌ Missing Google Maps API key in .env file.");
      return;
    }

    await nextTick();
    await loadGoogleMaps(apiKey);

    new window.google.maps.Map(map.value, {
      center: { lat: 40.7128, lng: -74.006 }, // New York City
      zoom: 5,
      mapId: "DEMO_MAP_ID", // Optional
    });
  } catch (err) {
    console.error("🛑 Failed to initialize map:", err);
  }
};

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
