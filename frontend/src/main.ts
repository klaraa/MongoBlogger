import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "./styles/page-transition.css";
Vue.use(Vuetify);

new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");
