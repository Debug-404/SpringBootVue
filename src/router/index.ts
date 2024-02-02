import {createRouter, createWebHistory} from "vue-router"
import type {RouteRecordRaw} from "vue-router"

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: () => import("@/views/student/login/index.vue"),
        meta: {
            title: "首页"
        }
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("@/views/404/index.vue"),
        meta: {
            title: "页面不存在",
        },
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from) => {
    document.title = <string>to.meta?.title
})

export default router
