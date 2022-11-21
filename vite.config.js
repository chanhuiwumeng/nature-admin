import { defineConfig, loadEnv  } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// 自动配置element-plus的样式自动导入
import {createStyleImportPlugin,ElementPlusResolve,} from 'vite-plugin-style-import'
// mockjs
import { viteMockServe } from 'vite-plugin-mock'
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) =>{
    // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  console.log("🚀 ~ file: vite.config.js ~ line 17 ~ defineConfig ~ env", env)
  return {
   
    plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    createStyleImportPlugin({
      resolves: [ElementPlusResolve()],
      libs: [
          {
          libraryName: 'element-plus',
          esModule: true,
          resolveStyle: (name) => {
          return `element-plus/theme-chalk/${name}.css`
            },
        }, 
      ]
    }),
    viteMockServe({ //mock服务接入
      // default
      mockPath: './mock',
      localEnabled: command === 'serve',
      supportTs: false
    }),
  ],
  resolve:{
    alias:{'@':resolve(__dirname,'./src')}
  },
  define: {
    'process.env':  {"BASE_API":env.VITE_APP_BASE_URL}
  },
}
})
