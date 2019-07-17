<template>
  <v-dialog v-model="loginDialog" max-width="800px">
    <template v-slot:activator="{ on }">
      <v-btn flat v-on="on" class="font-weight-bold text-none">Login</v-btn>
    </template>
    <v-card>
      <form>
        <v-toolbar card color="teal lighten-1" dark>
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            label="E-mail"
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :error-messages="passwordErrors"
            :append-icon="show1 ? 'visibility' : 'visibility_off'"
            :type="show1 ? 'text' : 'password'"
            label="Password"
            hint="At least 5 characters"
            counter
            @click:append="show1 = !show1"
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="clear">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="login" color="primary">Submit</v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
</template>
<script>
import { JsonServiceClient, toFormData } from "@servicestack/client";
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import { mapMutations, mapActions, mapState, mapGetters } from "vuex";
import { LOGIN } from "../store/actions.types.js";
import { SET_ERROR } from "../store/mutations.types.js";
export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email },
    password: { required, maxLength: maxLength(6) }
  },
  watch: {
    loginDialog(val) {
      if (!val) {
        this.$v.$reset();
        this.clear();
      }
    }
  },
  data: () => ({
    loginDialog: false,
    password: "",
    email: "",
    show1: false
  }),

  computed: {
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required.");
      this.password.length < 5 &&
        errors.push("Password must be at more than 5 characters long");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    ...mapGetters(["isError"])
  },

  methods: {
    ...mapMutations(["increment"]),
    submit() {
      this.$v.$touch();
    },
    login() {
      var that = this;
      this.$v.$touch();
      if (this.$v.email.$anyError || this.$v.password.$anyError) return;
      if (!this.$v.email.$anyError || !this.$v.password.$anyError) {
        this.loginDialog = false;
        this.$store
          .dispatch(LOGIN, { username: that.email, password: that.password })
          .then(function(res) {
            if(res.state.isAuthenticated) {
              that.$router.push({ name: "home" });
            } else {
              if (that.isError.status) {
                that.$dialog.error({
                  title: "Error",
                  text: "Credentials Invalid, Please use -> username: admin@gmail.com & password: admin",
                  waitForResult: false
                });
              }
            }
          });
      }
    },
    clear() {
      this.show1 = false;
      this.$v.$reset();
      this.password = "";
      this.email = "";
      this.loginDialog = false;
    }
  }
};
</script>