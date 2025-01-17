<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin">
      <h2>用户登录</h2>
      <div>
        <label for="username">用户名：</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">密码：</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">登录</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  const username = ref('')
  const password = ref('')
  const handleLogin = () => {
    console.log(username.value, password.value)
  }
</script>


<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: #f9f9f9;
}
form {
  display: flex;
  flex-direction: column;
}
label {
  margin-bottom: 5px;
}
input {
  margin-bottom: 15px;
  padding: 8px;
  font-size: 14px;
}
button {
  padding: 10px;
  background: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
button:hover {
  background: #0056b3;
}
</style>
