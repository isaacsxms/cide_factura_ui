<template>
    <TitleComponent class="mb-4">Tienda</TitleComponent>
    <div class="d-flex justify-content-center w-100">
        <div class="w-50">
            <h3>Artículos:</h3>
            <div class="form-group">
                <input type="number" class=" spinner" id="menjador" v-model.number="menjadorQuantity" min="0" max="5" />
                <label for="menjador">Menjador - <b>8.5€ la unidad</b></label>
            </div>
            <div class="form-group">
                <input type="number" class="spinner" id="matinera" v-model.number="matineraQuantity" min="0" max="5" />
                <label for="matinera">Matinera - <b>8.5€ la unidad</b></label>
            </div>
            <div class="form-check" v-for="item in articles" :key="item.id">
                <input class="form-check-input" type="checkbox" :id="item.id" v-model="item.selected">
                <label class="form-check-label" :for="item.id">{{ item.name }} - <b>{{ item.price }}€</b></label>
            </div>
        </div>
        <div class="w-50">
            <h3>Extraescolares:</h3>
            <div class="form-check" v-for="item in extracurriculars" :key="item.id">
                <input class="form-check-input" type="checkbox" :id="item.id" v-model="item.selected">
                <label class="form-check-label" :for="item.id">{{ item.name }} - <b>{{ item.price }}€</b></label>
            </div>
        </div>
    </div>
    <div class="d-flex justify-content-center mt-4">
        <h5>Total: {{ total }}€</h5>
    </div>
    <div class="d-flex justify-content-center mt-4"><button type="submit" class="w-100 btn btn-success"
            @click="submitPurchase">Comprar</button>
    </div>
    <GoBack />
</template>


<script>
import { ref, onMounted, reactive, computed } from 'vue'
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
        // Define a reactive property to hold the username
        const username = ref('User Menu Page')
        const name = ref('First name')
        const route = useRoute()
        const router = useRouter()
        const userId = route.params.id

        onMounted(async () => {
            try {
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

        const menjadorPrice = 10;
        const matineraPrice = 5;

        const menjadorQuantity = ref(0);
        const matineraQuantity = ref(0);

        const articles = reactive([
            { id: 'camiseta', name: 'Camiseta', price: 25, selected: false },
            { id: 'calzones', name: 'Calzones', price: 25, selected: false },
            { id: 'uniforme', name: 'Uniforme', price: 25, selected: false }
        ]);

        const extracurriculars = reactive([
            { id: 'master-xef', name: 'Master Xef', price: 15, selected: false },
            { id: 'arduino', name: 'Arduino', price: 12, selected: false },
            { id: 'gimnasia', name: 'Gimnàsia', price: 10, selected: false },
            { id: 'futbol', name: 'Futbol', price: 10, selected: false },
            { id: 'basquet', name: 'Basquet', price: 10, selected: false },
            { id: 'robotica', name: 'Robotica', price: 18, selected: false }
        ]);

        const total = computed(() => {
            const articleTotal = articles.filter(item => item.selected).reduce((sum, item) => sum + item.price, 0);
            const extracurricularTotal = extracurriculars.filter(item => item.selected).reduce((sum, item) => sum + item.price, 0);
            const menjadorTotal = menjadorQuantity.value * menjadorPrice;
            const matineraTotal = matineraQuantity.value * matineraPrice;

            return articleTotal + extracurricularTotal + menjadorTotal + matineraTotal;
        });


        const submitPurchase = async () => {
            const selectedItems = {
                menjadorQuantity: menjadorQuantity.value,
                matineraQuantity: matineraQuantity.value,
                articles: articles.filter(item => item.selected),
                extracurriculars: extracurriculars.filter(item => item.selected),
                total: total.value
            };

            try {
                const response = await axiosInstance.post(`user/${userId}/purchase`, selectedItems);
                console.log(response.status)
                if (response.status === 201) {
                    console.log("Purchase submitted successfully");
                    router.back();
                } else {
                    console.error("Error submitting purchase");
                }
            } catch (error) {
                console.error('Error submitting purchase:', error);
            }
        };

        return {
            username,
            name,
            menjadorQuantity,
            matineraQuantity,
            articles,
            extracurriculars,
            total,
            submitPurchase
        }
    }
}
</script>

<style scoped>
.spinner {
    width: 10%;
    height: 100%;
    border-radius: 15%;
    border-color: rgba(29, 20, 20, 0.089);
    margin-right: 2%;
}
</style>