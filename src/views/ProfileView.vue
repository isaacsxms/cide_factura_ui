<template>
  <div class="d-flex flex-column justify-content-center">
    <h1 class="text-center green">Perfil</h1>

    <div class="mt-5">
      <div class="container d-flex justify-content-center align-items-center">
        <div class="row border rounded-5 p-5 bg-white shadow box-area">
          <div class="row align-items-center">
            <div class="rounded-5 d-flex flex-column left-box">
              <h3 class="mb-2 text-center">{{ username }}</h3>
              <hr class="my-hr">
              <p class="mt-2 text-left" v-for=" profileField in filteredProfileFields" :key="profileField.key">
                <b>{{ profileField.key }}:</b> {{ profileField.value }}
              </p>
            </div>
            <div class="right-box">
              <div class="header-text mb-4">
                <div class="wrapper">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <GoBack />
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import axiosInstance from '@/axios'
import { useRoute } from 'vue-router'
import GoBack from '@/components/GoBackRoute.vue'

export default {
  components: {
    GoBack
  },
  setup() {
    // Define a reactive property to hold the username
    const userProfile = ref({})
    const username = ref('User Menu Page')
    const name = ref('First name')
    const route = useRoute()

    onMounted(async () => {
      try {
        const userId = route.params.id
        console.log('userId here: ', userId)
        const response = await axiosInstance.get(`/user/profile/${userId}`)
        if (response.status === 200) {
          console.log('API Response:', response.data)

          const { message, ...profileData } = response.data

          console.log(profileData)
          userProfile.value = profileData

          username.value = response.data.username
          name.value = response.data.name
        }
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
    })

    const filteredProfileFields = computed(() => {
      return Object.entries(userProfile.value)
        .filter(([key]) => key !== 'username')
        .map(([key, value]) => ({ key, value }))
    })

    return {
      username,
      name,
      userProfile,
      filteredProfileFields
    }
  }
}
</script>

<style scoped>
.my-hr {
  border: none;
  height: 3px;
  background-color: #000;
  /* Change the color as needed */
}
</style>