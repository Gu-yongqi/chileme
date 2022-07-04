import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/font/iconfont.css'
import axios from 'axios'
import md5 from 'js-md5'
import Vuex from 'vuex'

axios.defaults.baseURL = 'http://127.0.0.1:9999'
Vue.prototype.md5 = md5
Vue.prototype.imgUrl = 'http://127.0.0.1:9999/'
Vue.use(ElementUI);
Vue.prototype.axios = axios
Vue.config.productionTip = false
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        select: 'one'
    },
    mutations: {
        mut(state, newVal) {
            state.select = newVal
        }
    },
    actions: {},
    getters: {}
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')