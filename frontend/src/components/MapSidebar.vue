<script setup>
import { ref, computed } from "vue"; // Vue composition API
import VesselSearch from "./VesselSearch.vue"; // Search input component
import VesselList from "./VesselList.vue"; // List display component
import { sortVessels } from "@/utils/sortVessels"; // Custom sorting function
import { ArrowDownZA, ArrowUpAz, ClockArrowDown, ClockArrowUp } from "lucide-vue-next"; // Icons for sorting buttons

// Props passed to this component
const props = defineProps({
  vessels: {
    type: Array,
    default: () => [], // Default to empty array if none provided
  },
});

// Emit events back to the parent
const emit = defineEmits(["vessel-selected", "vessel-deleted", "vessel-edited"]);

// Reactive states
const searchQuery = ref(""); // Search input text
const selectedVesselId = ref(null); // ID of the currently selected vessel
const editingVesselId = ref(null); // ID of the vessel being edited

const sortField = ref("name"); // Default sorting field
const sortAscending = ref(true); // Default sorting direction (ascending)

// Function to change sorting field or toggle direction
const setSortField = (field) => {
  if (sortField.value === field) {
    sortAscending.value = !sortAscending.value; // Toggle if same field
  } else {
    sortField.value = field;
    sortAscending.value = true; // Reset to ascending for new field
  }
};

// Computed value to filter and sort vessels based on user input
const filteredVessels = computed(() => {
  const query = searchQuery.value.toLowerCase(); // Normalize query
  const vessels = props.vessels ?? [];

  // Filter vessels by name matching the query
  const filtered = vessels.filter(({ name }) => name.toLowerCase().includes(query));

  // Return sorted result using the utility function
  return sortVessels(filtered, sortField.value, sortAscending.value);
});

// Select a vessel and emit the event to the parent
const selectVessel = (vessel) => {
  selectedVesselId.value = vessel._id;
  emit("vessel-selected", vessel);
};

// Emit delete and edit actions to the parent
const handleDelete = (id) => emit("vessel-deleted", id);
const handleEdit = (vessel) => emit("vessel-edited", vessel);
</script>

<template>
  <div class="sidebar-container">
    <div class="vessel-count">Total Vessels: {{ props.vessels.length }}</div>

    <div class="search-sort-container">
      <VesselSearch v-model="searchQuery" />

      <div class="sort-options">
        <button
          @click="setSortField('name')"
          :class="['sort-button', sortField === 'name' ? 'active' : '']"
        >
          Name
          <ArrowUpAz class="icons-size" v-if="sortField === 'name' && sortAscending" />
          <ArrowDownZA class="icons-size" v-if="sortField === 'name' && !sortAscending" />
        </button>

        <button
          @click="setSortField('createdAt')"
          :class="['sort-button', sortField === 'createdAt' ? 'active' : '']"
        >
          Created
          <ClockArrowUp class="icons-size" v-if="sortField === 'createdAt' && sortAscending" />
          <ClockArrowDown class="icons-size" v-if="sortField === 'createdAt' && !sortAscending" />
        </button>
      </div>
    </div>

    <VesselList
      :vessels="filteredVessels"
      :selected-id="selectedVesselId"
      :editing-id="editingVesselId"
      @vessel-selected="selectVessel"
      @vessel-deleted="handleDelete"
      @vessel-edited="handleEdit"
      @start-editing="(id) => (editingVesselId = id)"
      @cancel-editing="() => (editingVesselId = null)"
    />
  </div>
</template>

<style scoped>
.sidebar-container {
  padding: 1rem 0.5rem;
  height: 100vh;
  overflow-y: auto;
  background-color: #f9f9f9;
  border-right: 1px solid #ddd;
}

.vessel-count {
  margin-bottom: 1rem;
  text-align: center;
}

.icons-size {
  width: 1.2rem;
}

.search-sort-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.sort-options {
  display: flex;
  gap: 0.3rem;
}

.sort-button {
  display: flex;
  align-items: center;
  background-color: #e2e8f0;
  border: none;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  gap: 0.3rem;
}

.sort-button:hover {
  background-color: #cbd5e0;
}

.sort-button.active {
  background-color: #4a90e2;
  color: white;
}
</style>
