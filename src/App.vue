<template>
  <v-app>
    <TheHeader></TheHeader>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <TheFooter></TheFooter>
  </v-app>
</template>

<script>
import TheFooter from './components/TheFooter'
import TheHeader from './components/TheHeader'
export default {
  name: "App",
  components: {
    TheFooter,
    TheHeader
  }
};
</script>

<style>
@import "vuetify/dist/vuetify.min.css";
</style>
