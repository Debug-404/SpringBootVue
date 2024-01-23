import {defineStore} from "pinia"
import {getToKen} from "@/utils/tokenUtils";

export const useCounterStore = defineStore("main", {
    state: () => {
        return {
            user: "",
            token: getToKen(),
            Count: 0
        }
    },
    //计算属性
    getters: {
        doubleCount(): number {
            return this.Count * 2
        }
    },
    //可以操作异步 和 同步提交state
    actions: {
        setUser(user: string) {
            this.user = user
            localStorage.setItem("user", user)
        },
        removeUser() {
            this.user = "";
            localStorage.clear();
        }
    }
})
