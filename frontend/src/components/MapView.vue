<script setup>
import { GoogleMap } from "vue3-google-map";
import VesselMarkers from "./VesselMarkers.vue";
import { onMounted } from "vue";

const center = { lat: 40.689247, lng: -74.044502 };

const { vessels } = defineProps({
  vessels: {
    type: Array,
    default: () => [],
  },
});

onMounted(() => {
  console.log("Vessels in MapView:", vessels);
});
</script>

<template>
  <GoogleMap
    api-key="AIzaSyCRw65xRwgahOdl_hucX-urs8596WO2Idk"
    style="width: 100%; height: 100%"
    mapId="b3dd8a6215269852"
    :center="center"
    :zoom="3"
  >
    <VesselMarkers :vessels="vessels" />
  </GoogleMap>
</template>
