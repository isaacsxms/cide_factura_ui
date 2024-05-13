<template>
    <div>
        <h1> {{ usernameTitle }}</h1>
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
    const usernameTitle = ref('User Menu Page')
    const route = useRoute()

    onMounted(async () => {
      try {
        const userId = route.params.id
        console.log("userId here: ", userId)
        const response = await axiosInstance.get(`/user/profile/${userId}`)
        if (response.status === 200) {
          // Assuming the response contains the user's username
          usernameTitle.value = response.data.username // Update the page title with the username
        }
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
    })

    return {
        usernameTitle // Expose pageTitle to the template
    }
  }
}
</script>