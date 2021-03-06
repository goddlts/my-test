import axios from 'axios'
import { Message } from 'element-ui'

export default {
  install (Vue) {
    axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'
    // 过滤器
    // 请求过滤器，请求之前执行
    // Add a request interceptor
    axios.interceptors.request.use(function (config) {
      // Do something before request is sent
      // console.log('xxx')
      // console.log(config)
      // 判断当前请求的是否是登录接口
      if (config.url.toLowerCase() !== '/login') {
        config.headers.Authorization = window.localStorage.getItem('token')
      }
      return config
    }, function (error) {
      // Do something with request error
      return Promise.reject(error)
    })

    // Add a response interceptor
    // 响应过滤器，获取到响应结果之后先执行
    axios.interceptors.response.use(function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      // console.log('这是拦截器')
      // console.log(response)
      const { meta: { status, msg } } = response.data
      if (status !== 200 && status !== 201) {
        Message({
          type: 'error',
          message: msg
        })
        return Promise.reject(new Error(msg))
      }
      return response.data
    }, function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error)
    })
    // 给构造函数的原型挂载的成员
    // 通过这个构造函数创建的所有对象都可以访问挂载到原型上的成员(包含属性和方法)
    // 通过 MDN 查询 prototype
    Vue.prototype.$http = axios
  }
}
