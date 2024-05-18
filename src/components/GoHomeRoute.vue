<template>
    <font-awesome-icon class="btn " @click="goHome" icon="fa-solid fa-arrow-right-from-bracket btn" />
</template>

<script>
import { useRouter } from 'vue-router'

export default {
    setup() {
        const router = useRouter()
        const goHome = () => {
            // Clear localStorage and cache
            localStorage.clear()

            // Navigate to home
            router.push('/')
        }

        return {
            goHome
        }
    }
}
</script>

<style scoped>
.btn {
    cursor: pointer;
    font-weight: 600;
    transition: 0.4s;
    position: absolute;
    top: 27%;
    left: 70%;
}

.btn:hover {
    transform: translateY(-5px);
    color: green;
}
</style>