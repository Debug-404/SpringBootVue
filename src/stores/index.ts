import {defineStore} from "pinia"

export const useCounterStore = defineStore("main", {
    state: () => {
        return {
            Count:0
        }
    },
    getters: {
        doubleCount():number{
            return this.Count * 2
        }
    },
    actions: {
        increment(){
            this.Count++
        }
    }
})
