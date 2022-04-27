import Vue from 'vue'
import App from './App.vue'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import styles from './assets/css/style.css';

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(styles)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
