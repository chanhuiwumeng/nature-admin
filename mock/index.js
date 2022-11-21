// *vite提供的全局导入 自定导入文件系统下的所有模块
const modules = import.meta.glob('./user/*.js')

// * 遍历 modules 对象的 key 值来访问相应的模块
for (const path in modules) {
  modules[path]().then((mod) => {
    console.log(path, mod)
  })
}