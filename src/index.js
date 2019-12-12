import Vue from 'vue'
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex)

import router from './vue/router/index.js';
import store from './vue/store/store.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import './css/style.css';

Vue.prototype.$http = axios 


new Vue({
    store,
    router,
}).$mount('#app')