import {createRouter,createWebHistory} from 'vue-router'

import Layout from '@/layout/index.vue';

// *公共路由
export const constantRoutes = [
  { 
    path: '/',
    component: Layout,
    redirect:'/dashbord',
    children:[
      {
        path:'dashbord',
        name:'dashbord',
        hidden: true,
        component: ()=>import('@/views/dashboard/index.vue'),
        meta:{
          title:'首页',icon:'Grid'
        }
      }
    ] 
  },
  { 
  path: '/login',
  name:'login',
  hidden: true,
  component: ()=>import('@/views/login/Login.vue'),
  meta:{
    title:'登录页面',icon:'Grid'
  }
 },
 
 {
  path: '/404',
  component: () => import('@/views/errorpage/404.vue'),
  hidden: true
}, 
]
// *异步路由的实现
export const asyncRoutes = [
  {
    path:'/profile',
    name:'profile',
    component: 'Layout',
    meta:{
      title: '个人详情信息', icon: 'User'
    },
    children:[
      {
        path:'/info',
        name:'info',
        component:'/profile/index',
        meta:{
          title: '信息展示', icon: 'Help'
        }
      }
    ]
   },
   {
    path:'/system',
    name:'system',
    redirect:'user',
    component: 'Layout',
    children:[
      {
        path:'/user',
        name:'User',
        component:'/system/user/index',
        meta:{
          title: '用户管理', icon: 'Coin'
        }
      }
    ],
    meta:{
      title:'系统管理',icon:'HelpFilled'
    }
   },
]

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(),
  routes: constantRoutes // `routes: routes` 的缩写
})

export  default router