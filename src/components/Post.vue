<template>
  <v-layout>
    <v-flex xs8 offset-xs2 v-if="isAuthenticated">
      <v-form ref="form" v-model="valid">
        <v-text-field
          solo
          label="Title"
          v-model="title"
          value
          :error-messages="titleErrors"
          required
          @input="$v.title.$touch()"
          @blur="$v.title.$touch()"
        ></v-text-field>

        <v-textarea
          solo
          label="Write Something....."
          value
          row-height="2"
          v-model="message"
          :error-messages="messageErrors"
          required
          @input="$v.message.$touch()"
          @blur="$v.message.$touch()"
        ></v-textarea>

        <v-divider class="my-2"></v-divider>

        <v-item-group multiple v-model="selected">
          <v-subheader>Tags</v-subheader>
          <v-item v-for="(tag, index) in tags" :key="index">
            <v-chip
              slot-scope="{ active, toggle }"
              :selected="active"
              @click="toggle"
            >{{ tag.name }}</v-chip>
          </v-item>
        </v-item-group>
        <v-flex right>
            <v-btn color="error" @click="reset">reset</v-btn>
            <v-btn color="success" @click="submit">Post</v-btn>
        </v-flex>
      </v-form>
    </v-flex>
  </v-layout>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
export default {
  mixins: [validationMixin],

  validations: {
    title: { required, maxLength: maxLength(5) },
    message: { required, maxLength: maxLength(10) }
  },
  data() {
    return {
      title: "",
      message: "",
      valid: true,
      selected: [],
      tags: [
        {
          name: "cricket"
        },
        {
          name: "pongal"
        }
      ]
    };
  },
  methods: {
    submit() {
      let that = this;
      this.$v.$touch();
      this.$refs.form.validate();
      this.$nextTick(function() {
        that.selected = that.tags.filter(function(el, index) {
          return that.selected.includes(index);
        });
        if (this.valid) {
          console.log({
            title: this.title,
            message: this.message,
            tags: that.selected
          });
        }
      });
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
      this.$v.$reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
    checkEnable() {
      return !this.title || !this.message;
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      !this.$v.title.required && errors.push("Title is required.");
      this.$v.title.maxLength &&
        errors.push("Name must be at most 5 characters long");
      return errors;
    },
    messageErrors() {
      const errors = [];
      if (!this.$v.message.$dirty) return errors;
      !this.$v.message.required && errors.push("Message is required.");
      this.$v.message.maxLength &&
        errors.push("Message must be at most 10 characters long");
      return errors;
    }
  }
};
</script>

