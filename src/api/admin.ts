import http from "@/utils";


export function login(id: string, password: string) {
    return http.post("/admin/login", {id, password})
}

export function intoNotice(text: string, time: string) {
    return http.post("/admin/intoNotice", {text, time})
}

export function getNotice(currentPage: number) {
    return http.post("/admin/getNotice/" + currentPage)
}
