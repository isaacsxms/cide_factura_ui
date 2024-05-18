<template>
    <div class="d-flex flex-column justify-content-center">
        <TitleComponent class="mb-4">Factura</TitleComponent>
        <div class="container">
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Usuario</th>
                        <th scope="col">Fecha de compra</th>
                        <th scope="col">Valida</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(validation, index) in validations" :key="validation._id">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ validation.username }}</td>
                        <td>{{ validation.purchaseDate }}</td>
                        <td>
                            <input type="checkbox" v-model="selectedValidations" :value="validation._id" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <button type="submit" class="w-100 btn btn-success mt-3" @click="validateSelectedPurchases">Validar</button>
    </div>
    <GoBack />
</template>

<script>
import { ref, onMounted } from 'vue'
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
        const validations = ref([]);
        const selectedValidations = ref([]);
        const router = useRouter();
        onMounted(async () => {
            try {
                const response = await axiosInstance.get('/admin/validations');
                if (response.status === 200) {
                    console.log(response);
                    validations.value = response.data;
                }
            } catch (error) {
                console.error('Error fetching validations:', error);
            }
        });

        const validateSelectedPurchases = async () => {
            for (const purchaseId of selectedValidations.value) {
                const validation = validations.value.find(v => v._id === purchaseId);
                console.log("Validation: ", validation)
                if (validation) {
                    try {
                        // Remove the purchase from the validations collection
                        await axiosInstance.delete(`/admin/validations/${purchaseId}`);

                        // Add the validated purchase to the facturas collection
                        await axiosInstance.post('/admin/invoice', validation);

                        // Remove the purchase from the local list
                        validations.value = validations.value.filter(v => v._id !== purchaseId);
                    } catch (error) {
                        console.error('Error validating purchase:', error);
                    }
                }
            }
            // Clear the selected validations
            selectedValidations.value = [];
        };

        return {
            validations,
            selectedValidations,
            validateSelectedPurchases,
        }
    }
}
</script>