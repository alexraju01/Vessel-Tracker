<script setup>
import VesselItem from "./VesselItem.vue";

defineProps({
  vessels: Array,
  selectedId: String,
  editingId: String,
});

const emit = defineEmits([
  "vessel-selected",
  "vessel-deleted",
  "vessel-edited",
  "start-editing",
  "cancel-editing",
]);
</script>

<template>
  <ul class="vessel-list">
    <li v-for="vessel in vessels" :key="vessel._id">
      <VesselItem
        :vessel="vessel"
        :is-selected="vessel._id === selectedId"
        :is-editing="vessel._id === editingId"
        @select="() => emit('vessel-selected', vessel)"
        @delete="() => emit('vessel-deleted', vessel._id)"
        @edit="(data) => emit('vessel-edited', data)"
        @start-editing="() => emit('start-editing', vessel._id)"
        @cancel-editing="() => emit('cancel-editing')"
      />
    </li>
  </ul>
</template>

<style scoped>
.vessel-list {
  list-style: none;
  padding: 0;
}
</style>
