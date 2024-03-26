<script setup></script>

<template>
  <div class="w-50">
    <div>
      <h1 class="text-center green">Login</h1>
      <h3 class="text-center text-muted lead pt-3 mb-4">Inicie sesión en su cuenta</h3>
    </div>
    <form>
      <div class="d-flex flex-column form-group mb-3">
        <input
          type="text"
          class="form-control rounded-3 mb-3"
          id="username"
          placeholder="Nombre de usuario"
        />

        <input
          type="text"
          class="form-control rounded-3 mb-2"
          id="password"
          placeholder="Contraseña"
        />
      </div>
      <div class="d-flex flex-column text-center">
        <button type="submit" class="btn btn-success ml-auto mr-auto mb-2">Login</button>
        <button type="submit" class="btn btn-success ml-auto mr-auto mb-3">Register</button>
        <router-link class="forgot-password" to="forgotpassword"
          >¿Has perdido tu contraseña?</router-link
        >
      </div>
    </form>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
.green {
  color: rgb(21, 133, 21);
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  text-shadow: 1px 1px rgb(0, 0, 0);
}

.forgot-password {
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
}
</style>
