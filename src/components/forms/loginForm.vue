<template>
  <div class="login-form-container">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      label-width="0"
      class="login-form"
    >
      <!-- 用户名 -->
      <el-form-item prop="telephone">
        <el-input
          v-model="loginForm.telephone"
          :prefix-icon="Phone"
          placeholder="请输入手机号"
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
        @click="$emit('switchForm', 'register')"
        :underline="false"
        class="switch-btn"
      >
        立即注册
      </el-link>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import type { FormInstance } from "element-plus";
import { User, Lock, Phone } from "@element-plus/icons-vue";

const router = useRouter();

// 登录表单数据
const loginForm = reactive({
  telephone: "",
  password: "",
});

// 登录表单校验规则
const loginRules = {
  telephone: [{ required: true, message: "请输入手机号", trigger: "blur" }], // trigger：“blur”的效果是当失去焦点时触发
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};

// 引用登录表单实例
const loginFormRef = ref<FormInstance>();

// 登录逻辑
function handleLogin() {
  if (!loginFormRef.value) return;
  loginFormRef.value.validate((valid: boolean) => {
    if (valid) {
      console.log("Login:", loginForm.telephone, loginForm.password);
      ElMessage.success("登录成功！");
      router.push("/dashboard");
    } else {
      ElMessage.error("请检查输入信息");
    }
  });
}

// 忘记密码示例
function onForgotPassword() {
  router.push("/dev/forgot-password");
}
</script>

<style scoped lang="scss">
/* 表单容器与间距 */
.login-form {
  margin-bottom: 1.5rem;
}
.input-field {
  margin-bottom: 0.5rem;
  :deep(.el-input__wrapper) { // :deep(.el-input__wrapper) 作用于 Element Plus 输入框的最外层包裹容器
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
  :deep(.el-input__prefix) { // :deep(.el-input__prefix) 作用于 Element Plus 输入框的前缀图标容器
    margin-right: 10px;
    color: #337dff;
  }
}

/* 按钮样式 */
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

/* 表单切换链接 */
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
</style>
