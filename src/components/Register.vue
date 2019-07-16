<template>
  <v-dialog v-model="registerDialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn flat v-on="on">Register</v-btn>
    </template>
    <form>
      <v-card>
        <v-card-title class="title font-weight-regular justify-space-between">
          <span>{{ currentTitle }}</span>
          <v-avatar
            color="primary lighten-2"
            class="subheading white--text"
            size="24"
            v-text="step"
          ></v-avatar>
        </v-card-title>

        <v-window v-model="step">
          <v-window-item :value="1">
            <v-card-text>
              <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                label="E-mail"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
              ></v-text-field>
              <span
                class="caption grey--text text--darken-1"
              >This is the email you will use to login to your Vuetify account</span>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="2">
            <v-card-text>
              <v-text-field
                v-model="confirmPassword"
                :error-messages="confirmPasswordErrors"
                :counter="10"
                label="Password"
                required
                @input="$v.confirmPassword.$touch()"
                @blur="$v.confirmPassword.$touch()"
              ></v-text-field>
              <v-text-field
                v-model="password"
                :error-messages="passwordErrors"
                :counter="10"
                label="Password"
                required
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
              ></v-text-field>
              <span
                class="caption grey--text text--darken-1"
              >Please enter a password for your account</span>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="3">
            <div class="pa-3 text-xs-center">
              <v-img
                class="mb-3"
                contain
                height="128"
                src="https://cdn.vuetifyjs.com/images/logos/v.svg"
              ></v-img>
              <h3 class="title font-weight-light mb-2">Welcome to Vuetify</h3>
              <span class="caption grey--text">Thanks for signing up!</span>
            </div>
          </v-window-item>
        </v-window>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn :disabled="step === 1" flat @click="previous">Back</v-btn>
          <v-btn @click="clear">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn :disabled="step === 3" color="primary" depressed @click="submit">Next</v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </v-dialog>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email },
    password: { required, maxLength: maxLength(6) },
    confirmPassword: { required },
    checkbox: {
      checked(val) {
        return val;
      }
    }
  },
  data: () => ({
    step: 1,
    registerDialog: false,
    email: "",
    password: "",
    confirmPassword: ""
  }),

  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Sign-up";
        case 2:
          return "Create a password";
        default:
          return "Account created";
      }
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.maxLength &&
        errors.push("Password must be at most 10 characters long");
      !this.$v.password.required && errors.push("Password is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.confirmPassword.$dirty) return errors;
      !this.$v.confirmPassword.required &&
        errors.push("Confirm Password is required");
      this.password !== this.confirmPassword &&
        errors.push("Confirm Password must match");
      return errors;
    }
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (this.step === 1 && this.$v.email.$anyError) return false;
      if (this.step === 2 && this.$v.password.$anyError) return false;
      this.step++;
      if (this.step === 3) {
        console.log({
          username: this.email,
          password: this.password
        });
      }
    },
    previous() {
      this.step--;
    },
    clear() {
      this.$v.$reset();
      this.registerDialog = false;
      this.email = "";
      this.password = "";
      this.step = 1;
    }
  }
};
</script>