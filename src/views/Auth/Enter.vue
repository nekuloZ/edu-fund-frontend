<template>
  <div class="login-page">
    <!-- 左侧登录/注册区域 -->
    <div class="login-section">
      <div class="login-container">
        <h1 class="system-name">乡村教育基金系统</h1>
        <!-- 根据 formType 渲染对应的子组件 -->
        <LoginForm v-if="formType === 'login'" @switchForm="switchForm" />
        <RegisterForm v-else @switchForm="switchForm" />
      </div>
    </div>

    <!-- 右侧轮播背景区域 -->
    <div class="ad-section">
      <el-carousel
        height="100%"
        :interval="5000"
        arrow="always"
        indicator-position="none"
      >
        <el-carousel-item v-for="(item, index) in carouselItems" :key="index">
          <div
            class="carousel-bg"
            :style="{ backgroundImage: `url(${item.bgImage})` }"
          >
            <div class="ad-content">
              <img class="brand-logo" :src="item.logo" alt="Brand Logo" />
              <h2 class="brand-title">{{ item.title }}</h2>
              <p class="brand-desc">{{ item.description }}</p>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import LoginForm from "@/components/forms/loginForm.vue";
import RegisterForm from "@/components/forms/register.vue";

const route = useRoute();
const formType = ref<"login" | "register">(
  route.query.form === "register" ? "register" : "login"
);

function switchForm(type: "login" | "register") {
  formType.value = type;
}

const carouselItems = [
  {
    bgImage: "https://placeholder.im/1200x800.png/3370ff?text=教育基金",
    logo: "https://placeholder.im/120x120.png",
    title: "欢迎使用",
    description: "在这里开启您的教育基金管理之旅",
  },
  {
    bgImage: "https://placeholder.im/1200x800.png/33a0ff?text=乡村教育",
    logo: "https://placeholder.im/120x120.png",
    title: "助力乡村教育",
    description: "让每个孩子都有接受教育的机会",
  },
  {
    bgImage: "https://placeholder.im/1200x800.png/33c0ff?text=基金管理",
    logo: "https://placeholder.im/120x120.png",
    title: "高效管理",
    description: "专业的基金管理系统，让您的工作更轻松",
  },
];
</script>

<style scoped lang="scss">
/* 整体页面布局 */
.login-page {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #f5f7fa;
}

/* 左侧登录区域 */
.login-section {
  width: 500px;
  background-color: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: linear-gradient(
      135deg,
      rgba(51, 125, 255, 0.1),
      rgba(95, 167, 255, 0.1)
    );
    top: -150px;
    left: -150px;
    z-index: 0;
  }

  &::after {
    content: "";
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: linear-gradient(
      135deg,
      rgba(51, 125, 255, 0.1),
      rgba(95, 167, 255, 0.1)
    );
    bottom: -100px;
    right: -100px;
    z-index: 0;
  }
}

.login-container {
  width: 85%;
  max-width: 380px;
  background-color: #fff;
  border-radius: 16px;
  padding: 2.5rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 1;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
  }
}

.system-name {
  font-size: 1.6rem;
  margin-bottom: 0.6rem;
  color: #333;
  font-weight: 700;
  background: linear-gradient(90deg, #337dff, #5fa7ff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 1rem;
  margin-bottom: 2rem;
  color: #666;
}

/* 右侧轮播图区域样式 */
.ad-section {
  flex: 1;
  position: relative;
  overflow: hidden;

  .el-carousel,
  .el-carousel__container {
    height: 100%;
  }

  .carousel-bg {
    height: 100%;
    background-size: cover;
    background-position: center;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(
        135deg,
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0.7)
      );
    }
  }

  .ad-content {
    position: relative;
    color: #fff;
    text-align: center;
    max-width: 500px;
    margin: 0 auto;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    padding: 2rem;
    border-radius: 16px;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

    .brand-logo {
      display: block;
      margin: 0 auto 30px;
      width: 140px;
      height: 140px;
      object-fit: contain;
      border-radius: 50%;
      padding: 15px;
      background: rgba(255, 255, 255, 0.1);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }

    .brand-title {
      font-size: 2.2rem;
      margin-bottom: 1rem;
      font-weight: 700;
      text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    }

    .brand-desc {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      line-height: 1.6;
      font-weight: 300;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    }
  }
}
</style>

