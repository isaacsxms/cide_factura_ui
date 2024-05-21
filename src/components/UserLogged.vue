<template>
    <div class="d-flex">
    <font-awesome-icon class="mb-3" icon="fa-solid fa-user"  />
    <p> {{ username }}</p>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import axiosInstance from '@/axios'
  import { useRoute } from 'vue-router'
  
  export default {
    name: 'UsernameDisplay',
    setup() {
      const username = ref('User Menu Page')
      const route = useRoute()
  
      onMounted(async () => {
        try {
          const userId = route.params.id
          console.log('userId here: ', userId)
          const response = await axiosInstance.get(`/user/profile/${userId}`)
          if (response.status === 200) {
            console.log('API Response:', response.data)
            username.value = response.data.username
          }
        } catch (error) {
          console.error('Error fetching username:', error)
        }
      })
  
      return {
        username
      }
    }
  }
  </script>