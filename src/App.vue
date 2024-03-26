<script setup>
//import { RouterLink, RouterView } from 'vue-router'
import TitleComponent from './components/TitleComponent.vue'
</script>

<template>
  <div>
    <img alt="Vue logo" class="logo" src="@/images/logo-CIDE.png" />

    <div class="wrapper">
      <TitleComponent msg="Login" />
    </div>
  </div>
</template>

<style scoped>
.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
