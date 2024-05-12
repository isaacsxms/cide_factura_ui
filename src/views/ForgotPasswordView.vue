<template>
  <div class="w-50">
    <router-link to="/"
      ><font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket"
    /></router-link>
    <div>
      <h1 class="text-center green">Reestablecer contraseña</h1>
      <p class="text-center pt-3 mb-4 fw-bold info-text">
        Introduzca una nueva contraseña y confirmela
      </p>
    </div>
    <div class="d-flex flex-column form-group mb-3">
      <input
        type="text"
        class="form-control rounded-3 mb-3 form-style"
        :class="{ 'border-danger': v$?.username?.$error }"
        id="username"
        v-model="state.username"
        placeholder="Nombre de usuario"
      />

      <input
        type="text"
        class="form-control rounded-3 mb-3 form-style"
        :class="{ 'border-danger': v$?.identityDocument?.$error }"
        id="identityDocument"
        v-model="state.identityDocument"
        placeholder="DNI/NIE"
      />

      <input
        type="text"
        class="form-control rounded-3 mb-3 form-style"
        :class="{ 'border-danger': v$?.newPassword?.$error }"
        id="newPassword"
        v-model="state.newPassword"
        placeholder="Nueva Contraseña"
      />

      <input
        type="text"
        class="form-control rounded-3 mb-2 form-style"
        :class="{ 'border-danger': v$?.confirmPassword?.$error }"
        id="confirmPassword"
        v-model="state.confirmPassword"
        placeholder="Confirme contraseña"
      />
    </div>
    <div class="d-flex flex-column text-center">
      <button type="submit" class="btn btn-success ml-auto mr-auto mb-2" @click="submitForm">
        Reestablecer
      </button>
    </div>
  </div>
</template>

<script>
import { ref, watch, reactive, VueElement, computed } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, helpers, minLength, sameAs } from '@vuelidate/validators'
import axios from 'axios'

/*
For username and password on login, it'll only need to check if the
input exists in DB, can also check for other things, but thats the only
thing really needed, and that it's not empty, meaning required
*/
export default {
  setup() {
    const state = reactive({
      username: '',
      identityDocument: '',
      newPassword: '',
      confirmPassword: ''
    })

    const rules = {
      username: { required },
      identityDocument: {
        required,
        regex: helpers.regex(/^((\d{8}[A-Z])|([XYZ]\d{7}[A-Z]))$/i) // regex for dni - nie
      },
      newPassword: { required, minLength: minLength(6) },
      confirmPassword: { required, sameAsPassword: sameAs(computed(() => state.newPassword)) }
    }

    const v$ = useVuelidate(rules, state)

    const submitForm = async () => {
      if (state.newPassword == state.confirmPassword) {
        console.log('Hey!')
      }
      try {
        v$.value.$validate()
        if (!v$.value.$error) {
          const response = await axios.put('http://localhost:3000/changepassword', {
            username: state.username,
            identityDocument: state.identityDocument,
            newPassword: state.newPassword
          })

          console.log("Response: ", response)
          if (response.status == 200) {
            alert('Form succesfully submitted!')
          } else if (response.status == 401) {
            alert('User not found!')
          } else {
            console.log('Internal error')
          }
        } else {
          console.error('Error on input inserted...')
        }
      } catch (error) {
        console.error(error)
      }
    }

    return { state, submitForm, v$ }
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
