<template>
  <AppLayout>
    <v-main>
      <v-container>
        <h1>Painel Pessoal</h1>
        <br>
        <v-row justify="center">
          <!-- Card Saldo Financeiro -->
          <v-col cols="12" md="4">
            <v-card class="dashboard-card">
              <v-card-title class="dashboard-card-title">Saldo Financeiro</v-card-title>
              <v-card-text class="dashboard-card-text">
                <p>R$ {{ saldoFinanceiro }}</p>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Card Tarefas -->
          <v-col cols="12" md="4">
            <v-card class="dashboard-card">
              <v-card-title class="dashboard-card-title">Tarefas</v-card-title>
              <v-card-text class="dashboard-card-text">
                <p>{{ tarefasTotais }} tarefas</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </AppLayout>
</template>

<script>
import AppLayout from '@/components/AppLayout.vue'; // Importa o componente AppLayout

export default {
  name: "Home",
  components: {
    AppLayout, // Registra o componente AppLayout
  },
  data() {
    return {
      saldoFinanceiro: null,
      tarefasTotais: null,
      userId: 1, // Substitua pelo ID do usuário logado
    };
  },
  mounted() {
    this.fetchSaldoFinanceiro();
    this.fetchTarefasTotais();
  },
  methods: {
    fetchSaldoFinanceiro() {
      fetch(`http://localhost:3000/api/saldo/${this.userId}`)
        .then(response => response.json())
        .then(data => {
          this.saldoFinanceiro = data.saldo;
        })
        .catch(error => {
          console.error("Erro ao buscar o saldo financeiro:", error);
        });
    },
    fetchTarefasTotais() {
      fetch(`http://localhost:3000/api/tarefas/${this.userId}`)
        .then(response => response.json())
        .then(data => {
          this.tarefasTotais = data.tarefasTotais;
        })
        .catch(error => {
          console.error("Erro ao buscar as tarefas:", error);
        });
    },
  },
};
</script>

<style scoped>
.dashboard-card {
  height: 200px;
  border-radius: 10px;
  text-align: center;
}

.dashboard-card-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.dashboard-card-text {
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  text-align: center;
}
</style>
