<template>
    <view class="ocr-page">
        <view>
            <button type="primary" @click="chooseImage">上传图片识别</button>
        </view>
       <view class="show-image-and-texts">
        <view class="show-texts">
            <view v-for="text in texts" class="show-text">
                <text>{{ text.toLocaleLowerCase() }}</text>
                <svg @click="createAudio(text.toLocaleLowerCase())" t="1763374183534" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3316" width="16" height="16"><path d="M336.457143 336.457143m-336.457143 0a336.457143 336.457143 0 1 0 672.914286 0 336.457143 336.457143 0 1 0-672.914286 0Z" fill="#8CF6FB" p-id="3317"></path><path d="M592.457143 1024c-11.702857 0-21.942857-4.388571-30.72-13.165714 0 0-333.531429-175.542857-337.92-175.542857H93.622857c-48.274286 0-87.771429-39.497143-87.771428-87.771429V296.96c0-48.274286 39.497143-87.771429 86.308571-87.771429h131.657143L561.737143 13.165714c7.314286-8.777143 19.017143-13.165714 30.72-13.165714 23.405714 0 43.885714 19.017143 43.885714 43.885714v936.228572c0 24.868571-19.017143 43.885714-43.885714 43.885714z m-29.257143-921.6L269.165714 269.165714c-13.165714 8.777143-27.794286 14.628571-42.422857 14.628572h-131.657143c-7.314286 0-14.628571 5.851429-14.628571 14.628571v452.022857c0 7.314286 5.851429 14.628571 14.628571 14.628572h130.194286c8.777143 0 17.554286 1.462857 26.331429 4.388571 11.702857 5.851429 283.794286 137.508571 313.051428 156.525714L563.2 102.4z" fill="#3C2DCB" p-id="3318"></path><path d="M904.045714 792.868571c-7.314286 7.314286-16.091429 11.702857-26.331428 11.702858s-19.017143-4.388571-26.331429-10.24c-14.628571-14.628571-14.628571-36.571429 0-51.2 128.731429-128.731429 133.12-334.994286 5.851429-465.188572l-7.314286-7.314286c-14.628571-14.628571-14.628571-36.571429 0-51.2s38.034286-14.628571 52.662857 0c157.988571 153.6 160.914286 408.137143 7.314286 566.125715 0 2.925714-2.925714 4.388571-5.851429 7.314285z m-138.971428-102.4c-7.314286 7.314286-16.091429 10.24-26.331429 10.24s-19.017143-4.388571-26.331428-10.24c-14.628571-13.165714-14.628571-35.108571-1.462858-49.737142l1.462858-1.462858c70.217143-65.828571 74.605714-175.542857 8.777142-245.76l-8.777142-8.777142c-14.628571-13.165714-14.628571-35.108571-1.462858-49.737143l1.462858-1.462857c14.628571-14.628571 38.034286-14.628571 52.662857 0 98.011429 92.16 103.862857 245.76 11.702857 345.234285-4.388571 2.925714-7.314286 7.314286-11.702857 11.702857z" fill="#D098FF" p-id="3319"></path></svg>
            </view>
        </view>
         <view class="show-image">
            <cover-image :src="tempFilePath"></cover-image>
        </view>
       
       </view>
        <view class="footer-btns">
            <button type="primary" @click="createAudio(texts.join(' ').toLocaleLowerCase())" class="btn">听全文</button>
            <button type="primary" @click="onAddToFavorites" class="btn">收藏所有单词</button>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { generateAudio} from './common'
import {imageToText} from '@/common/huggingface'

const tempFilePath: any = ref('')
const texts: any = ref('')
const chooseImage = () => {
    uni.chooseImage({
        count: 1, //默认9
        sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: function (res) {
            console.log(JSON.stringify(res.tempFilePaths));
            tempFilePath.value = res.tempFilePaths[0]
            console.log(tempFilePath.value)
           // uploadImage()
           handleImageToText()
        }
    });
}

const handleImageToText = async () => {
    if (!tempFilePath.value) {
        uni.showToast({
            title: '请先选择图片',
            icon: 'none'
        })
        return
    }
     uni.showLoading({
        title: '文字识别中...'
    })
    
    const dataUrl: any = await blobUrlToDataUrl(tempFilePath.value);
    // console.log('dataUrl', dataUrl)
    const outputText = await imageToText(dataUrl)
    console.log(outputText?.content)
    texts.value = outputText?.content?.split('\n').filter(item => item.trim().length > 0)
    uni.hideLoading()
}

async function blobUrlToDataUrl(blobUrl: string) {
    try {
        // 获取blob数据
         return new Promise((resolve, reject) => {
           uni.request({
            url: blobUrl, //仅为示例，并非真实接口地址。
           
            responseType: 'arraybuffer', // 或者 'blob' (部分版本支持)
            success: (res) => {
                console.log('H5 请求结果:', res.data);
                // res.data 可能是 ArrayBuffer
                //
                const arrayBuffer: string | AnyObject | ArrayBuffer = res.data
                if (arrayBuffer instanceof ArrayBuffer) {
                 const base64 = uni.arrayBufferToBase64(arrayBuffer)
                 const dataUrl = `data:image/jpeg;base64,${base64}`
                 resolve(dataUrl);
                 } else {
                    reject()
                 }
            },
            fail: (error) => {
                console.error('H5 请求失败:', error);
                reject();
            }
        });
            
        });
    } catch (error) {
        console.error('转换失败:', error);
        throw error;
    }
}

const uploadImage = async () => {
    if (!tempFilePath.value) {
        uni.showToast({
            title: '请先选择图片',
            icon: 'none'
        })
        return
    }

    uni.showLoading({
        title: '文字识别中...'
    })

    try {

        const result = await  uni.uploadFile({
            url: 'http://127.0.0.1:8001/image/ocr',
            filePath: tempFilePath.value,
            name: 'file',
            formData: {
            },

        })
        uni.hideLoading()
        console.log(result)
        if (result.statusCode === 200) {
            const json = JSON.parse(result.data)
            texts.value = json.rec_texts
        }

    } catch (error) {
        
    }
}

const onAddToFavorites = () => {
    const storageKey = 'my-favorite-words'
    const allWords = uni.getStorageSync(storageKey)
    let allWordsArr = []
    if (allWords) {
        allWordsArr = JSON.parse(allWords)
    }
    const newAllWordArr = [...allWordsArr, ...texts.value]
    const filterNewAllWordsArr = newAllWordArr.filter((item, index) => newAllWordArr.indexOf(item) === index)
    // 去重
    
    uni.setStorageSync(storageKey, JSON.stringify(filterNewAllWordsArr))
}

const createAudio = (text: string) => {
    generateAudio(text)
}

</script>

<style lang="scss" scoped>
.ocr-page {
    padding: 0 10rpx;
}
.show-image-and-texts {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    height: calc(70vh + 20rpx);
    overflow-y: auto;
}
.show-image {
    height: 70vh;
    width: auto;
}
.show-texts {
    padding: 5rpx 10rpx;
}
 .show-text {
    font-size: 38rpx;
        height:70rpx;
        line-height: 70rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        overflow-x: auto;
    }
.footer-btns {
    display: flex;
    justify-content: space-between;
}
.footer-btns .btn {
    flex: 1;
    margin: 10rpx;
}
</style>