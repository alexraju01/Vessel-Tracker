<script setup>
import { ref } from "vue";
import { Pencil, Trash2 } from "lucide-vue-next";

const props = defineProps({
  vessels: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["vessel-selected", "vessel-deleted", "vessel-edited"]);

const selectedVesselId = ref(null);
const editingVesselId = ref(null);
const editedVessel = ref({ name: "", latitude: 0, longitude: 0 });

const isEditing = (id) => editingVesselId.value === id;

const selectVessel = (vessel) => {
  selectedVesselId.value = vessel._id;
  emit("vessel-selected", vessel);
};

const deleteVessel = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/vessels/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`Server responded with ${res.status}`);
    emit("vessel-deleted", id);
  } catch (err) {
    console.error("Delete failed:", err);
    alert("Failed to delete vessel.");
  }
};

const startEditing = (vessel) => {
  editingVesselId.value = vessel._id;
  editedVessel.value = { ...vessel };
};

const cancelEditing = () => {
  editingVesselId.value = null;
};

const saveVessel = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/vessels/${editingVesselId.value}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedVessel.value),
    });

    if (!res.ok) throw new Error(`Server error: ${res.status}`);

    const { data: updated } = await res.json();
    emit("vessel-edited", updated);
    editingVesselId.value = null;
  } catch (err) {
    console.error("Update failed:", err);
    alert("Failed to update vessel.");
  }
};
</script>

<template>
  <div class="sidebar-container">
    <div class="vessel-count">Total Vessels: {{ props.vessels.length }}</div>

    <ul class="vessel-list">
      <li
        v-for="vessel in props.vessels"
        :key="`vessel-${vessel._id}`"
        @click="selectVessel(vessel)"
        :class="['vessel-item', { selected: vessel._id === selectedVesselId }]"
      >
        <template v-if="isEditing(vessel._id)">
          <p><strong>Name:</strong><input v-model="editedVessel.name" class="edit-input" /></p>
          <p>
            <strong>Lat:</strong
            ><input
              type="number"
              v-model.number="editedVessel.latitude"
              step="0.01"
              class="edit-input"
            />
          </p>
          <p>
            <strong>Lng:</strong
            ><input
              type="number"
              v-model.number="editedVessel.longitude"
              step="0.01"
              class="edit-input"
            />
          </p>
          <div class="action-tool">
            <button class="edit" @click.stop="saveVessel">Save</button>
            <button class="delete" @click.stop="cancelEditing">Cancel</button>
          </div>
        </template>

        <template v-else>
          <p><strong>Name:</strong> {{ vessel.name }}</p>
          <p><strong>Lat:</strong> {{ vessel.latitude.toFixed(2) }}</p>
          <p><strong>Lng:</strong> {{ vessel.longitude.toFixed(2) }}</p>
          <div class="action-tool">
            <button class="delete" @click.stop="deleteVessel(vessel._id)">
              <Trash2 class="icons-size" />
            </button>
            <button class="edit" @click.stop="startEditing(vessel)">
              <Pencil class="icons-size" />
            </button>
          </div>
        </template>
      </li>
    </ul>
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

.vessel-list {
  list-style: none;
}

.vessel-item {
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.35rem;
  cursor: pointer;
  border-radius: 4px;
  background-color: #e9e8e8;
  border: 2px solid transparent;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.vessel-item:hover {
  background-color: #dbeafe;
}

.vessel-item.selected {
  border-color: #3182ce;
  background-color: #ebf8ff;
}

.action-tool {
  display: flex;
  justify-content: space-between;
}

button {
  margin-top: 0.5rem;
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
}

.icons-size {
  width: 1rem;
}

.delete {
  background-color: #e53e3e;
}

.delete:hover {
  background-color: #c53030;
}

.edit {
  background-color: #3ebee5;
}

.edit-input {
  display: inline-block;
  margin-left: 0.3rem;
  margin-top: 0.2rem;
  padding: 0.15rem 0.3rem;
  font-size: 0.9rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
