import {defineStore} from "pinia"
import {getToKen} from "@/utils/tokenUtils";

export const useCounterStore = defineStore("main", {
    state: () => {
        return {
            userId: "",
            userName: "",
            user: {},
            isLogin: false,
            identity: 'admin',
            token: getToKen(),
        }
    },
    //计算属性
    getters: {},
    //可以操作异步 和 同步提交state
    actions: {
        setUser(userId: string) {
            this.userId = userId
            localStorage.setItem("userid", userId)
        },
        removeUser() {
            this.userName = "";
            localStorage.clear();
        }
    }
})
