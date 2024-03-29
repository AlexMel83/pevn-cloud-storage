<template>
  <div class="registration container">
    <div class="registration__header">Реєстрація</div>
    <Input placeholder="ім'я" />
    <Input placeholder="призвище" />
    <Input placeholder="email" />
    <Input placeholder="пароль" type="password" />
    <button class="registration__btn">Зареєструватись</button>
  </div>
</template>

<script setup>
import Input from "~/src/components/Input.vue";
</script>

<style scoped>
.container {
  flex-direction: column;
  margin: 10px auto;
}
.registration {
  width: 500px;
  align-items: center;
  background-color: #fff;
  border-radius: 20px;
  padding: 30px;
}
.registration__header {
  font-size: 30px;
  font-weight: 700;
}
input {
  margin: 10px 20px;
}
</style>
