<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title @click="nav('list')">MongoBlogger</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat @click="nav('newArticle')">New Article</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app><span class="ml-3">Cooler MongoBlogger fett geil</span></v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {

  public nav(location: string) {
    this.$router.push({ name: location });
  }

}
</script>

<style>
</style>
