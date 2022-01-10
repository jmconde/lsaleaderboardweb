import Vuex from 'vuex';
import Vue from 'vue';
import daterange from './daterange';

Vue.use(Vuex);

export default function() {
  return  new Vuex.Store({
    modules: {
      daterange
    },
    strict: false,
  })
};