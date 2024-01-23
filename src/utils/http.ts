import axios from "axios";

export  function login(id:string,password:string){
    return axios.post("/login",{id,password})
}