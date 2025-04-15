<script setup>
import { ref, onMounted } from "vue";
import MapSidebar from "@/components/MapSidebar.vue";
import MapView from "@/components/MapView.vue";
import { fetchVessels } from "./services/vesselServices";
import { showErrorToast } from "./utils/toastUtils";

// Reactive variable to store all vessels and currently selected vessel
const vessels = ref([]);
const selectedVessel = ref(null);

// Fetch vessels from the API and update local state
const loadVessels = async () => {
  try {
    const data = await fetchVessels(); // API call
    vessels.value = data; // Update vessels
  } catch {
    // Show error toast if API call fails
    showErrorToast("Failed to load vessels. Please try refreshing the page.");
  }
};

// Update selected vessel when one is chosen in the sidebar
const handleVesselSelected = (vessel) => {
  selectedVessel.value = vessel;
};

// Remove a vessel from the list when deleted
const handleVesselDeleted = (id) => {
  vessels.value = vessels.value.filter((v) => v._id !== id); // Remove from array
  if (selectedVessel.value?._id === id) selectedVessel.value = null; // Deselect if needed
};

// Add a newly created vessel to the list
const handleVesselAdded = (newVessel) => {
  vessels.value.push(newVessel); // Append to list
};

// Update an existing vessel’s data
const handleVesselEdited = (updatedVessel) => {
  const index = vessels.value.findIndex((v) => v._id === updatedVessel._id); // Find index
  if (index !== -1) {
    const newVessel = structuredClone(updatedVessel); // Deep copy to avoid reactive issues
    vessels.value.splice(index, 1, newVessel); // Replace in array
  }

  // Also update selected vessel if it's the one being edited
  if (selectedVessel.value?._id === updatedVessel._id) {
    selectedVessel.value = updatedVessel;
  }
};

// Run when component is mounted to load initial data
onMounted(() => {
  loadVessels();
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
  position: relative;
  display: flex;
  height: 100vh;
  width: 100%;
}
.sidebar {
  width: 300px;
}
</style>
