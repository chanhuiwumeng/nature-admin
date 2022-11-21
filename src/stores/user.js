import { defineStore } from 'pinia'
import { login, getInfo } from '@/api/user'
import {setToken, getToken} from '@/utils/auth'

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      // 所有这些属性都将自动推断其类型
      token: '',
      username: 'admin',
      avatar: '',
      description:'',
      roles:[]
    }
  },
  actions:{
   async login(username,password,captcha){
      // 异步登录请求完成
      return new Promise((resolve,reject)=>{
        // *调用登录的API
        login({username,password,captcha})
        .then((res)=>{
          console.log('-----------store-----login-----',res.data);
          // *store存储token
          this.token = res.data.token
          // *cookie存储token
          setToken(res.data.token)
          resolve()
        }).catch((error)=>{
          reject(error)
        })
      })
    },
  async getUserInfo(token){
     // 异步登录请求完成
     return new Promise((resolve,reject)=>{
      // *调用获取用户信息的APi
      getInfo(token)
      .then((res)=>{
        console.log('-----------store-----getInfo-----',res);
        let {username,avatar,roles} = res.data
        // *设置用户名
        this.username = username
        // *设置头像
        this.avatar = avatar
        // *设置角色
        this.roles = roles
        console.log('-----------------roles',this.roles);
        resolve(res.data)
      }).catch((error)=>{
        reject(error)
      })
    })
  }  
  },
  getters:{
    getRoles:(state)=>{
      return state.roles
    }
  }
})