<template>
  <v-flex xs2>
    <v-card dark color="teal lighten-1">
      <v-card-text>
        <v-item-group multiple v-model="selected">
          <v-subheader>Tags</v-subheader>
          <v-item v-for="n in 8" :key="n">
            <v-chip color="white" text-color="black" slot-scope="{ active, toggle }" :selected="active" @click="toggle" @mouseleave="mouseOver()">Tag {{ n }}</v-chip>
          </v-item>
        </v-item-group>
      </v-card-text>
    </v-card>
  </v-flex>
</template>
<script>
export default {
    methods: {
        mouseOver() {
            // console.log('working')
        }
    },
    data() {
      return {
        selected: []
      }
    }
}
</script>
