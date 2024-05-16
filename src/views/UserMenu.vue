<template>
  <font-awesome-icon class="mb-3" icon="fa fa-user" size="2xl" />
  <div class="d-flex flex-column justify-content-center">
    <h1 class="text-center green">{{ username }}</h1>
    <p class="text-center">
      Bienvenido <b>{{ name }}</b
      >, este es el panel de control de usuario de CIDE ¿Que desea hacer?
    </p>
  </div>

  <div class="container w-100 row">
    <div class="col-6 mt-4 mb-4">
      <button type="submit" class="w-100 btn btn-success">Tienda</button>
    </div>
    <div class="col-6 mt-4 mb-4">
      <button type="submit" class="w-100 btn btn-success">Perfil</button>
    </div>
    <div class="col-6 mb-2">
      <button type="submit" class="w-100 btn btn-success">
        <font-awesome-icon :icon="['fas', 'cart-shopping']" />
      </button>
    </div>
    <div class="col-6 mb-2">
      <button type="submit" class="w-100 btn btn-success">Factura</button>
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

export default {
  setup() {
    // Define a reactive property to hold the username
    const username = ref('User Menu Page')
    const name = ref('First name')
    const route = useRoute()

    onMounted(async () => {
      try {
        const userId = route.params.id
        console.log('userId here: ', userId)
        const response = await axiosInstance.get(`/user/profile/${userId}`)
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
      name
    }
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
</style>
