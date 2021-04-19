import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import { Message } from 'element-ui'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    // 当访问 / 跳转到指定路由
    // redirect: '/users',
    component: Home,
    children: [
      {
        path: 'users',
        name: 'Users',
        component: () => import(/* webpackChunkName: "users" */ '../views/Users.vue')
      },
      {
        path: 'roles',
        name: 'Roles',
        // route level code-splitting
        // this generates a separate chunk (roles.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "roles" */ '../views/permission/Roles.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // to的类型 route 路由规则（路由数据）
  // console.log(to)
  // 判断当前访问的是否是登录页面
  if (to.path === '/login') {
    next()
  } else {
    // 如果不是登录页面，判断token，如果token不存在跳转到登录页面
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
      Message({
        type: 'warning',
        message: '请先登录'
      })
    }
  }
})

export default router
