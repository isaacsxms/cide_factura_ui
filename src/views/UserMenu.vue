<template>
  <GoHome />

  <font-awesome-icon class="mb-3" icon="fa fa-user" size="2xl" />
  <div class="d-flex flex-column justify-content-center">

    <TitleComponent>{{ username }}</TitleComponent>
    <p class="text-center">
      Bienvenido <b>{{ name }}</b>, este es el panel de control de usuario de CIDE ¿Que desea hacer?
    </p>
  </div>
  <div class="container w-100 row">
    <div class="col-6 mt-4 mb-4">
      <router-link :to="userId + '/store'">
        <button type="submit" class="w-100 btn btn-success">Tienda</button>
      </router-link>
    </div>
    <div class="col-6 mt-4 mb-4">
      <router-link :to="userId + '/profile'">
        <button type="submit" class="w-100 btn btn-success">Perfil</button>
      </router-link>
    </div>
    <div class="col-6 mb-2">
      <router-link :to="userId + '/invoice'">
        <button type="submit" class="w-100 btn btn-success">Factura</button>
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
    const username = ref('User Menu Page')
    const name = ref('First name')
    const route = useRoute()
    const userId = ref(route.params.id);
    onMounted(async () => {
      try {
        console.log('userId here: ', userId)
        const response = await axiosInstance.get(`/user/profile/${userId.value}`)
        if (response.status === 200) {
          console.log(response)
          // Assuming the response contains the user's username
          username.value = response.data.username
          name.value = response.data.name
        }
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
    })

    return {
      username,
      name,
      userId
    }
  }
}
</script>

<style scoped></style>
