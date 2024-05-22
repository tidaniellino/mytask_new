<template>
  <AppLayout>
    <v-main>
      <v-container class="d-flex justify-center align-center fill-height">
        <v-row>
          <!-- Formulário para adicionar lucro -->
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title>Adicionar Lucro</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="adicionarLucro">
                  <v-text-field v-model.number="lucro.valor" label="Valor (R$)" type="number" required></v-text-field>
                  <v-text-field v-model="lucro.observacao" label="Observação"></v-text-field>
                  <v-btn type="submit" color="primary">Adicionar Lucro</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Formulário para adicionar gastos -->
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title>Adicionar Gastos</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="adicionarGastos">
                  <v-text-field v-model.number="gastos.valor" label="Valor (R$)" type="number" required></v-text-field>
                  <v-text-field v-model="gastos.observacao" label="Observação"></v-text-field>
                  <v-btn type="submit" color="primary">Adicionar Gastos</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Campo bloqueado para mostrar saldo -->
          <v-col cols="12">
            <v-card>
              <v-card-title>Saldo Total</v-card-title>
              <v-card-text>
                <v-text-field v-model="saldoTotal" label="Saldo Total (R$)" readonly></v-text-field>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Tabela para listar os valores adicionados -->
          <v-col cols="12">
            <v-card>
              <v-card-title>Valores Adicionados</v-card-title>
              <v-card-text>
                <v-data-table :headers="headers" :items="valoresAdicionados" class="elevation-1"></v-data-table>
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
  name: 'Financeiro',
  components: {
    AppLayout, // Registra o componente AppLayout
  },
  data() {
    return {
      lucro: {
        valor: 0,
        observacao: ''
      },
      gastos: {
        valor: 0,
        observacao: ''
      },
      saldoTotal: 0,
      valoresAdicionados: [],
      headers: [
        { text: 'Tipo', value: 'tipo' },
        { text: 'Valor (R$)', value: 'valor' },
        { text: 'Observação', value: 'observacao' },
        { text: 'Data', value: 'data' }
      ],
      idUsuario: 1  // Assumindo que você tem o ID do usuário logado disponível
    };
  },
  methods: {
    formatDate(date) {
      const padZero = (num) => num.toString().padStart(2, '0');
      const year = date.getFullYear();
      const month = padZero(date.getMonth() + 1);
      const day = padZero(date.getDate());
      const hours = padZero(date.getHours());
      const minutes = padZero(date.getMinutes());
      const seconds = padZero(date.getSeconds());
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    adicionarLucro() {
      const dataAtual = new Date();

      // Valida se o valor é um número
      if (isNaN(this.lucro.valor) || this.lucro.valor <= 0) {
        alert('Por favor, insira um valor válido para o lucro.');
        return;
      }

      // Adiciona o lucro ao saldo total
      this.saldoTotal += parseFloat(this.lucro.valor);

      // Adiciona o lucro à lista de valores adicionados com a data atual
      this.valoresAdicionados.push({
        tipo: 'Lucro',
        valor: this.lucro.valor,
        observacao: this.lucro.observacao,
        data: this.formatDate(dataAtual)
      });

      // Envia os dados ao backend para salvar no banco de dados
      fetch('http://localhost:3000/api/lucros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_usuario: this.idUsuario,
          valor: this.lucro.valor,
          observacao: this.lucro.observacao,
          saldo_total: this.saldoTotal,
          data_insercao: this.formatDate(dataAtual)
        })
      }).then(response => {
        if (response.ok) {
          console.log('Lucro inserido com sucesso');
        } else {
          console.error('Erro ao inserir lucro');
        }
      }).catch(error => {
        console.error('Erro na requisição:', error);
      });

      // Limpa os campos após o registro
      this.lucro.valor = 0;
      this.lucro.observacao = '';
    },
    adicionarGastos() {
      const dataAtual = new Date();

      // Valida se o valor é um número
      if (isNaN(this.gastos.valor) || this.gastos.valor <= 0) {
        alert('Por favor, insira um valor válido para os gastos.');
        return;
      }

      // Subtrai os gastos do saldo total
      this.saldoTotal -= parseFloat(this.gastos.valor);

      // Adiciona os gastos à lista de valores adicionados com a data atual
      this.valoresAdicionados.push({
        tipo: 'Gastos',
        valor: this.gastos.valor,
        observacao: this.gastos.observacao,
        data: this.formatDate(dataAtual)
      });

      // Envia os dados ao backend para salvar no banco de dados
      fetch('http://localhost:3000/api/gastos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_usuario: this.idUsuario,
          valor: this.gastos.valor,
          observacao: this.gastos.observacao,
          saldo_total: this.saldoTotal,
          data_insercao: this.formatDate(dataAtual)
        })
      }).then(response => {
        if (response.ok) {
          console.log('Gasto inserido com sucesso');
        } else {
          console.error('Erro ao inserir gasto');
        }
      }).catch(error => {
        console.error('Erro na requisição:', error);
      });

      // Limpa os campos após o registro
      this.gastos.valor = 0;
      this.gastos.observacao = '';
    }
  }
};
</script>

<style scoped>
.fill-height {
  height: 100%;
}
</style>
