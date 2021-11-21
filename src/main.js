import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vueCompositionApi from "@vue/composition-api";

import 'leaflet/dist/leaflet.css';

Vue.use(vueCompositionApi);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");