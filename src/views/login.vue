<template>
  <v-app theme="dark">
    <div>
      <v-img class="mx-auto my-6" max-width="228" src="/src/assets/mytask.png"></v-img>

      <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
        <div class="text-subtitle-1 text-medium-emphasis">Usuário</div>

        <v-text-field v-model="cpf" density="compact" placeholder="CPF" prepend-inner-icon="mdi-account-circle"
          variant="outlined"></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">Senha</div>

        <v-text-field v-model="senha" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'" density="compact" placeholder="Digite sua senha"
          prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="visible = !visible">
        </v-text-field>

        <v-btn class="mb-8" color="blue" size="large" variant="tonal" block @click="handleLogin">
          Log In
        </v-btn>

        <v-btn class="mb-8" color="blue" size="large" variant="tonal" block to="/cada_user">
          Cadastrar-se
        </v-btn>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      visible: false,
      cpf: '',
      senha: ''
    };
  },
  methods: {
    ...mapActions(['login']),
    async handleLogin() {
      if (!this.cpf || !this.senha) {
        alert('Por favor, preencha o CPF e a senha.');
        return;
      }

      try {
        await this.login({ cpf: this.cpf, senha: this.senha });
        const redirect = this.$route.query.redirect || '/home';
        this.$router.push(redirect);
      } catch (error) {
        alert(error.message || 'CPF ou senha incorretos. Por favor, tente novamente.');
      }
    }
  }
};
</script>

<style>
/* Adicione seus estilos aqui */
</style>
