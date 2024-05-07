<template>
  <div>
    <v-app theme="dark">
      <v-main>
        <v-container>
          <h1>Painel Pessoal</h1>
          <v-row>
            <!-- Card Saldo Financeiro -->
            <v-col cols="12" md="4">
              <v-card class="dashboard-card">
                <v-card-title class="dashboard-card-title">Saldo Financeiro</v-card-title>
                <v-card-text>
                  <p>R$ 1000,00</p>
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Card Tarefas Atrasadas -->
            <v-col cols="12" md="4">
              <v-card class="dashboard-card">
                <v-card-title class="dashboard-card-title"
                  >Tarefas Atrasadas</v-card-title
                >
                <v-card-text>
                  <p>2 tarefas</p>
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Card Reuniões -->
            <v-col cols="12" md="4">
              <v-card class="dashboard-card">
                <v-card-title class="dashboard-card-title">Reuniões</v-card-title>
                <v-card-text>
                  <p>3 reuniões</p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
};
</script>

<style scoped>
.dashboard-card {
  height: 200px;
  border-radius: 10px;
  text-align: center;
  align-content: center;
}

.dashboard-card-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}
h1 {
  text-align: center;
}
</style>
