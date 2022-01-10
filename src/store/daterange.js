import Vue from 'vue';

const INITAL_PERIOD = 'month';

const state = () => ({
  period: INITAL_PERIOD,
  date: Vue.moment()
});
const DATE_FORMAT = 'YYYY-MM-DD';
const getters = {
  // range: (state) => {
  //   return [ state.date.startOf(state.period), state.date.endOf(state.period) ]
  // }, 
  range: (state) => {
    return [ state.date.clone().startOf(state.period).format(DATE_FORMAT), state.date.clone().endOf(state.period).format(DATE_FORMAT) ]
  }, 
  start: (state) => {
    return state.date.clone().startOf(state.period);
  }, 
  end: (state) => {
    return state.date.clone().endOf(state.period);
  }, 
}

const actions = {
  changePeriod: ({ commit }, period) => {
    commit('setPeriod', period);
  },
  changeDate: ({ commit }, date) => {
    commit('setDate', date);
  },
}

const mutations = {
  setPeriod(state, period) {
    state.period = period;
  },

  setDate(state, date) {
    state.date = date;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}