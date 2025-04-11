<!-- components/VesselMarkers.vue -->
<script setup>
import { onMounted } from "vue";

const props = defineProps({
  map: {
    type: Object,
    required: true,
  },
});

const loadMarkers = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/vessels");
    const vessels = await response.json();

    vessels.data.forEach((vessel) => {
      const { latitude, longitude, name } = vessel;

      new window.google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: props.map,
        title: name,
      });
    });
  } catch (err) {
    console.error("⚠️ Failed to load vessel markers:", err);
  }
};

onMounted(() => {
  if (props.map) loadMarkers();
});
</script>
