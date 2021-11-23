import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import vueCompositionApi from "@vue/composition-api";
import { library } from '@fortawesome/fontawesome-svg-core';
import VueMoment from 'vue-moment'
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faCaretUp);
library.add(faCaretDown);
library.add(faCaretRight);

import 'leaflet/dist/leaflet.css';
Vue.component('font-awesome-icon', FontAwesomeIcon)
// Vue.use(vueCompositionApi);
Vue.use(VueMoment);


new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");