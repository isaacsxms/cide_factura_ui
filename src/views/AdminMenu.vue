<template>
  <GoHome />
  <font-awesome-icon class="mb-3" icon="fa-solid fa-user-secret" size="2xl" />
  <div class="d-flex flex-column justify-content-center">
    <TitleComponent>Admin</TitleComponent>
    <p class="text-center">Bienvenido Admin ¿Que desea hacer?</p>
  </div>

  <div class="container w-100 row">
    <div class="col-6 mt-4 mb-4">
      <router-link to="search">
        <button type="submit" class="w-100 btn btn-success">Consulta Usuario</button>
      </router-link>
    </div>
    <div class="col-6 mt-4 mb-4">
      <router-link to="validate"><button type="submit" class="w-100 btn btn-success">Validar Peticiones</button>
      </router-link>
    </div>
  </div>
</template>

<!-- 50 -->
<!-- w-25-->
<!-- w-25-->

<script>
import { ref, onMounted } from 'vue'
import axiosInstance from '@/axios'
import { useRoute } from 'vue-router'
import GoHome from '@/components/GoHomeRoute.vue'
import TitleComponent from '@/components/TitleComponent.vue'

export default {
  components: {
    GoHome,
    TitleComponent
  },
  setup() {
    // Define a reactive property to hold the username
    const route = useRoute()

    onMounted(async () => { })

    return {}
  }
}
</script>

<style scoped>
.green {
  color: rgb(21, 133, 21);
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  text-shadow: 1px 1px rgb(0, 0, 0);
}

.btn {
  top: 30%;
}
</style>
