import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import VueApollo from "vue-apollo";
import VueLodash from 'vue-lodash';
import lodash from 'lodash';
import numeral from 'numeral';
// import vueCompositionApi from "@vue/composition-api";
import { library } from '@fortawesome/fontawesome-svg-core';
import VueMoment from 'vue-moment'
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory'

console.log(process.env.ROOT_GRAPHQL);

const link = createHttpLink({
  uri: process.env.ROOT_GRAPHQL
});
const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link,
  cache,
});

library.add(faCaretUp);
library.add(faCaretDown);
library.add(faCaretRight);

import 'leaflet/dist/leaflet.css';
Vue.component('font-awesome-icon', FontAwesomeIcon)
// Vue.use(vueCompositionApi);
Vue.use(VueMoment);
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
  // apolloProvider,
  render: (h) => h(App),
}).$mount("#app");