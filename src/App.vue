<template>
  <v-app>
    <v-main>
      <v-app-bar app color="info">
        <template #prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title tag="h1">Vuetify</v-app-bar-title>
      </v-app-bar>

      <router-view />
    </v-main>
  </v-app>
</template>
