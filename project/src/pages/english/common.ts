import {getAudioByText, getTextByAudo} from '@/common/api'

export const generateAudio = (inputWord) => {
    const word = inputWord
    if (!word) {
        uni.showToast({
            title: '请输入单词'
        })
        return
    }
    uni.showLoading({
        title: '生成音频中...'
    });
    getAudioByText({text: word})
    .then((res) => {
        handleAudioData(res)
        audioIsCorrect(word)
    }).finally(() => {
        uni.hideLoading()
    })
    // 判断读的音频对不对
    
}

// 处理音频数据
const handleAudioData = (arrayBuffer: any) => {
  // 将 ArrayBuffer 转换为 base64
  const base64 = uni.arrayBufferToBase64(arrayBuffer)
  // 创建音频源
  const audioSrc = `data:audio/wav;base64,${base64}`
  playBase64Audio(audioSrc)
  // 播放音频
}

// 播放音频
const playBase64Audio = (base64Audio: any) => {
  const innerAudioContext = uni.createInnerAudioContext()
  
  innerAudioContext.src = base64Audio
  innerAudioContext.autoplay = true
  
  innerAudioContext.onPlay(() => {
    console.log('开始播放base64音频')
  })
  
  innerAudioContext.onError((error) => {
    console.error('播放失败', error)
    // 尝试其他方式处理
    //this.tryAlternativePlay(base64Audio)
  })
}

const audioIsCorrect = (text) => {
    getTextByAudo({text})
    .then((res: any) => {
        if (res.code === 0 && res.data) {
            const outputWord = res.data
            const isSame = outputWord.replaceAll('.', '').toLocaleLowerCase().trim() == text.toLocaleLowerCase().trim()
            console.log(outputWord.replaceAll('.', '').toLocaleLowerCase(), '===', text.replaceAll('.', '').replaceAll(',', '').toLocaleLowerCase(), isSame)
        }
    })
}