import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import VueApollo from "vue-apollo";
import VueLodash from 'vue-lodash';
import VueI18n from "vue-i18n";
import lodash from 'lodash';
import numeral from 'numeral';
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
// import { ApolloClient } from 'apollo-client';
// import { createHttpLink } from 'apollo-link-http';
// import { InMemoryCache } from 'apollo-cache-inmemory'
import { messages } from './i18n/messages';
import 'leaflet/dist/leaflet.css';

const moment = require('moment');
require('moment/locale/es');

// const link = createHttpLink({
//   uri: process.env.ROOT_GRAPHQL
// });
// const cache = new InMemoryCache();

// const apolloClient = new ApolloClient({
//   link,
//   cache,
// });

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'es',
  messages
});

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
console.log(Vue.moment().locale());
Vue.moment.updateLocale("en", { week: {
  dow: 1, // First day of week is Monday
  doy: 4  // First week of year must contain 4 January (7 + 1 - 4)
}});
console.log(Vue.moment().format('MMMM'));
// Vue.use(VueApollo);
Vue.use(VueLodash, { lodash });
// const apolloProvider = new VueApollo({
//   defaultClient: apolloClient,
// })
Vue.filter("formatNumber", function (value) {
  return numeral(value).format("0,0"); // displaying other groupings/separators is possible, look at the docs
});

new Vue({
  router,
  i18n,
  // apolloProvider,
  render: (h) => h(App),
}).$mount("#app");