<!-- VesselSidebar.vue -->
<script setup>
import { ref } from "vue";

const { vessels } = defineProps({
  vessels: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["vessel-selected", "vessel-deleted"]);

const selectedVesselId = ref(null);

const selectVessel = (vessel) => {
  selectedVesselId.value = vessel._id;
  emit("vessel-selected", vessel);
};

const deleteVessel = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/vessels/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    emit("vessel-deleted", id); // Let parent update the vessel list
  } catch (error) {
    console.error("Failed to delete vessel:", error);
    alert("Could not delete the vessel.");
  }
};
</script>

<template>
  <div class="sidebar-container">
    <div>Total: {{ vessels.length }}</div>
    <ul class="vessel-list">
      <li
        v-for="{ _id: id, ...vessel } in vessels"
        :key="`vessel-${id}`"
        @click="selectVessel({ _id: id, ...vessel })"
        :class="['vessel-item', { selected: id === selectedVesselId }]"
      >
        <p><strong>Name:</strong> {{ vessel.name }}</p>
        <p><strong>Lat:</strong> {{ vessel.latitude.toFixed(2) }}</p>
        <p><strong>Lng:</strong> {{ vessel.longitude.toFixed(2) }}</p>
        <button @click.stop="deleteVessel(id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.sidebar-container {
  padding: 1rem;
  overflow-y: auto;
  height: 100%;
  background-color: #f9f9f9;
  border-right: 1px solid #ddd;
}

.vessel-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.vessel-item {
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.25rem;
  cursor: pointer;
  border-radius: 4px;
  background-color: #f3f3f3;
  border: 2px solid transparent;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.vessel-item:hover {
  background-color: #dbeafe;
}

.vessel-item.selected {
  border-color: #3182ce;
  background-color: #ebf8ff;
}

button {
  margin-top: 0.5rem;
  background-color: #e53e3e;
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #c53030;
}
</style>
