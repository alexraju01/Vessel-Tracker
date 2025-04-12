<script setup>
import { ref, computed } from "vue";
import VesselSearch from "./VesselSearch.vue";
import VesselList from "./VesselList.vue";

const props = defineProps({
  vessels: Array,
});

const emit = defineEmits(["vessel-selected", "vessel-deleted", "vessel-edited"]);

const searchQuery = ref("");
const selectedVesselId = ref(null);
const editingVesselId = ref(null);

const filteredVessels = computed(() =>
  props.vessels.filter((v) => v.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
);

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
    <VesselSearch v-model="searchQuery" />

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
}




</style>
