<template>
  <div class="w-100">
    <div>
      <h1 class="text-center green">Register</h1>
      <p class="text-center pt-3 mb-4 fw-bold info-text">Inicie sesión en su cuenta</p>
    </div>
    <div class="row mb-4">
      <div class="col-md-4 mb-2">
        <input type="text" class="form-control rounded-3 form-style" :class="{ 'border-danger': v$?.username?.$error }"
          id="username" v-model="state.username" placeholder="Nombre de usuario" />
      </div>
      <div class="col-md-4 mb-2">
        <input type="text" class="form-control rounded-3 form-style" :class="{ 'border-danger': v$?.name?.$error }"
          id="name" v-model="state.name" placeholder="Nombre" />
      </div>
      <div class="col-md-4 mb-2">
        <input type="text" class="form-control rounded-3 form-style" :class="{ 'border-danger': v$?.surname?.$error }"
          id="surname" v-model="state.surname" placeholder="Apellido" />
      </div>
      <div class="col-md-4 mb-2">
        <input type="text" class="form-control rounded-3 form-style"
          :class="{ 'border-danger': v$?.second_surname?.$error }" id="second_surname" v-model="state.second_surname"
          placeholder="Segundo apellido" />
      </div>
      <div class="col-md-4 mb-2">
        <input type="text" class="form-control rounded-3 form-style" :class="{ 'border-danger': v$?.address?.$error }"
          id="address" v-model="state.address" placeholder="Dirección" />
      </div>
      <div class="col-md-4 mb-2">
        <input type="date" class="form-control rounded-3 form-style"
          :class="{ 'border-danger': v$?.date_of_birth?.$error }" id="date_of_birth" v-model="state.date_of_birth"
          placeholder="Fecha de nacimiento" />
      </div>
      <div class="col-md-4 mb-2">
        <input type="text" class="form-control rounded-3 form-style" :class="{ 'border-danger': v$?.identity?.$error }"
          id="identity" v-model="state.identity" placeholder="Número de identidad (DNI o NIE)" />
      </div>
      <div class="col-md-4 mb-2" v-if="isUnder18">
        <input type="text" class="form-control rounded-3 form-style"
          :class="{ 'border-danger': v$?.tutor_name?.$error }" id="tutor_name" v-model="state.tutor_name"
          placeholder="Tutor legal: Nombre" />
      </div>
      <div class="col-md-4 mb-2" v-if="isUnder18">
        <input type="text" class="form-control rounded-3 form-style"
          :class="{ 'border-danger': v$?.tutor_identity?.$error }" id="tutor_identity" v-model="state.tutor_identity"
          placeholder="Tutor legal: DNI o NIE" />
      </div>
      <div class="col-md-4 mb-2">
        <input type="tel" class="form-control rounded-3 form-style" :class="{ 'border-danger': v$?.telephone?.$error }"
          id="telephone" v-model="state.telephone" placeholder="Teléfono" />
      </div>
      <div class="col-md-4 mb-2">
        <input type="email" class="form-control rounded-3 form-style" :class="{ 'border-danger': v$?.email?.$error }"
          id="email" v-model="state.email" placeholder="E-mail" />
      </div>
      <div class="col-md-4 mb-2">
        <input :type="updatePasswordVisibility" class="form-control rounded-3 form-style"
          :class="{ 'border-danger': v$?.password?.$error }" id="password" v-model="state.password"
          placeholder="Contraseña" />
      </div>
      <div class="col-md-4 mb-2">
        <input :type="updatePasswordVisibility" class="form-control rounded-3 form-style"
          :class="{ 'border-danger': v$?.confirm_password?.$error }" id="confirm_password"
          v-model="state.confirm_password" placeholder="Confirmar contraseña" />
      </div>
      <div class="col-md-4 mb-2">
        <input type="text" class="form-control rounded-3 form-style" :class="{ 'border-danger': v$?.iban?.$error }"
          id="iban" v-model="state.iban" placeholder="IBAN" />
      </div>
      <div class="col-md-4 mb-2">
        <select class="form-control rounded-3 form-style" :class="{ 'border-danger': v$?.enrolling_in?.$error }"
          id="enrolling_in" v-model="state.enrolling_in">
          <option value="" disabled selected>Curso academico</option>
          <option v-for="course in courses" :key="course" :value="course">{{ course }}</option>
        </select>
      </div>
      <div class="col-md-4 mb-2">
        <select class="form-control rounded-3 form-style" :class="{ 'border-danger': v$?.large_family?.$error }"
          id="large_family" v-model="state.large_family">
          <option value="" disabled selected>Familia numerosa</option>
          <option value="si">Sí</option>
          <option value="no">No</option>
        </select>
      </div>
    </div>
    <div class="d-flex justify-content-center mt-2">
      <p class="fw-bold">Seguro anual: 23€</p>
    </div>
    <div class="d-flex justify-content-center mt-2">
      <button type="submit" class="w-50 btn btn-success ml-auto mr-auto mb-2" @click="submitForm">
        Register
      </button>
    </div>
    <GoBack />
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import axiosInstance from '@/axios'
import useVuelidate from '@vuelidate/core'
import { required, email, sameAs, helpers, minLength, maxLength } from '@vuelidate/validators'
import { useRouter } from 'vue-router'
import GoBack from '@/components/GoBackRoute.vue'

