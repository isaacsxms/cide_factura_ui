<script setup>
//import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="background-color">
    <div class="container d-flex justify-content-center align-items-center min-vh-100">
      <div class="row border rounded-5 p-5 bg-white shadow box-area">
        <div class="row align-items-center">
          <div
            class="rounded-5 d-flex justify-content-center align-items-center flex-column left-box"
          >
            <div class="featured-image mb-5">
              <img src="@/images/logo-CIDE.png" alt="Cide Image" />
            </div>
          </div>
          <div class="right-box">
            <div class="header-text mb-4">
              <div class="wrapper">
                <RouterView></RouterView>
              </div>
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

.background-color {
  background: rgba(90, 145, 76, 0.575);
}
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
