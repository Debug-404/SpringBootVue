import axios from "axios"

const request = axios.create({
    baseURL: "/api",
    timeout: 5000,
    headers: {"Content-Type": "application/json"}
})

// 添加请求拦截器
request.interceptors.request.use(
    (request) => {
        if (localStorage.getItem("token")) {
            request.headers.token = localStorage.getItem("token")
        }
        return request
    }, (error) => {
        return Promise.reject(error)
    })

// 添加响应拦截器
request.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        return Promise.reject(error)
    }
)
export default request