import Vue from 'vue';
import { filterDate } from './dateTime';
import { moneyFormat } from './currency';

Vue.filter('formatDate', (date) => filterDate(date));
Vue.filter('moneyFormat', (date) => moneyFormat(date));
