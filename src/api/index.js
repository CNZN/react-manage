import ajax from "./ajax"
import jsonp from 'jsonp'
import { message } from 'antd'
const BASE_URL = ''
export const toLogin = (username, password) => {
    return ajax(BASE_URL + '/login2', { username, password }, 'POST')
}
export const toRegister = (username, password, url) => {
    return ajax(BASE_URL + "/login1", { username, password, url }, "POST")
}
export const toUser = () => {
    return ajax(BASE_URL + "/user", "GET")
}
export const toDel = (id) => {
    return ajax(BASE_URL + "/delete/", id, "DELETE")
}
// 获取分类
export const toGetClassify = (parentId) => {
    return ajax(BASE_URL + "/goods/classify/list", { parentId })
}
// 添加分类
export const toAddClassify = (name, parentId) => {
    return ajax(BASE_URL + "/goods/classify/add", { name, parentId }, "POST")
}
// 删除分类
export const toDelClassify = (id) => {
    return ajax(BASE_URL + "/classify/delete/", id, "DELETE")
}


// weather
export const toWeather = (city) => {
    return new Promise((resolve, reject) => {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        // 发送jsonp请求
        jsonp(url, {}, (err, data) => {
            // console.log('jsonp()', err, data)
            // 如果成功了
            if (!err && data.status === 'success') {
                // 取出需要的数据
                const { dayPictureUrl, weather } = data.results[0].weather_data[0]
                resolve({ dayPictureUrl, weather })
            } else {
                // 如果失败了
                message.error('获取天气信息失败!')
            }

        })
    })
}