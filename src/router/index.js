import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    // 当访问 / 跳转到指定路由
    redirect: '/users',
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

export default router
