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

// Handle vessel selection
const handleVesselSelected = (vessel) => {
  selectedVessel.value = vessel;
};

// Handle vessel deletion (triggered by MapSidebar)
const handleVesselDeleted = (id) => {
  vessels.value = vessels.value.filter((v) => v._id !== id);
  if (selectedVessel.value?._id === id) selectedVessel.value = null;
};

// Handle new vessel addition from MapView
const handleVesselAdded = (newVessel) => {
  vessels.value.push(newVessel); // Vessel will immediately show
};

const handleVesselEdited = (updatedVessel) => {
  const index = vessels.value.findIndex((v) => v._id === updatedVessel._id);
  if (index !== -1) {
    const newVessel = structuredClone(updatedVessel);
    vessels.value.splice(index, 1, newVessel);
  }

  if (selectedVessel.value?._id === updatedVessel._id) {
    selectedVessel.value = updatedVessel;
  }
};

onMounted(() => {
  fetchVessels();
});
</script>

<template>
  <main class="main-layout">
    <MapSidebar
      class="sidebar"
      :vessels="vessels"
      @vessel-selected="handleVesselSelected"
      @vessel-deleted="handleVesselDeleted"
      @vessel-edited="handleVesselEdited"
    />
    <MapView :vessels="vessels" :center-vessel="selectedVessel" @vessel-added="handleVesselAdded" />
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
