<template>
  <el-row :gutter="20">
    <!-- 添加栅格布局 -->
    <el-col :span="12">
      <!-- 每个表单项占据一半宽度 -->
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username" />
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formData.email" />
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="20">
      <!-- 角色选择器占据更大宽度 -->
      <el-form-item label="角色" prop="role">
        <el-select v-model="formData.role" style="width: 100%">
          <el-option label="管理员" value="admin" />
          <el-option label="普通用户" value="user" />
        </el-select>
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref } from "vue";

interface FormRules {
  username: Array<{ required: boolean; message: string; trigger: string }>;
  email: Array<{ type: string; message: string; trigger: string }>;
  role: Array<{ required: boolean; message: string; trigger: string }>;
}

interface Permissions {
  view: string[];
  edit: string[];
  action: string[];
}

interface Props {
  formData: Record<string, any>;
  permissions: string[];
  roles?: string[];
}

const props = defineProps<Props>();
const emit = defineEmits(["submit", "cancel"]);

const rules: FormRules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  email: [{ type: "email", message: "请输入有效的邮箱", trigger: "blur" }],
  role: [{ required: true, message: "请选择角色", trigger: "change" }],
});

// 判断是否可以访问字段
const canAccessField = (field: string) => {
  return props.permissions.includes(`view:${field}`);
};

// 判断是否可以编辑字段
const canEditField = (field: string) => {
  return props.permissions.includes(`edit:${field}`);
};

// 判断是否可以执行操作
const canAccessAction = (action: string) => {
  return props.permissions.includes(`action:${action}`);
};

// 表单提交
const onSubmit = () => {
  const formRef = ref();
  formRef.value?.validate((valid: boolean) => {
    if (valid) {
      emit("submit", props.formData);
    } else {
      console.log("表单验证失败");
    }
  });
};

// 取消操作
const onCancel = () => {
  emit("cancel");
};
</script>
