import {createApp} from "vue"
import {createPinia} from "pinia"
import {createPersistedState} from 'pinia-plugin-persistedstate'
import App from "./App.vue"
import router from "./router"
import "element-plus/dist/index.css"
import 'virtual:windi.css'

const app = createApp(App)
const pinia = createPinia()
pinia.use(
    createPersistedState({
        auto: true
    })
)
app.use(pinia)
app.use(router)
app.mount("#app")
