<template>
    <view class="english-page">
        <view class="row">
            <text>输入单词</text>
            <input v-model="inputWord" focus placeholder="请输入要练习的单词" />
        </view>
        <view>
            <button type="primary" @click="createAudio">生成音频</button>
        </view>
        <view>
            <button @click="goOcr">识别图片文字</button>
        </view>
    </view>
</template>


<script setup lang="ts">
import {ref} from   'vue'
import {generateAudio} from './common'
const inputWord = ref('')

const createAudio = () => {
    generateAudio(inputWord.value)
}


const goOcr = () => {
    uni.navigateTo({
        url: '/pages/english/ocr'
    })
}


</script>

<style scoped>
    .row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 70rpx;
        line-height: 70rpx;
    }
</style>