<template>
  <v-toolbar dark color="teal lighten-1" app>
    <v-btn flat to="/">
      <span class="mr-2" color="white">Home</span>
    </v-btn>
    <v-btn flat to="/about">
      <span class="mr-2">About</span>
    </v-btn>
    <v-btn flat to="/dashboard" v-if="isAuthenticated">
      <span class="mr-2">Dashboard</span>
    </v-btn>
    <v-spacer></v-spacer>
    <Login v-if="!isAuthenticated" />
    <Register v-if="!isAuthenticated" />
    <v-btn flat v-if="isAuthenticated">
      <span class="mr-2" @click="logout()">Logout</span>
    </v-btn>
  </v-toolbar>
</template>
<script>
import Register from './Register.vue';
import Login from './Login.vue';
import { mapGetters } from "vuex";
import { LOGOUT } from "../store/actions.types.js";

export default {
  computed: {
    /**
     * To get the state variable whether user is logged in or not
     */
    ...mapGetters(["isAuthenticated"])
  },
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT);
      this.$router.push('/');
    }
  },
  components: {
    Register,
    Login
  }
};
</script>