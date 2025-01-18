<template>
  <div class="login-container">
    <div class="login-box">
      <div class="identity-selector">
        <button
          :class="{ active: selectedIdentity === 'user' }"
          @click="selectedIdentity = 'user'"
        >
          普通用户
        </button>
        <button
          :class="{ active: selectedIdentity === 'admin' }"
          @click="selectedIdentity = 'admin'"
        >
          管理员
        </button>
      </div>

      <form v-if="selectedIdentity === 'user'" @submit.prevent="handleLogin">
        <h2>用户登录</h2>
        <div class="input-group">
          <label for="username">用户名</label>
          <input
            type="text"
            id="username"
            v-model="username"
            required
            placeholder="请输入用户名"
          />
        </div>
        <div class="input-group">
          <label for="password">密码</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="请输入密码"
          />
        </div>
        <button type="submit" class="login-button">登录</button>
      </form>

      <form v-else @submit.prevent="handleLogin">
        <h2>管理员登录</h2>
        <div class="input-group">
          <label for="admin-username">管理员账号</label>
          <input
            type="text"
            id="admin-username"
            v-model="username"
            required
            placeholder="请输入管理员账号"
          />
        </div>
        <div class="input-group">
          <label for="admin-password">密码</label>
          <input
            type="password"
            id="admin-password"
            v-model="password"
            required
            placeholder="请输入密码"
          />
        </div>
        <button type="submit" class="login-button">登录</button>
      </form>

      <div class="additional-options">
        <router-link to="/forgot-password" class="option-link"
          >忘记密码？</router-link
        >
        <router-link to="/register" class="option-link">立即注册</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const selectedIdentity = ref("user");
const username = ref("");
const password = ref("");

const router = useRouter();

const handleLogin = async () => {
  if (selectedIdentity.value === "user") {
    console.log("普通用户登录:", username.value);
  } else {
    console.log("管理员登录:", username.value);
  }
};
</script>

<style scoped>
/* 背景和布局 */
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* 确保容器高度为视口高度 */
  background: linear-gradient(135deg, #ff7e5f, #feb47b); /* 渐变背景色 */
  overflow: hidden;
  position: relative;
}

.login-container::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background-image: url("/assets/images/bg.jpg"); /* 背景图片路径 */
  background-size: cover;
  background-position: center;
  filter: blur(20px);
  transform: scale(1.5);
  z-index: -1;
}

/* 登录框设计 */
.login-box {
  background-color: rgba(255, 255, 255, 0.9); /* 半透明背景 */
  padding: 40px 30px; /* 调整左右内边距 */
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2); /* 阴影效果 */
  width: 400px;
  position: relative;
  z-index: 1;
  box-sizing: border-box; /* 确保宽度包含内边距和边框 */
}

/* 消除默认的表单内边距和边距 */
form {
  margin: 0;
  padding: 0;
}

/* 表单标题 */
.login-box h2 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

/* 表单元素 */
.input-group {
  margin-bottom: 20px; /* 统一间距 */
}

.input-group label {
  display: block;
  color: #666;
  margin-bottom: 5px; /* 统一间距 */
}

.input-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;
  box-sizing: border-box; /* 确保宽度包含内边距和边框 */
}

/* 修复输入框宽度不一致的问题 */
.input-group input[type="text"],
.input-group input[type="password"] {
  width: 100%;
}

.input-group input:focus {
  border-color: #ff5733;
}

/* 按钮样式 */
.login-button {
  width: 100%;
  padding: 14px; /* 调整按钮高度 */
  background: linear-gradient(90deg, #ff5733, #ff8d60);
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 18px; /* 调整字体大小 */
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
  box-sizing: border-box; /* 确保宽度包含内边距和边框 */
}

/* 确保登录按钮与输入框宽度一致 */
.login-button {
  width: 100%;
}

.login-button:hover {
  background: linear-gradient(90deg, #ff8d60, #ff5733);
  transform: translateY(-2px);
}

.login-button:active {
  transform: translateY(0);
}

/* 额外选项 */
.additional-options {
  display: flex;
  justify-content: space-between;
  margin-top: 15px; /* 调整间距 */
}

.option-link {
  color: #ff5733;
  text-decoration: none;
  transition: color 0.3s;
}

.option-link:hover {
  text-decoration: underline;
  color: #e04e2f;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .login-box {
    width: 90%;
    padding: 30px 20px;
  }
}

/* 添加身份选择器的样式 */
.identity-selector {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.identity-selector button {
  background-color: transparent;
  border: none;
  color: #666;
  font-size: 16px;
  padding: 10px 20px;
  cursor: pointer;
  transition: color 0.3s, border-bottom 0.3s;
  border-bottom: 2px solid transparent;
}

.identity-selector button.active {
  color: #ff5733;
  border-bottom: 2px solid #ff5733;
}

.identity-selector button:hover {
  color: #ff5733;
}
</style>
