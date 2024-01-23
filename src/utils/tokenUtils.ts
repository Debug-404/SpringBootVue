// @ts-ignore
import Cookies from "js-cookie";

export function getToKen(): String | null {
    return Cookies.get("token")
}

export function setToKen(token: String) {
    return Cookies.set("token", token, {expires: 7})
}

export function removeToKen(): void {
    return Cookies.remove("token")
}