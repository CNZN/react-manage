import { message } from "antd"
import axios from "axios"
export default function ajax(url, data = {}, type = 'GET') {
    return new Promise((resolve, reject) => {
        let promise
        if (type === "GET") {
            promise = axios.get(url, { params: data })
        } else if (type === "DELETE") {
            promise = axios.delete(url + data)
        } else {
            promise = axios.post(url, data)
        }
        promise.then(res => {
            resolve(res)
        }).catch(err => {
            message.error(err.msg)
        })
    })
}