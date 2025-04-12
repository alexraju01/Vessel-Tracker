<script setup>
defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <input
    type="search"
    :value="modelValue"
    @input="emit('update:modelValue', $event.target.value)"
    placeholder="Search vessels by name"
    class="search-input"
  />
</template>

<style scoped>
.search-input {
  width: 100%;
  padding: 0.4rem 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>
