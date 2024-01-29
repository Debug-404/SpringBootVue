import http from "@/utils/index";

export function login(id: string, password: string) {
    return http.post("/login", {id, password})
}