<script setup>
import { GoogleMap } from "vue3-google-map";
import VesselMarkers from "./VesselMarkers.vue";
import { ref, watch, computed } from "vue";
import { addVessel } from "@/services/vesselServices";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";

const { vessels, centerVessel } = defineProps({
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
const userMarkers = ref([]);

watch(
  () => centerVessel,
  (newVessel) => {
    if (newVessel?.latitude && newVessel?.longitude) {
      center.value = {
        lat: newVessel.latitude,
        lng: newVessel.longitude,
      };
    }
  }
);

const emit = defineEmits(["vessel-added"]);

const handleMapDblClick = async (event) => {
  const lat = event.latLng.lat();
  const lng = event.latLng.lng();
  const name = prompt("Enter marker name:");
  if (!name) return;

  const newMarker = { name, latitude: lat, longitude: lng };

  try {
    const savedMarker = await addVessel(newMarker);
    emit("vessel-added", savedMarker);
    showSuccessToast("Successfully added a new vessel marker");
  } catch {
    showErrorToast("Failed to add vessel");
  }
};

// Combine backend vessels with user-added markers
const allVessels = computed(() => [...vessels, ...userMarkers.value]);
</script>

<template>
  <GoogleMap
    api-key="AIzaSyCRw65xRwgahOdl_hucX-urs8596WO2Idk"
    style="width: 100%; height: 100%"
    mapId="b3dd8a6215269852"
    :center="center"
    :zoom="6"
    @dblclick="handleMapDblClick"
  >
    <VesselMarkers :vessels="allVessels" />
  </GoogleMap>
</template>
