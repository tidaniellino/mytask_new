<template>
  <AppLayout>
    <v-main class="fill-height">
      <v-container class="fill-height d-flex flex-column justify-center">
        <h2 class="mb-4">Lista de Tarefas</h2>
        <v-row class="mb-4">
          <v-col cols="12" md="20">
            <v-text-field
              v-model="newTask"
              label="Adicionar nova tarefa"
              outlined
              @keyup.enter="addTask"
              class="task-input"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="10" class="d-flex align-center">
            <v-btn color="primary" @click="addTask" block large>Adicionar</v-btn>
          </v-col>
        </v-row>
        <v-list>
          <v-list-item v-for="(task, index) in tasks" :key="index">
            <v-list-item-content>
              <v-list-item-title>
                {{ task.observacao }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="removeTask(task.id_tarefa)">
                <v-icon>mdi-check</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-container>
    </v-main>
  </AppLayout>
</template>

<script>
import AppLayout from '@/components/AppLayout.vue'; // Importa o componente AppLayout

export default {
  name: 'Task',
  components: {
    AppLayout, // Registra o componente AppLayout
  },
  data() {
    return {
      newTask: "",
      tasks: [],
      userId: 1, // Exemplo de ID de usuário, substitua pelo ID do usuário logado
    };
  },
  mounted() {
    // Carregar as tarefas ao carregar a página
    this.loadTasks();
  },
  methods: {
    loadTasks() {
      fetch('http://localhost:3000/api/tarefas')
        .then(response => response.json())
        .then(data => {
          this.tasks = data;
        })
        .catch(error => {
          console.error('Erro ao carregar as tarefas:', error);
        });
    },
    addTask() {
      if (this.newTask.trim() !== "") {
        const taskData = {
          id_usuario: this.userId,
          observacao: this.newTask.trim(),
        };

        fetch('http://localhost:3000/api/tarefas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(taskData),
        })
          .then(response => {
            if (response.ok) {
              this.loadTasks();
              this.newTask = "";
            } else {
              console.error('Erro ao adicionar a tarefa:', response.statusText);
            }
          })
          .catch(error => {
            console.error('Erro na requisição:', error);
          });
      }
    },
    removeTask(taskId) {
      fetch(`http://localhost:3000/api/tarefas/${taskId}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) {
            this.loadTasks();
          } else {
            console.error('Erro ao remover a tarefa:', response.statusText);
          }
        })
        .catch(error => {
          console.error('Erro na requisição:', error);
        });
    },
  },
};
</script>

<style scoped>
.fill-height {
  height: 100%;
}

.d-flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.justify-center {
  justify-content: center;
}

.align-center {
  align-items: center;
}

.mb-4 {
  margin-bottom: 1rem;
}

.task-input {
  font-size: 1.2rem; /* Aumentar o tamanho da fonte */
}
</style>
