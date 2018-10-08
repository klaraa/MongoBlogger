<template>
    <div v-if="article">

        <v-icon style="float:right;cursor:pointer;" @click="deleteArticle">delete</v-icon>


        <h1>{{ article.name }}</h1>
        <small>{{ beautify(article.date) }} - {{ article.mail }}</small>

        <p class="mt-3" style="overflow-wrap: break-word;">{{ article.text }}</p>

        <hr class="mt-3 mb-3">

        <h3 class="mt-2">Comments</h3>
        <div v-if="article.comments && article.comments.length > 0">
            <v-card class="mb-2 mt-2" v-for="comment in article.comments" :key="comment.date">
                <v-card-title>
                    <div>
                        <h4>{{ comment.author }}</h4>
                        <small>{{ beautify(comment.date) }}</small>
                    </div>
                </v-card-title>
                <v-card-text>
                    <span style="overflow-wrap: break-word;">{{ comment.text }}</span>
                </v-card-text>
            </v-card>
        </div>

        <p v-else>No comments.</p>

        <hr class="mt-3 mb-3">

        <h3 class="mt-2">Write a comment</h3>
        <v-form>
            <v-text-field
                label="Name"
                v-model="name"
                required>
            </v-text-field>
            <v-text-field
                label="Text"
                v-model="text"
                required>
            </v-text-field>
            <v-btn @click="submit">Submit</v-btn>
        </v-form>

    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import request from "../request";
import moment from "moment";

@Component
export default class Article extends Vue {

  public article: any[] | null = null;

  public name = "";
  public text = "";

  public previewText(s: string) {
    const length = 60;
    return s.length > length ? s.substring(0, length - 3) + "..." : s;
  }

  public async submit() {
      await request.post(`/articles/${this.$route.params.id}/comments`, {
          author: this.name,
          text: this.text
      });
      this.name = "";
      this.text = "";
      this.load();
  }

  public async deleteArticle(){
      await request.delete(`/articles/${this.$route.params.id}`);
      this.$router.push({
          name: "list"
      });
  }

  public beautify(date: string): string {
    return moment(date).fromNow();
  }

  private async load() {
    this.article = (await request.get<any[]>("/articles/" + this.$route.params.id)).data;
  }

  mounted() {
    this.load();
  }

}
</script>
