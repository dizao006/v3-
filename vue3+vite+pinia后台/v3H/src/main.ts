import { createApp } from 'vue'
//@ts-ignore
import App from '@/App.vue'
//element
import router from './router'
import '@/styles/index.scss' // 引入全局样式
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import pinia from './store'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus, {
    locale: zhCn,
})
app.use(pinia)
app.use(router)
app.mount('#app')
