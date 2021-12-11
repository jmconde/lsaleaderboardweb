import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueLodash from 'vue-lodash';
import VueI18n from "vue-i18n";
import lodash from 'lodash';
import numeral from 'numeral';
import VueGtag from "vue-gtag";
// import vueCompositionApi from "@vue/composition-api";
import { library } from '@fortawesome/fontawesome-svg-core';
// import VueMoment from 'vue-moment'
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { messages } from './i18n/messages';
import 'leaflet/dist/leaflet.css';

const moment = require('moment');
require('moment/locale/es');

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'es',
  messages
});

// console.log(':>>', process);

Vue.use(VueGtag, {
  config: { 
    id: "G-S71NFB5GMJ",
    enabled:  true//process.env.ENVIRONMENT !== 'development'
  }
}, router);

library.add(faCaretUp);
library.add(faCaretDown);
library.add(faCaretRight);
library.add(faAngleRight);
library.add(faAngleLeft);
library.add(faSync);

Vue.component('font-awesome-icon', FontAwesomeIcon)
// Vue.use(vueCompositionApi);
Vue.use(require('vue-moment'), {
  moment
});
Vue.moment.locale('es');

Vue.moment.updateLocale("en", { week: {
  dow: 1, // First day of week is Monday
  doy: 4  // First week of year must contain 4 January (7 + 1 - 4)
}});

Vue.use(VueLodash, { lodash });
Vue.filter("formatNumber", function (value) {
  return numeral(value).format("0,0"); // displaying other groupings/separators is possible, look at the docs
});

new Vue({
  router,
  i18n,
  render: (h) => h(App),
}).$mount("#app");