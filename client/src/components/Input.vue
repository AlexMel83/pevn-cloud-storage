<template>
  <div class="input">
    <input :type="type" :placeholder="placeholder" />
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "Введіть значення",
  },
});
</script>

<style scoped>
.input input {
  border: none;
  border-bottom: var(--font-color) solid 3px;
  background: transparent;
  width: 100%;
  padding: 3px;
}

input:focus {
  outline: none;
  transform: scale(1.1);
}

::-webkit-input-placeholder {
  color: var(--font-color);
  font-weight: 700;
}
:-ms-input-placeholder {
  color: var(--font-color);
  font-weight: 700;
}
::-moz-placeholder {
  color: var(--font-color);
  font-weight: 700;
}
:-moz-placeholder {
  color: var(--font-color);
  font-weight: 700;
}
</style>
