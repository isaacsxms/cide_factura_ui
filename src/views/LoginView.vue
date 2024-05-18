<template>
  <div class="w-50">
    <div>
      <TitleComponent>Login</TitleComponent>
      <p class="text-center pt-3 mb-4 fw-bold info-text">Inicie sesión en su cuenta</p>
    </div>
    <div class="d-flex flex-column form-group mb-3">
      <input type="text" class="form-control rounded-3 form-style" :class="{ 'border-danger': v$?.username?.$error }"
        id="username" v-model="state.username" placeholder="Nombre de usuario" />
    </div>
    <div class="input-group">
      <input :type="updatePasswordVisibility" class="form-control rounded-3 mb-3 form-style"
        :class="{ 'border-danger': v$?.password?.$error }" id="password" v-model="state.password"
        placeholder="Contraseña" />
      <button class="btn" type="button" @click="togglePasswordVisibility">
        <font-awesome-icon :icon="passwordVisibilityIcon" />
      </button>
    </div>
    <div class="d-flex flex-column text-center">
      <button type="submit" class="btn btn-success ml-auto mr-auto mb-2" @click="submitForm">
        Login
      </button>
      <router-link to="register"><button class="btn mb-3 button-register">Register</button></router-link>
      <router-link class="forgot-password" to="forgotpassword">¿Has perdido tu contraseña?</router-link>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import axiosInstance from '@/axios'
import { routerKey, useRouter } from 'vue-router'
import TitleComponent from '@/components/TitleComponent.vue'

/*
For username and password on login, it'll only need to check if the
input exists in DB, can also check for other things, but thats the only
thing really needed, and that it's not empty, meaning required
*/
export default {
  components: {
    TitleComponent
  },
  setup() {
    const state = reactive({
      username: '',
      password: ''
    })

    const rules = {
      username: { required },
      password: { required }
    }

    const router = useRouter()
    const v$ = useVuelidate(rules, state)

    const submitForm = async () => {
      try {
        v$.value.$validate()
        if (!v$.value.$error) {
          const response = await axiosInstance.post('/login', {
            username: state.username,
            password: state.password
          })
          if (response.status === 200) {
            console.log('Succesful login', response.data)
            const rol = response.data.rol
            if (rol === 'admin') {
              router.push(`/admin`)
            } else if (rol === 'user') {
              const userId = response.data.userId
              router.push(`/user/${userId}`)
            }
          } else {
            console.log('Login failed:', response.data) // log doesn't appear for some reason
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
      submitForm,
      v$,
      showPassword,
      togglePasswordVisibility,
      updatePasswordVisibility,
      passwordVisibilityIcon
    }
  }
}
</script>

<style scoped>
.forgot-password {
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 13px;
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
