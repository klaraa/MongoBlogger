import Vue from "vue";
import Router from "vue-router";
import List from "./views/List.vue";
import Article from "./views/Article.vue";
import NewArticle from "./views/NewArticle.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "list",
      component: List
    },
    {
      path: "/article/:id",
      name: "article",
      component: Article
    },
    {
      path: "/newarticle",
      name: "newArticle",
      component: NewArticle
    }
  ]
});
