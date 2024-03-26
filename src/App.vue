<script setup>
//import { RouterLink, RouterView } from 'vue-router'
import TitleComponent from './components/TitleComponent.vue'
</script>

<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="row border rounded-5 p-3 bg-red shadow box-area">
      <div
        class="col-md-6 rounded-5 d-flex justify-content-center align-items-center flex-column left-box"
        style="background: greenyellow"
      >
        <div class="featured-image">
          <img src="@/images/logo-CIDE.png" alt="Cide Image" />
        </div>
      </div>
      <div class="col-md-6 right-box">
        <div class="row align-items-center">
          <div class="header-text mb-4">
            <div class="wrapper">
              <TitleComponent msg="Login" />
              <RouterView></RouterView>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box-area {
  width: 930px;
}
</style>
