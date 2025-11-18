import config from "@/common/config"
export default class Request {
    http(param: any) {
        let url = param.url, method = param.method || 'GET', header = param.header || {}, data = {...param.data}, responseType = param.responseType
        let requestUrl = config.api + url
        if (method) {
            method = method.toUpperCase()
            if (method === 'POST') {
                header = {
                'content-type': "application/x-www-form-urlencoded"
                };
            } else {
                 header = {
                    'content-type': "application/json"
                };
            }
        }
        return new Promise((resolve, reject) => {
            uni.request({
                url: requestUrl,
                data: data,
                method: method,
                header: header,
                responseType: responseType,
                success: (res) => {
                    if (res.statusCode &&res.statusCode != 200) {
                        uni.showToast({
                            title: 'api错误' + res.errMsg,
                            icon: 'none'
                        })
                        return
                    }
                    resolve(res.data)
                },
                fail: (e: any) =>{
                    console.log('request fail', e)
                    uni.showToast({
                        icon: 'none',
                        title: e.errMsg
                    })
                    resolve(e.data)
                },
                complete() {
                    resolve('')
                    return
                }
            })
        })
    }
}