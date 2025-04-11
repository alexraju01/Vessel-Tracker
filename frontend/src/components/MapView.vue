<!-- VesselMap.vue -->
<script setup>
import { GoogleMap } from "vue3-google-map";
import VesselMarkers from "./VesselMarkers.vue";

const center = { lat: 40.689247, lng: -74.044502 };
</script>

<template>
  <GoogleMap
    api-key="AIzaSyCRw65xRwgahOdl_hucX-urs8596WO2Idk"
    style="width: 100%; height: 100vh"
    mapId="b3dd8a6215269852"
    :center="center"
    :zoom="3"
  >
    <VesselMarkers />
  </GoogleMap>
</template>
