<script setup>
import { CustomMarker } from "vue3-google-map";

const props = defineProps({
  vessels: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <template v-for="(vessel, index) in props.vessels" :key="`marker-${index}`">
    <CustomMarker
      :options="{
        position: { lat: vessel.latitude, lng: vessel.longitude },
      }"
    >
      <div style="text-align: center">
        <div style="font-size: 0.9rem; font-weight: bold">{{ vessel.name }}</div>
        <img
          :src="vessel.imageUrl || '/images/ship.png'"
          width="40"
          height="40"
          style="margin-top: 4px"
        />
      </div>
    </CustomMarker>
  </template>
</template>
