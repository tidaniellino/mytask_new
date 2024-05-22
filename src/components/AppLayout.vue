<template>
    <v-app theme="">
        <v-navigation-drawer app permanent width="250">
            <v-list>
                <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
                    subtitle="sandra_dev@gmail.com" title="Sandra Adams"></v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list>
                <v-list-item prepend-icon="mdi-home" title="Painel" to="/home"></v-list-item>
                <v-list-item prepend-icon="mdi-check" title="Tarefas" to="/task"></v-list-item>
                <v-list-item prepend-icon="mdi-finance" title="Financeiro" to="/finance"></v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-main>
            <v-container fluid>
                <v-row>
                    <v-col>
                        <v-card>
                            <slot></slot>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: "AppLayout",
};
</script>

<style scoped>
/* Estilos específicos do componente aqui */
</style>