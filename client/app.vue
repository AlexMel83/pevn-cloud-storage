<template>
  <div class="app">
    <Navbar />
    <div class="wrap">
      <Registration />
    </div>
    <!-- <h1>Hello {{ storageStore.storage }}</h1> -->
  </div>
</template>

<script setup>
import Navbar from "~/src/components/Navbar.vue";
import Registration from "~/src/components/Registration.vue";
// import { useStorageStore } from "~/src/stores/storageStore";
// const storageStore = useStorageStore();
</script>
