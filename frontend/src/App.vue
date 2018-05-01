<template>
  <v-app :dark="darkTheme">
    <v-toolbar app>
      <v-toolbar-title @click="nav('list')" style="cursor:pointer;">MongoBlogger</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat @click="nav('newArticle')">New Article</v-btn>
        <v-btn flat @click="darkTheme = !darkTheme">Switch Theme</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-layout justify-center>
          <v-flex xs12 md6>
            <transition name="page-transition" mode="out-in">
              <router-view></router-view>
            </transition>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app><span class="ml-3">Cooler MongoBlogger</span></v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {

  public darkTheme = true;

  public nav(location: string) {
    this.$router.push({ name: location });
  }

}
</script>

<style>
</style>
