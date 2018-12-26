import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import score from './Score/Score';

export const store = new Vuex.Store({
  modules: {
    score
  },
  //strict: process.env.NODE_ENV !== 'production'
});
