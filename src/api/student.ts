import http from "@/utils";

export function login(id: string, password: string) {
    return http.post("/login", {id, password})
}