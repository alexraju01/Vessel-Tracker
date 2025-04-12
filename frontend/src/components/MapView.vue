<script setup>
import { GoogleMap } from "vue3-google-map";
import VesselMarkers from "./VesselMarkers.vue";
import { ref, watch } from "vue";

const props = defineProps({
  vessels: {
    type: Array,
    default: () => [],
  },
  centerVessel: {
    type: Object,
    default: null,
  },
});

const center = ref({ lat: 0, lng: 0 });

watch(
  () => props.centerVessel,
  (newVessel) => {
    if (newVessel?.latitude && newVessel?.longitude) {
      center.value = {
        lat: newVessel.latitude,
        lng: newVessel.longitude,
      };
    }
  }
);
</script>

<template>
  <GoogleMap
    api-key="AIzaSyCRw65xRwgahOdl_hucX-urs8596WO2Idk"
    style="width: 100%; height: 100%"
    mapId="b3dd8a6215269852"
    :center="center"
    :zoom="6"
  >
    <VesselMarkers :vessels="vessels" />
  </GoogleMap>
</template>

<style scoped>
/* You can leave this empty or add map-specific container styles if needed */
</style>
