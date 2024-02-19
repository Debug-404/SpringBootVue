import {createRouter, createWebHistory} from "vue-router"
import type {RouteRecordRaw} from "vue-router"

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "login",
        component: () => import("@/views/student/login/index.vue"),
        meta: {
            title: "登录"
        }
    },
    {
        path: "/system",
        name: "system",
        component: () => import("@/views/student/system/index.vue"),
        redirect: "/system/home",
        children: [
            {
                path: "repair",
                name: "repair",
                component: () => import("@/views/student/repair/index.vue"),
                meta: {
                    title: "报修提交"
                }
            },
            {
                path: "home",
                name: "home",
                component: () => import("@/views/student/home/index.vue"),
                meta: {
                    title: "首页"
                }
            },
            {
                path: "test3",
                name: "测试3",
                component: () => import("@/components/test3.vue"),
                meta: {
                    title: "测试3"
                }
            },
        ],
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
