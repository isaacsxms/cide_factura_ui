<template>
  <div class="w-50">
    <div>
      <h1 class="text-center green">Login</h1>
      <p class="text-center pt-3 mb-4 fw-bold info-text">Inicie sesión en su cuenta</p>
    </div>
    <div class="d-flex flex-column form-group mb-3">
      <input
        type="text"
        class="form-control rounded-3 form-style"
        :class="{ 'border-danger': v$?.username?.$error }"
        id="username"
        v-model="state.username"
        placeholder="Nombre de usuario"
      />
    </div>
    <div class="input-group">
      <input
        :type="updatePasswordVisibility"
        class="form-control rounded-3 mb-3 form-style"
        :class="{ 'border-danger': v$?.password?.$error }"
        id="password"
        v-model="state.password"
        placeholder="Contraseña"
      />
      <button class="btn" type="button" @click="togglePasswordVisibility">
        <font-awesome-icon :icon="passwordVisibilityIcon" />
      </button>
    </div>
    <div class="d-flex flex-column text-center">
      <button type="submit" class="btn btn-success ml-auto mr-auto mb-2" @click="submitForm">
        Login
      </button>
      <button type="submit" class="btn mb-3 button-register">Register</button>
      <router-link class="forgot-password" to="forgotpassword"
        >¿Has perdido tu contraseña?</router-link
      >
    </div>
  </div>
</template>

<script>
import { ref, watch, reactive, computed } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
/*
For username and password on login, it'll only need to check if the
input exists in DB, can also check for other things, but thats the only
thing really needed, and that it's not empty, meaning required
*/
export default {
  setup() {
    const state = reactive({
      username: '',
      password: ''
    })

    const rules = {
      username: { required },
      password: { required }
    }

    const v$ = useVuelidate(rules, state)

    const submitForm = () => {
      try {
        v$.value.$validate()
        if (!v$.value.$error) {
          alert('Form succesfully submitted!')
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
