<template>
  <div>
    <div v-if="articles && articles.length > 0">
      <v-card class="mb-3" v-for="article in articles" :key="article._id">
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{ article.name }}</h3>
            <small>{{ beautify(article.date) }} - {{ article.mail }}</small>
          </div>
        </v-card-title>
        <v-card-text>
          <p>
            {{ previewText(article.text) }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn flat @click="navTo(article._id)">View More</v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <div v-else>
      <v-alert value="true" type="info">No articles found.</v-alert>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import request from "../request";
import moment from "moment";

@Component
export default class List extends Vue {

  public articles: any[] | null = null;

  public navTo(id: string) {
    this.$router.push({ name: "article", params: { id: id } });
  }

  public beautify(date: string): string {
    return moment(date).fromNow();
  }

  public previewText(s: string) {
    const length = 60;
    return s.length > length ? s.substring(0, length - 3) + "..." : s;
  }

  async mounted() {
    this.articles = (await request.get<any[]>("/articles")).data;
  }

}
</script>
