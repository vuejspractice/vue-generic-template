<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card class="mx-auto rounded-card" width="1200" v-if="isAuthenticated">
        <v-toolbar card color="teal lighten-1" dark>
          <v-toolbar-title>Submit a post</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
          <v-text-field
            solo
            label="Title"
            v-model="title"
            value
            :error-messages="titleErrors"
            :counter="10"
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
            :counter="10"
            required
            @input="$v.message.$touch()"
            @blur="$v.message.$touch()"
          ></v-textarea>

          <v-divider class="my-2"></v-divider>

          <v-item-group multiple>
            <v-subheader>Tags</v-subheader>
            <v-item v-for="n in 8" :key="n">
              <v-chip slot-scope="{ active, toggle }" :selected="active" @click="toggle">Tag {{ n }}</v-chip>
            </v-item>
          </v-item-group>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" :disabled="checkEnable" @click="submit">Post</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
      <v-divider class="my-3" v-if="isAuthenticated"></v-divider>
      <v-card class="mx-auto" color="teal lighten-1" dark width="1200">
        <v-card-title dark>
          <v-list-tile-avatar color="grey darken-3">
            <v-img class="elevation-6" :src="image"></v-img>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Evan You</v-list-tile-title>
          </v-list-tile-content>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon class="mr-1">fa-heart</v-icon>
          </v-btn>
          <span class="subheading mr-2">256</span>
        </v-card-title>
        <v-layout row>
          <v-dialog v-model="dialog" width="600px">
            <template v-slot:activator="{ on }">
              <v-card-text v-on="on" class="post-text">
                <div class="headline font-weight-bold">Top western road trips</div>
                <br />Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well.
                <br />
                <v-subheader>Read more..</v-subheader>
              </v-card-text>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Use Google's location service?</span>
              </v-card-title>
              <v-card-text>
                Lorem ipsum dolor sit amet, semper quis, sapien id natoque elit. Nostra urna at, magna at neque sed sed ante imperdiet, dolor mauris cursus velit, velit non, sem nec. Volutpat sem ridiculus placerat leo, augue in, duis erat proin condimentum in a eget, sed fermentum sed vestibulum varius ac, vestibulum volutpat orci ut elit eget tortor. Ultrices nascetur nulla gravida ante arcu. Pharetra rhoncus morbi ipsum, nunc tempor debitis, ipsum pellentesque, vitae id quam ut mauris dui tempor, aptent non. Quisque turpis. Phasellus quis lectus luctus orci eget rhoncus. Amet donec vestibulum mattis commodo, nulla aliquet, nibh praesent, elementum nulla. Sit lacus pharetra tempus magna neque pellentesque, nulla vel erat.
                Justo ex quisque nulla accusamus venenatis, sed quis. Nibh phasellus gravida metus in, fusce aenean ut erat commodo eros. Ut turpis, dui integer, nonummy pede placeat nec in sit leo. Faucibus porttitor illo taciti odio, amet viverra scelerisque quis quis et tortor, curabitur morbi a. Enim tempor at, rutrum elit condimentum, amet rutrum vitae tempor torquent nunc. Praesent vestibulum integer maxime felis. Neque aenean quia vitae nostra, tempus elit enim id dui, at egestas pulvinar. Integer libero vestibulum, quis blandit scelerisque mattis fermentum nulla, tortor donec vestibulum dolor amet eget, elit nullam. Aliquam leo phasellus aliquam curabitur metus a, nulla justo mattis duis interdum vel, mollis vitae et id, vestibulum erat ridiculus sit pulvinar justo sed. Vehicula convallis, et nulla wisi, amet vestibulum risus, quam ac egestas.
                Et vitae, nulla gravida erat scelerisque nullam nunc pellentesque, a dictumst cras augue, purus imperdiet non. Varius montes cursus varius vel tortor, nec leo a qui, magni cras, velit vel consectetuer lobortis vel. Nibh erat et wisi felis leo porttitor, sapien nibh sapien pede mi, sed eget porttitor, repellendus arcu ac quis. Luctus vulputate aut est sem magna, placerat accumsan nunc vestibulum ipsum ac auctor, maecenas lorem in ut nec mauris tortor, doloribus varius sem tortor vestibulum mollis, eleifend tortor felis tempus lacus eu eu. Eleifend vel eu, nullam maecenas mauris nec nunc euismod, tortor porta ridiculus potenti, massa tristique nam magna, et wisi placerat et erat ante. Eget pede erat in facilisis, fermentum venenatis sodales. Ac tortor sociis et non animi tristique, rhoncus malesuada, ut arcu volutpat scelerisque sollicitudin, elit curabitur dui pede purus dolor, integer aenean risus taciti nulla eleifend accumsan. At pulvinar diam parturient, interdum mi velit aliquet et a. Arcu at ac placerat eget justo semper, purus sociis curabitur mi ipsum consequat ut, mollis vestibulum, est ante ornare lacus sem. Neque magna mauris, commodo quisque, praesent semper suscipit lobortis nam. Justo malesuada cursus ac nunc litora nunc. Tellus ac, in lobortis nunc, montes lectus purus fermentum.
                Ac sit wisi. Sodales aliquam, sed vestibulum nullam arcu sit risus arcu, id luctus vitae lorem nibh, integer nec nullam class cursus mi, purus arcu lectus. Vel ante suscipit volutpat potenti mattis sed, wisi eu placerat aliquam erat, lectus morbi lobortis at assumenda. Consequat neque purus ipsum voluptas odio, netus vestibulum ut nec, suspendisse pellentesque nec enim in. Wisi dictum sed semper a, ipsum erat tellus habitasse est, erat sem ornare, vitae quisque ultricies. Dui sed blandit. Tempor et faucibus justo sed luctus, nec vitae vitae. Nunc nibh pede, ipsum vestibulum aenean leo ante ultricies, nam cras quis sed penatibus amet. In mauris a. Integer metus mauris tortor, et rutrum vestibulum ultricies, ut phasellus in ullamcorper ut mollit, eu justo. Cursus pretium venenatis.
                Cras pellentesque vel sodales accumsan aenean.
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" flat="flat" @click="dialog = false">Disagree</v-btn>
                <v-btn color="green darken-1" flat="flat" @click="dialog = false">Agree</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>
      </v-card>
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
  },
  data() {
    return {
      title: "",
      message: "",
      dialog: false,
      image: require("../images/avatar.svg")
    };
  },
  methods: {
    submit() {
      this.$v.$touch();
    }
  }
};
</script>
<style lang="css">
.post-text {
  cursor: pointer !important;
}
.rounded-card {
  border-radius: 50px;
}
</style>
