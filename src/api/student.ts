import http from "@/utils";

export function login(id: string, password: string) {
    return http.post("/login", {id, password})
}

//name: string, phone: string, count: string, roomNo: string, type: string[], desc: string
export function repair(sid: string, data: any) {
    return http.post("/repair", {sid, ...data})
}
