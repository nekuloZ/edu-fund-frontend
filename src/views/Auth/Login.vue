<template>
  <div class="login-page">
    <!-- 左侧登录/注册表单 -->
    <div class="login-section">
      <div class="login-container">
        <h1 class="system-name">乡村教育基金系统</h1>

        <!-- 登录表单 -->
        <div v-if="formType === 'login'">
          <p class="subtitle">登录您的账户</p>

          <el-form
            ref="loginFormRef"
            :model="loginForm"
            :rules="loginRules"
            label-width="0"
            class="login-form"
          >
            <!-- 用户名 -->
            <el-form-item prop="username">
              <el-input
                v-model="loginForm.username"
                :prefix-icon="User"
                placeholder="请输入用户名"
                class="input-field"
              ></el-input>
            </el-form-item>

            <!-- 密码 -->
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                type="password"
                :prefix-icon="Lock"
                placeholder="请输入密码"
                class="input-field"
                @keyup.enter="handleLogin"
              ></el-input>
            </el-form-item>

            <!-- 忘记密码链接 -->
            <div class="options">
              <el-link
                class="forgot-password"
                type="primary"
                :underline="false"
                @click="onForgotPassword"
              >
                忘记密码？
              </el-link>
            </div>

            <!-- 登录按钮 -->
            <el-form-item>
              <el-button class="submit-button" @click="handleLogin">
                登录
              </el-button>
            </el-form-item>
          </el-form>

          <!-- 注册链接 -->
          <p class="form-switch-link">
            还没有账号？
            <el-link
              type="primary"
              @click="switchForm('register')"
              :underline="false"
              class="switch-btn"
            >
              立即注册
            </el-link>
          </p>
        </div>

        <!-- 注册表单 -->
        <div v-else>
          <p class="subtitle">创建您的账户</p>

          <el-form
            ref="registerFormRef"
            :model="registerForm"
            :rules="registerRules"
            label-width="0"
            class="register-form"
          >
            <!-- 用户名 -->
            <el-form-item prop="username">
              <el-input
                v-model="registerForm.username"
                :prefix-icon="User"
                placeholder="请输入用户名"
                class="input-field"
              ></el-input>
            </el-form-item>

            <!-- 电话 -->
            <el-form-item prop="phone">
              <el-input
                v-model="registerForm.phone"
                :prefix-icon="Phone"
                placeholder="请输入电话"
                class="input-field"
              ></el-input>
            </el-form-item>

            <!-- 邮箱 -->
            <el-form-item prop="email">
              <el-input
                v-model="registerForm.email"
                :prefix-icon="Message"
                placeholder="请输入邮箱"
                class="input-field"
              ></el-input>
            </el-form-item>

            <!-- 密码 -->
            <el-form-item prop="password">
              <el-input
                v-model="registerForm.password"
                type="password"
                :prefix-icon="Lock"
                placeholder="请输入密码"
                class="input-field"
              ></el-input>
            </el-form-item>

            <!-- 确认密码 -->
            <el-form-item prop="confirmPassword">
              <el-input
                v-model="registerForm.confirmPassword"
                type="password"
                :prefix-icon="Key"
                placeholder="请再次输入密码"
                class="input-field"
              ></el-input>
            </el-form-item>

            <!-- 注册按钮 -->
            <el-form-item>
              <el-button class="submit-button" @click="handleRegister">
                立即注册
              </el-button>
            </el-form-item>
          </el-form>

          <!-- 返回登录 -->
          <p class="form-switch-link">
            已有账号？
            <el-link
              type="primary"
              @click="switchForm('login')"
              :underline="false"
              class="switch-btn"
            >
              返回登录
            </el-link>
          </p>
        </div>
      </div>
    </div>

    <!-- 右侧背景 -->
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
import { ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { User, Lock, Message, Phone, Key } from "@element-plus/icons-vue";

const router = useRouter();
const route = useRoute();

// 表单类型状态：login 或 register
const formType = ref<"login" | "register">("login");

// 登录表单数据
const loginForm = reactive({
  username: "",
  password: "",
});

// 注册表单数据
const registerForm = reactive({
  username: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
});

// 登录表单校验规则
const loginRules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};

