import {createApp} from "vue"
import {createPinia} from "pinia"
import {createPersistedState} from 'pinia-plugin-persistedstate'
import App from "./App.vue"
import router from "./router"
import "element-plus/dist/index.css"
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'virtual:windi.css'
import './assets/gloable.css'

const app = createApp(App)
const pinia = createPinia()
pinia.use(
    createPersistedState({
        auto: true
    })
)
app.use(ElementPlus, {
    locale: zhCn,
})
app.use(pinia)
app.use(router)
app.mount("#app")
