<template>
    <div class="d-flex flex-column justify-content-center">
        <TitleComponent>Consultar Usuario</TitleComponent>
        <input class="form-control me-2" type="search" placeholder="Busca usuario" aria-label="Search" v-model="search">
        <ul class="list-group mt-3">
            <li class="list-group-item" v-for="user in filteredUsers" :key="user._id" @click="showUserInfo(user._id)">
                {{ user.username }}
            </li>
        </ul>
        <GoBack />
    </div>
</template>


<script>
import { ref, onMounted, computed } from 'vue'
import axiosInstance from '@/axios'
import { useRouter } from 'vue-router'
import GoBack from '@/components/GoBackRoute.vue'
import TitleComponent from '@/components/TitleComponent.vue'

export default {
    components: {
        GoBack,
        TitleComponent
    },
    setup() {
        const search = ref("")
        const users = ref([])
        const router = useRouter()

        onMounted(async () => {
            try {
                const response = await axiosInstance.get(`/users`);
                console.log(response)
                if (response.status === 200) {
                    users.value = response.data
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        });

        const filteredUsers = computed(() => {
            if (!search.value) return users.value;
            return users.value.filter((user) =>
                user.username.toLowerCase().includes(search.value.toLowerCase())
            );
        });

        const showUserInfo = (userId) => {
            router.push(`/admin/check/user/${userId}`)
        }

        return {
            search,
            filteredUsers,
            showUserInfo
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

.list-group-item {
    cursor: pointer;
    transition: background-color 0.3s;
}

.list-group-item:hover {
    background-color: #f0f0f0;
}
</style>