// 注册表单校验规则
const registerRules: FormRules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 2, max: 20, message: "用户名长度应在 2~20 个字符", trigger: "blur" },
  ],
  phone: [
    { required: true, message: "请输入电话", trigger: "blur" },
    { pattern: /^[0-9-+\s]+$/, message: "电话格式不正确", trigger: "blur" },
  ],
  email: [
    { required: true, message: "请输入邮箱地址", trigger: "blur" },
    { type: "email", message: "邮箱格式不正确", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 20, message: "密码长度应在 6~20 个字符", trigger: "blur" },
  ],
  confirmPassword: [
    { required: true, message: "请确认密码", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (value !== registerForm.password) {
          callback(new Error("两次输入的密码不一致"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
};

// 引用表单实例
const loginFormRef = ref<FormInstance>();
const registerFormRef = ref<FormInstance>();

// 根据路由参数设置初始表单类型
formType.value = route.query.form === "register" ? "register" : "login";

// 切换表单类型
function switchForm(type: "login" | "register") {
  formType.value = type;
}

// 登录逻辑
function handleLogin() {
  if (!loginFormRef.value) return;
  loginFormRef.value.validate((valid: boolean) => {
    if (valid) {
      // TODO: 在此处实现实际的登录逻辑
      console.log("Login:", loginForm.username, loginForm.password);
      ElMessage.success("登录成功！");
      router.push("/dashboard"); // 登录成功后跳转到主页
    } else {
      ElMessage.error("请检查输入信息");
    }
  });
}

// 注册逻辑
function handleRegister() {
  if (!registerFormRef.value) return;

  registerFormRef.value.validate((valid) => {
    if (valid) {
      console.log("注册表单数据:", registerForm);
      // 调用实际的注册 API
      // TODO: 在此处实现实际的注册逻辑
      ElMessage.success("注册成功！");
      // 注册成功后自动切换到登录表单
      setTimeout(() => {
        switchForm("login");
      }, 1500);
    } else {
      ElMessage.error("请检查输入信息");
    }
  });
}

// 示例：忘记密码
function onForgotPassword() {
  ElMessage.info("请联系管理员或使用找回密码功能");
}

// 轮播图数据
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
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 1rem;
  margin-bottom: 2rem;
  color: #666;
}

/* 表单样式优化 */
.login-form,
.register-form {
  margin-bottom: 1.5rem;
}

.input-field {
  margin-bottom: 1.2rem;

  :deep(.el-input__wrapper) {
    padding: 0.8rem 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: all 0.3s;

    &:hover,
    &:focus {
      box-shadow: 0 3px 12px rgba(51, 125, 255, 0.15);
    }

    &.is-focus {
      border-color: #337dff;
    }
  }

  :deep(.el-input__prefix) {
    margin-right: 10px;
    color: #337dff;
  }
}

/* 按钮样式优化 */
.submit-button {
  width: 100%;
  height: 3rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: 1px;
  background: linear-gradient(90deg, #337dff, #5fa7ff);
  border: none;
  color: #fff;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(51, 125, 255, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(51, 125, 255, 0.4);
    background: linear-gradient(90deg, #2b6ce0, #4e8ee0);
  }

  &:active {
    transform: translateY(-1px);
  }
}

/* 忘记密码 */
.options {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;

  .forgot-password {
    font-size: 0.9rem;
  }
}

/* 表单切换链接样式 */
.form-switch-link {
  font-size: 0.9rem;
  color: #666;
  margin-top: 1rem;

  .switch-btn {
    font-weight: 500;
    margin-left: 4px;

    &:hover {
      opacity: 0.8;
    }
  }
}

/* 轮播区域样式 */
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
