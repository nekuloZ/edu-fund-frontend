<template>
  <el-menu
    default-active="dashboard"
    class="el-menu-vertical-demo"
    @select="handleMenuSelect"
  >
    <el-menu-item index="">
      <el-icon><location /></el-icon>
      <span>Dashboard</span>
    </el-menu-item>
    <el-menu-item index="funds">
      <el-icon><icon-menu /></el-icon>
      <span>Fund Management</span>
    </el-menu-item>
    <el-menu-item index="users">
      <el-icon><document /></el-icon>
      <span>User Management</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();

// 菜单点击事件
const handleMenuSelect = (index: string) => {
  router.push(`/admin/${index}`);
};
</script>

<style scoped>
.el-menu-vertical-demo {
  width: 200px;
  min-height: 100vh;
}
</style>
