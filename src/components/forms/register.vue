<template>
  <div class="register-form-container">
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
        @click="$emit('switchForm', 'login')"
        :underline="false"
        class="switch-btn"
      >
        返回登录
      </el-link>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { User, Phone, Message, Lock, Key } from "@element-plus/icons-vue";

const registerForm = reactive({
  username: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
});

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

const registerFormRef = ref<FormInstance>();

function handleRegister() {
  if (!registerFormRef.value) return;
  registerFormRef.value.validate((valid) => {
    if (valid) {
      console.log("注册表单数据:", registerForm);
      ElMessage.success("注册成功！");
      // 注册成功后自动切换到登录表单（由父组件处理）
    } else {
      ElMessage.error("请检查输入信息");
    }
  });
}
</script>

<style scoped lang="scss">
/* 表单容器与间距 */
.register-form {
  margin-bottom: 0.5rem;
}
.input-field {
  margin-bottom: 0.5rem;
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
