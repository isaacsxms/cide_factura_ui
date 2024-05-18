<template>
    <p @click="goBack">Volver Atras</p>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
    setup() {
        const router = useRouter()
        const goBack = () => {
            localStorage.clear()
            router.back()
        }

        return {
            goBack
        }
    }
}
</script>

<style scoped>
p {
    text-align: center;
    margin-top: 5%;
    color: rgb(5, 112, 77);
    font-weight: 600;
    cursor: pointer;
    transition: 0.4s;
}

p:hover {
    transform: translateY(-5px);
    color: rgb(11, 189, 189);
}
</style>