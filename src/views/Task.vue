<template>
  <div>
    <v-card>
      <v-layout>
        <!-- Lista de Tarefas representa a criação da função de tarefas-->
        <v-app theme="dark">
          <v-main>
            <v-container>
              <h2>Lista de Tarefas</h2>
              <v-text-field
                v-model="newTask"
                label="Adicionar nova tarefa"
                outlined
                @keyup.enter="addTask"
              ></v-text-field>
              <v-btn color="primary" @click="addTask">Adicionar</v-btn>
              <v-list>
                <v-list-item v-for="(task, index) in tasks" :key="index">
                  <v-list-item-content>
                    <v-list-item-title
                      >{{ task }}
                      <v-btn icon @click="removeTask(index)" position="sticky">
                        <v-icon>mdi-check</v-icon>
                      </v-btn></v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-container>
          </v-main>
        </v-app>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTask: "",
      tasks: [],
    };
  },
  methods: {
    addTask() {
      if (this.newTask.trim() !== "") {
        this.tasks.push(this.newTask.trim());
        this.newTask = "";
      }
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
    },
  },
};
</script>
