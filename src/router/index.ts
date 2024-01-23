import {createRouter, createWebHistory} from "vue-router"
import type {RouteRecordRaw} from "vue-router"

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: () => import("@/views/login/index.vue"),
        meta: {
            title: "首页"
        }
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from) => {
    document.title = <string>to.meta?.title
})

export default router
