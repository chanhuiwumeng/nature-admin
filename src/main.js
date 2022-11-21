import { createApp } from 'vue'
import './style.css'
import router from '@/router'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'


// 导入组件
import './utils/promission'

// *全局挂载mitt
import mitt from 'mitt'

function bootstrap(){
  const app = createApp(App)
// * 使用路由对象
  app.use(router)
// 使用pinia
  app.use(createPinia())
  // *挂载为全局的实例使用
  app.config.globalProperties.$mitt = mitt()
  // 
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  app.mount('#app')
}
bootstrap()
