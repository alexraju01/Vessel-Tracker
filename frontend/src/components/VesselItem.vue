<script setup>
import { ref } from "vue";
import { Pencil, Trash2 } from "lucide-vue-next";
import { useVesselApi } from "../utils/useVesselApi";

const props = defineProps({
  vessel: Object,
  isSelected: Boolean,
  isEditing: Boolean,
});

const emit = defineEmits(["select", "delete", "edit", "start-editing", "cancel-editing"]);

const editedVessel = ref({ ...props.vessel });
const { updateVessel, deleteVesselById } = useVesselApi();

const save = async () => {
  try {
    const updated = await updateVessel(editedVessel.value._id, editedVessel.value);
    emit("edit", updated);
    emit("cancel-editing");
  } catch {
    alert("Failed to save");
  }
};

const handleDelete = async () => {
  try {
    await deleteVesselById(props.vessel._id);
    emit("delete");
  } catch {
    alert("Delete failed");
  }
};
</script>

<template>
  <div class="vessel-item" :class="{ selected: isSelected }" @click="emit('select')">
    <template v-if="isEditing">
      <p><strong>Name:</strong> <input v-model="editedVessel.name" class="edit-input" /></p>
      <p>
        <strong>Lat:</strong>
        <input type="number" v-model.number="editedVessel.latitude" class="edit-input" />
      </p>
      <p>
        <strong>Lng:</strong>
        <input type="number" v-model.number="editedVessel.longitude" class="edit-input" />
      </p>
      <div class="action-tool">
        <button class="edit" @click.stop="save">Save</button>
        <button class="delete" @click.stop="emit('cancel-editing')">Cancel</button>
      </div>
    </template>

    <template v-else>
      <p><strong>Name:</strong> {{ vessel.name }}</p>
      <p><strong>Lat:</strong> {{ vessel.latitude.toFixed(2) }}</p>
      <p><strong>Lng:</strong> {{ vessel.longitude.toFixed(2) }}</p>
      <div class="action-tool">
        <button class="delete" @click.stop="handleDelete"><Trash2 class="icons-size" /></button>
        <button class="edit" @click.stop="emit('start-editing')">
          <Pencil class="icons-size" />
        </button>
      </div>
    </template>
  </div>
</template>

<style scoped>
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

.edit-input {
  margin-left: 0.3rem;
  margin-top: 0.2rem;
  padding: 0.15rem 0.3rem;
  font-size: 0.9rem;
  border: 1px solid #ccc;
  border-radius: 4px;
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
