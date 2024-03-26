<script setup></script>

<template>
  <router-link to="/"
    ><font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket"
  /></router-link>

  <div class="w-50">
    <div>
      <h1 class="text-center green">Reestablecer Contraseña</h1>
      <h3 class="text-center text-muted lead pt-3 mb-4">
        Introduzca una nueva contraseña y confirmela
      </h3>
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
          class="form-control rounded-3"
          id="password"
          placeholder="Nueva Contraseña"
        />
      </div>
      <div class="d-flex flex-column text-center">
        <button type="submit" class="btn btn-success ml-auto mr-auto mb-2">Login</button>
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
