import { defineStore } from 'pinia'
import Layout from '@/layout/index.vue'
import {constantRoutes,asyncRoutes} from '@/router'

// *全局导入vue组件
const modules = import.meta.glob('../views/**/*.vue')

export const usePermissionStore = defineStore('permission',{
  state:()=>{
    return {
      routes: [],
      addRoutes: []
    }
  },
  actions:{
    // *获取异步路由的信息
    async generateRoutes(roles){
      return new Promise((resolve,reject)=>{
          // *判断用户的角色信息 
        // *是管理员就分配给异步路由的信息  
        // *异步路由对象直接赋值
        let accessedRoutes
        // * 根据后端的路由列表重新生成前端需要的路由列表
        accessedRoutes = filterAsyncRoutes(asyncRoutes)
        this.routes = accessedRoutes
        resolve(accessedRoutes)
      })
    }
  },
    getters: {
      getRoutes() {
        return constantRoutes.concat(this.routes)
      },
      getMenus() {
        return this.routes.filter((route) => route.name && !route.hidden)
      },
  }
})

export function filterAsyncRoutes(routes) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    console.log("🚀 ~ file: permission.js ~ line 39 ~ filterAsyncRoutes ~ tmp", tmp)
    // *路由的组件设置
      if(tmp.component ==='Layout'){
        tmp.component = Layout
      }else{
        // 异步组件加载
        if(tmp.component){
           tmp.component = loadView(tmp.component)
        }
      }
      // *子路由集合遍历设置
      if(tmp.children != null && tmp.children && tmp.children.length){
        tmp.children = filterAsyncRoutes(tmp.children)
      }else{
          delete tmp['children']
          delete tmp['redirect']
      }
      res.push(tmp)
  })
    console.log("🚀 ~ file: permission.js ~ line 51 ~ filterAsyncRoutes ~ res", res)
  return res
}


export const loadView = (view) => {
  console.log("🚀 ~ file: permission.js ~ line 67 ~ loadView ~ view", view)
  let res;
  for (const path in modules) {
     const dir = path.split('views')[1].split('.vue')[0];
     console.log("🚀 ~ file: permission.js ~ line 70 ~ loadView ~ dir", dir)
    if (dir === view) {
      res = () => modules[path]();
    }
  }
  return res;
}