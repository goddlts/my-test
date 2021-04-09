import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/style.less'
import dayjs from 'dayjs'
import http from './plugins/http'

Vue.use(http)

Vue.filter('fmtDate', (value, fmtString) => {
  return dayjs(value).format(fmtString)
})

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
