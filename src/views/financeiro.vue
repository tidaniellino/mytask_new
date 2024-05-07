<template>
  <v-app>
    <v-container>
      <!-- Título da página -->
      <h1>Controle Financeiro</h1>

      <!-- Formulário para adicionar valores ganhos -->
      <v-row>
        <v-col cols="12" md="6">
          <v-form @submit.prevent="addIncome">
            <v-text-field v-model="newIncome" label="Valor Ganho (R$)"></v-text-field>
            <v-btn type="submit" color="primary">Adicionar Ganho</v-btn>
          </v-form>
        </v-col>
      </v-row>

      <!-- Formulário para adicionar despesas -->
      <v-row>
        <v-col cols="12" md="6">
          <v-form @submit.prevent="addExpense">
            <v-text-field v-model="newExpense" label="Despesa (R$)"></v-text-field>
            <v-btn type="submit" color="primary">Adicionar Despesa</v-btn>
          </v-form>
        </v-col>
      </v-row>

      <!-- Resumo financeiro -->
      <v-row>
        <v-col cols="12" md="6">
          <h2>Resumo Financeiro</h2>
          <p>Total de Ganhos: R$ {{ totalIncome.toFixed(2) }}</p>
          <p>Total de Despesas: R$ {{ totalExpense.toFixed(2) }}</p>
          <p>Saldo: R$ {{ (totalIncome - totalExpense).toFixed(2) }}</p>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      newIncome: 0,
      newExpense: 0,
      totalIncome: 0,
      totalExpense: 0,
    };
  },
  methods: {
    // Adicionar valor ganho
    addIncome() {
      // Converte para número e adiciona ao total de ganhos
      this.totalIncome += parseFloat(this.newIncome);
      // Limpa o campo do valor ganho
      this.newIncome = 0;
    },
    // Adicionar despesa
    addExpense() {
      // Converte para número e adiciona ao total de despesas
      this.totalExpense += parseFloat(this.newExpense);
      // Limpa o campo da despesa
      this.newExpense = 0;
    },
  },
};
</script>
