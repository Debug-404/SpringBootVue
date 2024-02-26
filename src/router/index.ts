import type {RouteRecordRaw} from "vue-router"
import {createRouter, createWebHistory} from "vue-router"
import Layout from '@/layout/Layout.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/Login.vue"),
        meta: {
            title: "登录"
        }
    },
    {
        path: '/Layout', name: 'Layout', component: Layout,
        children: [
            {
                path: '/home',
                name: 'Home',
                component: () => import("@/views/Home.vue"),
                meta: {title: "首页"}
            },
            {
                path: '/stuInfo',
                name: 'StuInfo',
                component: () => import("@/views/StuInfo.vue"),
                meta: {title: "学生信息"}
            },
            {
                path: '/workerInfo',
                name: 'WorkerInfo',
                component: () => import("@/views/WorkerInfo.vue"),
                meta: {title: "维修员信息"}
            },
            {
                path: '/dormManagerInfo',
                name: 'DormManagerInfo',
                component: () => import("@/views/DormManagerInfo.vue")
            },
            {
                path: '/buildingInfo',
                name: 'BuildingInfo',
                component: () => import("@/views/BuildingInfo.vue"),
                meta: {title: "楼宇信息"}
            },
            {
                path: '/roomInfo',
                name: 'RoomInfo',
                component: () => import("@/views/RoomInfo.vue"),
                meta: {title: "房间信息"}
            },
            {
                path: '/noticeInfo',
                name: 'NoticeInfo',
                component: () => import("@/views/NoticeInfo.vue"),
                meta: {title: "公告信息"}
            },
            {
                path: '/repairInfo',
                name: 'RepairInfo',
                component: () => import("@/views/RepairInfo.vue"),
                meta: {title: "报修信息"}
            },
            {
                path: '/visitorInfo',
                name: 'VisitorInfo',
                component: () => import("@/views/VisitorInfo.vue"),
                meta: {title: "访客管理"}
            },
            {
                path: '/myRoomInfo',
                name: 'MyRoomInfo',
                component: () => import("@/views/MyRoomInfo.vue"),
                meta: {title: "我的宿舍"}
            },
            {
                path: '/applyRepairInfo',
                name: 'ApplyRepairInfo',
                component: () => import("@/views/ApplyRepairInfo.vue"),
                meta: {title: "申请报修"}
            },

            {
                path: '/selfInfo',
                name: 'SelfInfo',
                component: () => import("@/views/SelfInfo.vue"),
                meta: {title: "个人信息"}
            },
        ]
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
//路由守卫
router.beforeEach((to, from, next) => {
    //to 要访问的路径
    //from 代表从哪个路径跳转而来
    // next 是函数，表示放行
    // next() 放行
    // next('/*') 强制跳转
    document.title = <string>to.meta?.title
    const user = window.sessionStorage.getItem('user')
    if (to.path === '/login') {
        return next();
    }
    if (!user) {
        return next('/login')
    }
    if (to.path === '/' && user) {
        return next('/home')
    }
    next()
})

export default router
