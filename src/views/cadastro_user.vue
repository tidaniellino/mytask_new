<template>
  <v-app theme="dark">
    <v-container class="d-flex justify-center align-center fill-height">
      <v-card class="pa-4" outlined>
        <v-card-title>
          <span class="headline">Cadastro de Usuário</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="user.nome" :rules="[rules.required]" label="Nome" required></v-text-field>
            <v-text-field v-model="user.email" :rules="[rules.required, rules.email]" label="E-mail" required type="email"></v-text-field>
            <v-text-field v-model="user.cpf" :rules="[rules.required, rules.cpf]" label="CPF" required type="text"></v-text-field>
            <v-text-field v-model="user.senha" :rules="[rules.required, rules.min]" label="Senha" required type="password"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="grey" @click="clearForm">Limpar</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="submitForm">Enviar</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      user: {
        nome: '',
        email: '',
        cpf: '',
        senha: ''
      },
      rules: {
        required: value => !!value || 'Campo obrigatório',
        email: value => /.+@.+\..+/.test(value) || 'E-mail inválido',
        cpf: value => /^\d+$/.test(value) || 'CPF deve conter apenas números',
        min: value => value.length >= 6 || 'Senha deve ter pelo menos 6 caracteres'
      }
    };
  },
  methods: {
    async submitForm() {
      if (this.$refs.form.validate()) {
        try {
          const response = await fetch('http://localhost:3000/cadastrar-usuario', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.user)
          });

          if (!response.ok) {
            throw new Error('Erro ao cadastrar usuário');
          }

          const data = await response.text();
          alert('Formulário enviado com sucesso: ' + data);
          this.clearForm();
        } catch (error) {
          alert('Erro ao enviar o formulário: ' + error.message);
        }
      } else {
        alert('Por favor, preencha todos os campos corretamente.');
      }
    },
    clearForm() {
      this.$refs.form.reset();
      this.user = {
        nome: '',
        email: '',
        cpf: '',
        senha: ''
      };
    }
  }
};
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}

.headline {
  color: #fff;
}

.v-card {
  max-width: 500px;
  width: 100%;
}

.v-text-field label,
.v-text-field input {
  color: #fff;
}

.v-btn {
  color: #fff;
}
</style>
