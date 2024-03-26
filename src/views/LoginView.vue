<script setup></script>

<template>
  <div>
    <div>
      <h1 class="text-center green">Login</h1>
      <h3 class="text-center text-muted lead pt-3">Inicie sesión en su cuenta</h3>
    </div>
    <form>
      <div class="form-group mb-3">
        <label class="mb-2" for="username">Usuario</label>
        <input
          type="text"
          class="form-control rounded-3"
          id="username"
          placeholder="Nombre de usuario"
        />
      </div>
      <div class="form-group mb-3">
        <label class="mb-2" for="password">Contraseña</label>
        <input type="text" class="form-control rounded-3" id="password" placeholder="Contraseña" />
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-primary ml-auto mr-auto">Login</button>
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
</style>
