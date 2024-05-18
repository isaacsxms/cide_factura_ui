<template>
    <div class="d-flex flex-column justify-content-center">
        <TitleComponent>Consultar Usuario</TitleComponent>


        <GoBack />
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import axiosInstance from '@/axios'
import { useRoute } from 'vue-router'
import GoBack from '@/components/GoBackRoute.vue'
import TitleComponent from '@/components/TitleComponent.vue'

export default {
    components: {
        GoBack,
        TitleComponent
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

        return {
            username,
            name,
            userProfile,
        }
    }
}
</script>

<style scoped>
.my-hr {
    border: none;
    height: 3px;
    background-color: #000;
}
</style>