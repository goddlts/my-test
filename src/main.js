import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/style.less'
import dayjs from 'dayjs'
import http from './plugins/http'
import { Cascader, Tabs, TabPane, Steps, Step, Alert, MenuItem, Dialog, Card, Tag, Message, Notification, Tree, Select, Option, Pagination, Switch, Loading, Input, Table, TableColumn, Breadcrumb, BreadcrumbItem, Button, Form, FormItem, Container, Header, Row, Col, Aside, Menu, Submenu, Main, MessageBox } from 'element-ui'

Vue.use(http)

Vue.filter('fmtDate', (value, fmtString) => {
  return dayjs(value).format(fmtString)
})

Vue.use(Button).use(Dialog).use(Form).use(FormItem).use(Container).use(Header).use(Row).use(Col)
Vue.use(Aside).use(Menu).use(Submenu).use(Main)
Vue.use(Breadcrumb).use(BreadcrumbItem).use(Table).use(Input).use(TableColumn).use(Switch).use(Loading)
Vue.use(Pagination).use(Select).use(Option).use(Tree).use(Tag).use(Card).use(MenuItem)
Vue.use(Loading.directive).use(Alert).use(Steps).use(Step)
Vue.use(Tabs).use(TabPane).use(Cascader)

Vue.prototype.$loading = Loading.service
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
