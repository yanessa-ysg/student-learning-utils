<template>
  <view class="content">
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    
    <view class="card-list">
      <view 
        class="card-item"
        v-for="(item, index) in cardList" 
        :key="index"
        @click="handleCardClick(item)"
        :style="{ background: item.bg || '#ffffff' }"
      >
        <view class="card-left" :style="{ background: item.color }">
          <text class="card-icon">{{ item.icon }}</text>
        </view>
        <view class="card-body">
          <view class="card-title">{{item.title}}</view>
          <view class="card-desc">{{item.desc}}</view>
        </view>
        <view class="card-arrow">›</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const title = ref('学习工具')

const cardList = ref([
  {
    id: 'math',
    title: '数学练习',
    desc: '加减乘除基础运算练习',
    path: '/pages/math/index',
    icon: '➗',
    color: 'linear-gradient(135deg,#FFD89B,#19547B)',
    bg: 'linear-gradient(180deg, rgba(255,255,255,0.98), rgba(250,250,255,0.98))'
  },
  {
    id: 'english',
    title: '英语单词-一年级',
    desc: '记忆与拼写练习',
    path: '/pages/english/index',
    icon: '📚',
    color: 'linear-gradient(135deg,#A1FFCE,#FAFFD1)',
    bg: 'linear-gradient(180deg, rgba(255,255,255,0.98), rgba(245,250,255,0.98))'
  },
  {
    id: 'science',
    title: '科学小测',
    desc: '有趣的实验与知识问答',
    path: '/pages/science/index',
    icon: '🔬',
    color: 'linear-gradient(135deg,#89F7FE,#66A6FF)',
    bg: 'linear-gradient(180deg, rgba(255,255,255,0.98), rgba(250,255,255,0.98))'
  }
  // 可以继续添加其他卡片
])

const handleCardClick = (item: any) => {
  uni.navigateTo({
    url: item.path
  })
}
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
  margin-bottom: 50rpx;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}

.card-list {
  width: 100%;
  padding: 20rpx;
  box-sizing: border-box;
}

/* 卡片整体 */
.card-item {
  display: flex;
  align-items: center;
  gap: 24rpx;
  background: #ffffff;
  border-radius: 12rpx;
  padding: 24rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 6rpx 18rpx rgba(0, 0, 0, 0.06);
  transition: transform 120ms ease, box-shadow 120ms ease;
}

/* 悬浮效果 */
.card-item:active {
  transform: translateY(4rpx);
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.08);
}

/* 左侧图标圆圈 */
.card-left {
  width: 120rpx;
  height: 120rpx;
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 6rpx 12rpx rgba(0, 0, 0, 0.06);
}

/* emoji 图标样式 */
.card-icon {
  font-size: 48rpx;
}

/* 卡片正文 */
.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* 标题与描述样式 */
.card-title {
  font-size: 32rpx;
  font-weight: 700;
  margin-bottom: 8rpx;
}

.card-desc {
  font-size: 26rpx;
  color: #666;
}

/* 右侧箭头 */
.card-arrow {
  font-size: 40rpx;
  color: rgba(0,0,0,0.25);
  margin-left: 10rpx;
}
</style>
