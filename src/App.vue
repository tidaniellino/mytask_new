<template>
  <router-view />
  <v-card>
    <v-layout>
      <v-navigation-drawer expand-on-hover rail theme="dark">
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            subtitle="sandra_dev@gmail.com"
            title="Sandra Adams"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>
        <v-list>
          <v-list-item prepend-icon="mdi-home" title="Home" to="/"></v-list-item>
          <v-list-item prepend-icon="mdi-check" title="Task" to="/task"></v-list-item>
          <v-list-item
            prepend-icon="mdi-finance"
            title="Finance"
            to="/finance"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-calendar"
            title="calendar"
            to="/calendar"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main></v-main>
    </v-layout>
  </v-card>
</template>
