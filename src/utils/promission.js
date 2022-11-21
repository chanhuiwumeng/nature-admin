// *第三方的进度条组件使用
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import router from '@/router'
import {getToken} from '@/utils/auth'
import  { useUserStore }  from '@/stores/user.js'
import  { usePermissionStore }  from '@/stores/permission.js'

// *路由的白名单配置
const whiteList = ['/login'] 
router.beforeEach((to, from,next) => {
  // * 获取store user
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()
  NProgress.start()
  // *获取token
  let hashToken = getToken()
  if(hashToken){
    // 有token 判断是否是登录路由
    if(to.path === '/login'){
      // *直接放行
      next()
      NProgress.done()
    }else{
      // *处理登录路由 其他的路由必须验证用户信息
        try{
        // *没有就去查询用户信息
         userStore.getUserInfo().then((res)=>{
          console.log('-----------查询用户的路由列表信息----------');
          // *分配用户的权限路由信息
            if(permissionStore.routes.length == 0){
              permissionStore.generateRoutes().then((accessRoutes)=>{
                console.log("🚀 ~ file: promission.js ~ line 36 ~ router.beforeEach ~ accessRoutes",accessRoutes)
                // *添加异步获取的路由到路由列表中
                accessRoutes.forEach((item)=>{
                  router.addRoute(item)
                })
                next({ ...to, replace: true })
                })
            }else{
              next()
            }
         })
           
        }catch(error){
          // *出错了就重置token 重新登录
          next('/login')
          NProgress.done()
        }
    }
  }else{
    // *没有token就重定向到login

     if (whiteList.indexOf(to.path) !== -1) {
      // *没有token 判断是否是白名单路由如果是直接去登录
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach((to, from) => {
  // *进度条结束
  NProgress.done()
})