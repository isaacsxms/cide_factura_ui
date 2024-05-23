<template>
    <div class="d-flex flex-column justify-content-center">
        <TitleComponent>Consultar Usuario</TitleComponent>
        <input class="form-control me-2" type="search" placeholder="Busca usuario" aria-label="Search" v-model="search">
        <ul>
            <li v-for="user in filteredUsers" :key="user.id">{{ user.username }}</li>
        </ul>
        <GoBack />
    </div>
</template>

<script>
import { ref, onMounted, computed, reactive, watch } from 'vue'
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
        const search = ref("")
        const users = ref([])

        onMounted(async () => {
            try {
                const response = await axiosInstance.get(`/users/search`);
                console.log(response)
                if (response.status === 200) {
                    users.value = response
                }
            } catch (error) {
                console.error('Error fetching invoices:', error);
            }
        });

        const filteredUsers = computed(() => {
            if (!search.value) return users.value;
            return users.value.filter((user) =>
                user.username.toLowerCase().includes(search.value.toLowerCase())
            );
        });


        //const searchUser = computed()

        return {
            username,
            name,
            userProfile,
            search,
            filteredUsers
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