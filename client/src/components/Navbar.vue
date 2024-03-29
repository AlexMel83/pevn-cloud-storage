<template>
  <nav class="navbar">
    <div class="container">
      <img
        src="../assets/img/navbar-logo.svg"
        alt="logo"
        class="navbar__logo"
      />
      <div class="navbar__header">PEVN CLOUD</div>
      <NuxtLink to="/login" class="navbar__login">Увійти</NuxtLink>
      <NuxtLink to="/registration" class="navbar__registration">
        Реєстрація</NuxtLink
      >
    </div>
  </nav>
</template>

<script></script>

<style scoped>
.navbar {
  display: flex;
  padding: 0 10px;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: #fff;
}

.navbar__header {
  margin-left: 10px;
  font-size: 24px;
  font-weight: 700;
}

.navbar__login {
  margin-left: auto;
  margin-right: 20px;
}

.container {
}
</style>
