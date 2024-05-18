<template>
    <div class="d-flex flex-column justify-content-center">
        <h1 class="text-center green">Cart</h1>


    </div>
    <GoBack />
</template>

<script>
import { ref, onMounted } from 'vue'
import axiosInstance from '@/axios'
import { useRoute } from 'vue-router'
import GoBack from '@/components/GoBackRoute.vue'

export default {
    components: {
        GoBack
    },
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
            name,
        }
    }
}
</script>