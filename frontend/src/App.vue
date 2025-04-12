<script setup>
import { ref, onMounted } from "vue";
import MapSidebar from "@/components/MapSidebar.vue";
import MapView from "@/components/MapView.vue";

const vessels = ref([]);
const selectedVessel = ref(null);

// Fetch vessels from API
const fetchVessels = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/vessels");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const { data } = await response.json();
    vessels.value = data;
  } catch (error) {
    console.error("Failed to fetch vessels:", error);
  }
};

// Handle sidebar click
const handleVesselSelected = (vessel) => {
  selectedVessel.value = vessel;
};

onMounted(() => {
  fetchVessels();
});
</script>

<template>
  <main class="main-layout">
    <MapSidebar class="sidebar" :vessels="vessels" @vessel-selected="handleVesselSelected" />
    <MapView :vessels="vessels" :center-vessel="selectedVessel" />
  </main>
</template>

<style scoped>
.main-layout {
  display: flex;
  height: 100vh;
  width: 100%;
}
.sidebar {
  width: 300px;
}
</style>
