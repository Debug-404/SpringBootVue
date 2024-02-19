import {defineStore} from "pinia"
import {getToKen} from "@/utils/tokenUtils";

export const useCounterStore = defineStore("main", {
    state: () => {
        return {
            userId: "",
            userName: "",
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
        setUser(userId: string) {
            this.userId = userId
            //this.userName = userName
            localStorage.setItem("userid", userId)
        },
        removeUser() {
            this.userName = "";
            localStorage.clear();
        }
    }
})
