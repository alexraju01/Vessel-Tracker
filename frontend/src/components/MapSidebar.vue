<script setup>
import { ref, computed } from "vue";
import VesselSearch from "./VesselSearch.vue";
import VesselList from "./VesselList.vue";
import { sortVessels } from "@/utils/sortVessels";
import { ArrowDownZA, ArrowUpAz, ClockArrowDown, ClockArrowUp } from "lucide-vue-next";

const props = defineProps({
  vessels: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["vessel-selected", "vessel-deleted", "vessel-edited"]);

const searchQuery = ref("");
const selectedVesselId = ref(null);
const editingVesselId = ref(null);

const sortField = ref("name");
const sortAscending = ref(true);

const setSortField = (field) => {
  if (sortField.value === field) {
    sortAscending.value = !sortAscending.value;
  } else {
    sortField.value = field;
    sortAscending.value = true;
  }
};

const filteredVessels = computed(() => {
  const query = searchQuery.value.toLowerCase();
  const vessels = props.vessels ?? [];

  const filtered = vessels.filter(({ name }) => name.toLowerCase().includes(query));

  return sortVessels(filtered, sortField.value, sortAscending.value);
});
const selectVessel = (vessel) => {
  selectedVesselId.value = vessel._id;
  emit("vessel-selected", vessel);
};

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
