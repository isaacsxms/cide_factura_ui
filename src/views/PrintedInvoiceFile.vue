<template>
    <div class="d-flex flex-column justify-content-center">
        <TitleComponent>Factura</TitleComponent>
        <div class="container mt-4">
            <div class="card">
                <div class="card-header">
                    Detalles de la factura
                </div>
                <div class="card-body">
                    <div v-if="invoice">
                        <div class="row mb-3">
                            <div class="col-sm-6">
                                <strong>Fecha de compra:</strong> {{ invoice.purchaseDate }}
                            </div>
                            <!-- Add more invoice details as needed -->
                        </div>
                        <hr class="my-hr">
                        <div class="table-responsive">
                            <table v-if="invoice.articles.length > 0" class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Precio unitario</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in invoice.articles" :key="index">
                                        <td>{{ item.name }}</td>
                                        <td>{{ item.quantity }}</td>
                                        <td>{{ item.price }}</td>
                                        <td>{{ item.quantity * item.price }}</td>
                                    </tr>
                                    <!-- Add more rows for extracurriculars if needed -->
                                </tbody>
                            </table>
                            <table v-if="invoice.extracurriculars.length > 0" class="table table-bordered">
                                <thead>
                                    <p>Asignaturas Extracurriculares</p>
                                    <tr>
                                        <th>Asignatura</th>
                                        <th>Precio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in invoice.extracurriculars" :key="index">
                                        <td>{{ item.name }}</td>
                                        <td>{{ item.price }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="text-right">
                            <strong>Total:</strong> {{ invoice.total }}
                        </div>
                    </div>
                    <div v-else>
                        <p>No se encontró la factura.</p>
                    </div>
                </div>
            </div>
        </div>
        <GoBack />
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axiosInstance from '@/axios'
import GoBack from '@/components/GoBackRoute.vue'
import TitleComponent from '@/components/TitleComponent.vue'
import { useRoute } from 'vue-router'


export default {
    components: {
        GoBack,
        TitleComponent
    },
    setup() {
        const invoice = ref(null);
        const route = useRoute();

        const invoiceId = route.params.id;

        onMounted(async () => {
            try {
                const response = await axiosInstance.get(`/user/invoice/${invoiceId}`);
                if (response.status === 200) {
                    console.log(response.data)
                    invoice.value = response.data;
                }
            } catch (error) {
                console.error('Error fetching invoice:', error);
            }
        });

        return {
            invoice,
        };
    }
};
</script>

<style scoped>
.my-hr {
    border: none;
    height: 3px;
    background-color: #000;
    /* Change the color as needed */
}
</style>