import Request from "@/utils/request";
const request = new Request().http

export function getAudioByText(data: any) {
    return request({
        url: '/audio' ,
        data: data,
        method: 'POST',
        responseType: 'arraybuffer', // 重要：指定响应类型为 arraybuffer
        header: {
        'Content-Type': 'application/octet-stream'
        },
    })
}

export function getTextByAudo (data: any) {
    return request({
        url: '/text/' + data.text
    })
}