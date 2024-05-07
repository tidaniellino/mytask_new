<template>
  <v-app theme="dark">
    <v-container>
      <!-- Título da página -->
      <h1>Calendar</h1>

      <!-- Selecionar data -->
      <v-row>
        <v-col cols="12" md="6">
          <v-date-picker
            v-model="selectedDate"
            :min="new Date()"
            no-title
            scrollable
            @input="getSelectedEvents"
          ></v-date-picker>
        </v-col>
      </v-row>

      <!-- Formulário para adicionar evento -->
      <v-row>
        <v-col cols="12" md="6">
          <v-form @submit.prevent="addEvent">
            <v-text-field v-model="newEvent.title" label="Event"></v-text-field>
            <v-btn type="submit" color="primary">Add event</v-btn>
          </v-form>
        </v-col>
      </v-row>

      <!-- Lista de eventos para o dia selecionado -->
      <v-row v-if="selectedDate">
        <v-col cols="12">
          <h2>Eventos do Dia {{ selectedDate.toLocaleDateString() }}</h2>
          <ul>
            <li v-for="(event, index) in selectedEvents" :key="index">
              {{ event.title }} <v-btn @click="removeEvent(index)" text>x</v-btn>
            </li>
          </ul>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      selectedDate: null,
      events: [], // Lista de todos os eventos
      newEvent: {
        title: "",
      },
    };
  },
  computed: {
    // Lista de eventos para o dia selecionado
    selectedEvents() {
      if (!this.selectedDate) return [];
      return this.events.filter((event) =>
        this.isSameDay(event.start, this.selectedDate)
      );
    },
  },
  methods: {
    // Adicionar um novo evento
    addEvent() {
      if (!this.selectedDate || !this.newEvent.title.trim()) return;
      this.events.push({
        title: this.newEvent.title,
        start: new Date(this.selectedDate), // Clonar a data selecionada
      });
      this.newEvent.title = ""; // Limpar o campo do título do evento
    },
    // Remover um evento
    removeEvent(index) {
      this.events.splice(index, 1);
    },
    // Obter eventos para a data selecionada
    getSelectedEvents() {
      // Aqui você pode implementar a lógica para obter os eventos da data selecionada, se necessário
    },
    // Verificar se duas datas são do mesmo dia
    isSameDay(date1, date2) {
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    },
  },
};
</script>