export default {
  components: {
    GoBack
  },
  setup() {
    const state = reactive({
      username: '',
      password: '',
      confirm_password: '',
      name: '',
      surname: '',
      second_surname: '',
      address: '',
      date_of_birth: '',
      identity: '',
      tutor_name: '',
      tutor_identity: '',
      telephone: '',
      email: '',
      iban: '',
      enrolling_in: '',
      large_family: '',
    })


    const courses = ref([
      'FPGS DAM',
      'FPGS Administración',
      'FPGS DAW',
      'CFGM Administración',
      'CFGM Electricidad',
    ])

    const isUnder18 = computed(() => {
      const today = new Date()
      const birthDate = new Date(state.date_of_birth)
      const age = today.getFullYear() - birthDate.getFullYear()
      const m = today.getMonth() - birthDate.getMonth()
      return m < 0 || (m === 0 && today.getDate() < birthDate.getDate()) ? age - 1 : age < 18
    })

    const phoneValidator = helpers.withMessage(
      'Invalid phone number. It should be 10 digits long.',
      value => /^\d{9}$/.test(value)
    )

    const nameValidator = helpers.withMessage(
      'Name must contain only letters.',
      value => /^[a-zA-Z]+$/.test(value)
    )

    const ibanValidator = helpers.withMessage(
      'Invalid IBAN format.',
      value => /^[A-Z]{2}[0-9A-Z]{13,31}$/.test(value)
    )

    const rules = {
      username: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(15)
      },
      password: { required },
      confirm_password: {
        required,
        sameAsPassword: sameAs(computed(() => state.password))
      },
      name: {
        required,
        maxLength: maxLength(20),
        nameValidator
      },
      surname: {
        required,
        maxLength: maxLength(20),
        nameValidator
      },
      second_surname: {
        maxLength: maxLength(20),
      },
      address: { required },
      date_of_birth: { required },
      identity: {
        required,
        regex: helpers.regex(/^((\d{8}[A-Z])|([XYZ]\d{7}[A-Z]))$/i) // regex for dni - nie
      },
      tutor_name: {
        required: isUnder18,
        maxLength: maxLength(20),
      },
      tutor_identity: {
        required: isUnder18,
        regex: helpers.regex(/^((\d{8}[A-Z])|([XYZ]\d{7}[A-Z]))$/i) // regex for dni - nie
      },
      telephone: {
        required,
        phoneValidator
      },
      email: {
        required,
        email
      },
      iban: {
        required,
        ibanValidator
      },
      enrolling_in: { required },
      large_family: { required }
    }

    const router = useRouter()
    const v$ = useVuelidate(rules, state)

    const submitForm = async () => {
      try {
        v$.value.$validate()
        if (!v$.value.$error) {
          const response = await axiosInstance.post('/register', {
            username: state.username,
            password: state.password,
            name: state.name,
            surname: state.surname,
            second_surname: state.second_surname,
            address: state.address,
            date_of_birth: state.date_of_birth,
            identity: state.identity,
            tutor: {
              name: state.tutor_name,
              identity: state.tutor_identity
            },
            telephone: state.telephone,
            email: state.email,
            iban: state.iban,
            enrolling_in: state.enrolling_in,
            large_family: state.large_family
          })
          if (response.status === 201) {
            console.log('User registered successfully')
            const userId = response.data.userId // Assuming the response contains the user ID

            // Second POST request to insert the insurance fee
            const insuranceResponse = await axiosInstance.post(`user/${userId}/purchase`, {
              articles: [
                {
                  id: 'seguro',
                  name: 'Seguro anual',
                  price: 23,
                  quantity: 1
                }
              ],
              total: 23
            })
            if (insuranceResponse.status === 201) {
              console.log('Insurance fee registered successfully')
              router.push('/')
            } else {
              console.log('Failed to register insurance fee:', insuranceResponse.data)
            }
          } else {
            console.log('Register failed:', response.data)
          }
        } else {
          console.error('Error on input inserted...')
        }
      } catch (error) {
        console.error(error)
      }
    }

    const showPassword = ref(false)

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value
    }

    const updatePasswordVisibility = computed(() => {
      return showPassword.value ? 'text' : 'password'
    })

    const passwordVisibilityIcon = computed(() => {
      return showPassword.value ? 'fa-eye-slash' : 'fa-eye'
    })

    return {
      state,
      courses,
      submitForm,
      v$,
      isUnder18,
      showPassword,
      togglePasswordVisibility,
      updatePasswordVisibility,
      passwordVisibilityIcon
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

* {
  font-family: 'Montserrat', sans-serif;
}

.green {
  color: rgb(21, 133, 21);
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  text-shadow: 1px 1px rgb(0, 0, 0);
}

.form-style {
  background: rgba(215, 255, 205, 0.575);
}

.info-text {
  font-weight: 100;
  font-size: 14px;
}

.button-register {
  background: rgba(128, 128, 128, 0.274);
}

a {
  color: rgb(21, 133, 21);
  text-decoration: none;
}
</style>
