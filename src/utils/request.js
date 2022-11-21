import axios from 'axios'
import {setToken, getToken} from '@/utils/auth'
import  { useUserStore }  from '@/stores/user.js'

 console.log( process.env.BASE_API);

const service = axios.create({
  baseURL:  process.env.BASE_API,
  timeout: 5000,
});

// *添加请求拦截器
service.interceptors.request.use(function (config) {
  const store = useUserStore()
   // *获取token
    // *在发送请求之前做些什么
  if (store.token) {
    // let each request carry token
    // ['X-Token'] is a custom headers key
    // please modify it according to the actual situation
    config.headers['token'] = getToken()
  }
  return config;
}, function (error) {
  
  // !对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default service