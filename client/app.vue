<template>
  <div>
    <h1>Hello {{ storageStore.storage }}</h1>
  </div>
</template>

<script setup>
import {useStorageStore} from '~/src/stores/storageStore';

const storageStore = useStorageStore();
</script>