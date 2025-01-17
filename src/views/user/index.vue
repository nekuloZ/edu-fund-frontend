<template>
  <div>
    <!-- 顶部导航栏 -->
    <el-header
      style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        backdrop-filter: blur(10px);
        height: 64px;
        transition: all 0.3s ease;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 10;
      "
    >
      <!-- 左侧 LOGO -->
      <div style="font-size: 20px; font-weight: bold; color: #ff5733">
        乡村教育基金管理系统
      </div>
      <!-- 右侧导航按钮 -->
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 20px;
        "
      >
        <el-button type="primary" class="menu-button">登录</el-button>
      </div>
    </el-header>

    <!-- 轮播图 -->
    <div style="margin-top: 64px">
      <!-- 给轮播图容器加上上边距 -->
      <el-carousel :interval="5000" height="100vh">
        <el-carousel-item v-for="(item, index) in carouselItems" :key="index">
          <img
            :src="item"
            alt="轮播图"
            style="width: 100%; height: 100%; min-width: 1000px"
            fit="contain"
          />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 关于我们部分 -->
    <div style="padding: 40px 20px; background-color: #f4f4f4;">
      <h2 style="text-align: center; color: #333; font-size: 24px;">关于我们</h2>
      <div style="max-width: 800px; margin: 0 auto; text-align: justify;">
        <p style="font-size: 16px; line-height: 1.6;">
          我们是一个致力于改善乡村教育状况的团队，通过建设和管理教育基金，推动乡村教育资源的均衡分配。我们的目标是为乡村学校提供必要的资金支持，以帮助当地学生享有更好的教育机会，提升他们的学习质量。
        </p>
        <p style="font-size: 16px; line-height: 1.6;">
          我们的愿景是通过科技与创新，在未来十年内为全国范围内的乡村学校提供更多的教育资金支持。我们相信，通过大家的共同努力，我们能够为孩子们的未来带来更多希望和可能。
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

// 轮播图数据
const carouselItems = ref<string[]>([
  new URL("@/assets/images/index.webp", import.meta.url).href,
  new URL("@/assets/images/index.jpg", import.meta.url).href,
  new URL("@/assets/images/index.jpg", import.meta.url).href,
]);
</script>

<style scoped>
.menu-button {
  margin: 10px;
}
</style>

<style scoped>
/* 确保 el-carousel 和图片填满整个视口 */
.el-carousel {
  position: relative;
  width: 100%;
  height: 100vh; /* 占满整个视口高度 */
}

/* 导航栏按钮悬停效果 */
.menu-button:hover {
  transform: translateY(-3px); /* 上浮效果 */
  box-shadow: 0 4px 8px rgba(0, 123, 255, 0.3); /* 阴影效果 */
  transition: all 0.3s ease; /* 平滑过渡效果 */
}

/* Header 背景悬停变化 */
.el-header:hover {
  background: rgba(62, 60, 60, 0.8); /* 背景更加明显 */
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15); /* 增强阴影效果 */
}
</style>
//user.name=win_nekulo user.email=zgs2811@icloud.com
