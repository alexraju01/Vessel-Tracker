<script setup>
import { AdvancedMarker } from "vue3-google-map";

const props = defineProps({
  vessels: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <template v-for="(vessel, index) in props.vessels" :key="`marker-${index}`">
    <AdvancedMarker
      :options="{
        position: { lat: vessel.latitude, lng: vessel.longitude },
        title: vessel.name,
      }"
    />
  </template>
</template>
