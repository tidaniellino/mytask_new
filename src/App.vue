<template>
  <v-app>
    <!-- Renderiza a rota apenas se autenticado -->
    <router-view v-if="isAuthenticated" />
    
    <!-- Renderiza a tela de login se não estiver autenticado -->
    <v-card v-else>
      <router-view />
    </v-card>
  </v-app>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      // Verifica se o usuário está autenticado
      return this.$store.getters.isAuthenticated;
    }
  }
};
</script>

<style>
/* Estilos podem ser adicionados conforme necessário */
</style>
