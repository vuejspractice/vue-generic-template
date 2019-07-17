<template>
  <v-container>
    <v-layout row justify-space-between>
      <v-flex>
        <Post />
        <Posts />
      </v-flex>
      <Tags />
    </v-layout>
  </v-container>
</template>

<script>
import Post from './Post.vue';
import Posts from "./Posts.vue";
import Tags from "./Tags";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      alert: false
    };
  },
  components: {
    Posts,
    Tags,
    Post
  },
  computed: {
    ...mapGetters(["isError", "isAuthenticated"])
  },
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT);
      this.$router.push('/');
    }
  }
};
</script>
