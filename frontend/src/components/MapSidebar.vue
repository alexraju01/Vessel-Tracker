<script setup>
import { ref } from "vue";

const { vessels } = defineProps({
  vessels: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["vessel-selected"]);
const selectedVesselId = ref(null);

const selectVessel = (vessel) => {
  selectedVesselId.value = vessel._id;
  emit("vessel-selected", vessel);
};
</script>

<template>
  <div class="sidebar-container">
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
  border: 2px solid transparent; /* Reserve space */
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.vessel-item:hover {
  background-color: #dbeafe;
}

.vessel-item.selected {
  border-color: #3182ce; /* Just change the color */
  background-color: #ebf8ff;
}
</style>
