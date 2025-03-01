<template>
  <div class="register-form-container">
    <h1 v-if="showTitle" class="title">乡村教育基金管理系统</h1>
    <p v-if="showTitle" class="subtitle">创建您的账户</p>

    <el-form
      :model="form"
      :rules="rules"
      ref="registerForm"
      label-position="top"
      class="register-form"
    >
      <el-form-item prop="username">
        <el-input
          v-model="form.username"
          :prefix-icon="User"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>

      <el-form-item prop="phone">
        <el-input
          v-model="form.phone"
          :prefix-icon="Phone"
          placeholder="请输入电话"
        ></el-input>
      </el-form-item>

      <el-form-item prop="email">
        <el-input
          v-model="form.email"
          :prefix-icon="Message"
          placeholder="请输入邮箱"
        ></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          v-model="form.password"
          type="password"
          :prefix-icon="Lock"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>

      <el-form-item prop="confirmPassword">
        <el-input
          v-model="form.confirmPassword"
          type="password"
          :prefix-icon="Key"
          placeholder="请再次输入密码"
        ></el-input>
      </el-form-item>

      <el-button type="primary" class="register-button" @click="handleRegister">
        {{ submitText }}
      </el-button>
    </el-form>

    <p v-if="showLoginLink" class="login-link">
      已有账号？<el-link @click="goToLogin" type="primary">登录</el-link>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
import { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import { User, Lock, Message, Phone, Key } from "@element-plus/icons-vue";

const props = defineProps({
  showTitle: {
    type: Boolean,
    default: true,
  },
  showLoginLink: {
    type: Boolean,
    default: true,
  },
  submitText: {
    type: String,
    default: "注册",
  },
});

const emit = defineEmits(["register-success", "go-to-login"]);

const router = useRouter();

// 表单数据
const form = reactive({
  username: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
});

// 表单校验规则
const rules: FormRules = {
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
        if (value !== form.password) {
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
const registerForm = ref<FormInstance>();

// 注册逻辑
function handleRegister() {
  registerForm.value?.validate((valid) => {
    if (valid) {
      console.log("注册表单数据:", form);
      // 调用实际的注册 API
      // registerApi(form).then(...)
      ElMessage.success("注册成功！");
      emit("register-success", form);
    } else {
      console.log("注册表单校验失败");
      ElMessage.error("请检查输入信息");
    }
  });
}

// 跳转到登录
function goToLogin() {
  emit("go-to-login");
  if (props.showLoginLink) {
    router.push("/dev/login");
  }
}
</script>

<style scoped lang="scss">
.register-form-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
}

.title {
  font-size: 1.5rem;
  color: #363740;
  margin-bottom: 0.5rem;
  text-align: center;
}

.subtitle {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1.5rem;
  text-align: center;
}

.register-form {
  text-align: left;
  .el-form-item {
    margin-bottom: 1rem;
  }
}

.register-button {
  width: 100%;
  height: 2.5rem;
  margin-top: 1rem;
  border-radius: 4px;
  font-weight: 500;
}

.login-link {
  font-size: 0.8rem;
  color: #888;
  margin-top: 1rem;
  text-align: center;
}
</style>
