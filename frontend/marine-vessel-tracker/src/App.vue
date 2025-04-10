<script setup>
import { ref } from "vue";

const product = ref("Hello world");
</script>

<template>
  <main>
    <h1>{{ product }}</h1>
  </main>
</template>
