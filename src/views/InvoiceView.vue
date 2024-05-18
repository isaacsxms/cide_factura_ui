<template>
    <div class="d-flex flex-column justify-content-center">
        <TitleComponent class="mb-4">Invoices</TitleComponent>
        <div class="container">
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Fecha de compra</th>
                        <th scope="col">Visualizar</th>
                        <!-- Add more columns as needed -->
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(invoice, index) in invoices" :key="invoice._id">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ invoice.purchaseDate }}</td>
                        <td><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></td>
                        <!-- Add more columns as needed -->
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <GoBack />
</template>

<script>
import { ref, onMounted } from 'vue'
import axiosInstance from '@/axios'
import { useRoute, useRouter } from 'vue-router'
import GoBack from '@/components/GoBackRoute.vue'
import TitleComponent from '@/components/TitleComponent.vue'

export default {
    components: {
        GoBack,
        TitleComponent
    },
    setup() {
        const invoices = ref([]);
        const router = useRouter();
        const route = useRoute();
        const userId = route.params.id;

        onMounted(async () => {
            try {
                const response = await axiosInstance.get(`/user/invoices/${userId}`);
                if (response.status === 200) {
                    console.log(response);
                    invoices.value = response.data;
                }
            } catch (error) {
                console.error('Error fetching invoices:', error);
            }
        });

        return {
            invoices,
        }
    }
}
</script>
