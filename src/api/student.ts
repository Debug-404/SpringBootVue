import http from "@/utils";

export function login(id: string, password: string) {
    return http.post("/stu/login", {id, password})
}

//name: string, phone: string, count: string, roomNo: string, type: string[], desc: string
export function repair(sid: string, data: any) {
    data.type = data.type.join("")
    return http.post("/stu/repair", {sid, ...data})
}

export function load(pageNum: Number, pageSize: Number, search: String) {
    return http.get("/stu/find", {
        params: {
            pageNum,
            pageSize,
            search
        }
    })
}

export function getStudent(data: any) {
    return http.post("/stu/getStudent", {...data})
}

export function update(data: any) {
    return http.post("/stu/update", {...data})
}

export function register(data: any) {
    return http.post("/stu/register", {...data})
}
