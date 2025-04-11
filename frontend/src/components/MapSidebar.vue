<script setup>
const { vessels } = defineProps({
  vessels: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <aside class="sidebar">
    <h2 class="sidebar-title">Vessel List</h2>
    <ul class="vessel-list">
      <li v-for="(vessel, index) in vessels" :key="`vessel-${index}`" class="vessel-item">
        <p><strong>ID:</strong> {{ vessel.id }}</p>
        <p><strong>Name:</strong> {{ vessel.name }}</p>

        <p><strong>Lat:</strong> {{ vessel.latitude.toFixed(2) }}</p>
        <p><strong>Lng:</strong> {{ vessel.longitude.toFixed(2) }}</p>
      </li>
    </ul>
  </aside>
</template>

<style scoped>
.sidebar {
  padding: 1rem;
  width: 300px;
  background-color: #ffffff;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  height: 100vh;
  color: black;
}

.sidebar-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.vessel-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.vessel-item {
  background-color: #f3f3f3;
  padding: 0.75rem;
  border-radius: 5px;
  margin-bottom: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: background-color 0.2s ease;
}

.vessel-item:hover {
  background-color: #e2e2e2;
}
</style>
