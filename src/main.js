import Vue from 'vue';
import App from './App.vue';
import store from './store';
import './components';
import { filters } from './filters';

import './assets/sass/index.scss';

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
