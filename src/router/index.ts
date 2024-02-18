import {createRouter, createWebHistory} from "vue-router"
import type {RouteRecordRaw} from "vue-router"

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "login",
        component: () => import("@/views/student/login/index.vue"),
        meta: {
            title: "首页"
        }
    },
    {
        path: "/system",
        name: "system",
        component: () => import("@/views/student/system/index.vue"),
        redirect: "/system/test",
        children: [
            {
                path: "test",
                name: "测试",
                component: () => import("@/views/student/repair/repair.vue"),
                meta: {}
            },
            {
                path: "test2",
                name: "测试2",
                component: () => import("@/components/test2.vue"),
                meta: {}
            }, {
                path: "test3",
                name: "测试3",
                component: () => import("@/components/test3.vue"),
                meta: {}
            },
        ],
        meta: {
            title: "管理页"
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
