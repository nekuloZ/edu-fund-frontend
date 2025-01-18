<template>
  <div class="forgot-password-container">
    <div class="forgot-password-box">
      <h2>找回密码</h2>
      <form @submit.prevent="handleForgotPassword">
        <div class="input-group">
          <label for="email">邮箱地址</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <button type="submit" class="submit-button">发送重置链接</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const email = ref("");

const handleForgotPassword = async () => {
  // 处理发送重置密码链接的逻辑
  console.log("发送重置链接到:", email.value);
};
</script>

<style scoped>
/* 与登录页面类似的样式 */
.forgot-password-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  height: 100vh;
}

.forgot-password-box {
  background-color: #ffffff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 400px;
}

.forgot-password-box h2 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  color: #666;
  margin-bottom: 5px;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-button {
  width: 100%;
  padding: 12px;
  background-color: #ff5733;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #e04e2f;
}
</style>
