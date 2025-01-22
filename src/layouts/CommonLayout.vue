<template>
  <el-container style="height: 100vh">
    <!-- 顶部 Header -->
    <el-header
      style="
        background-color: #3e4a61;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        height: 60px;
      "
    >
      <div style="display: flex; align-items: center">
        <!-- 网站名字 -->
        <span
          style="
            font-size: 18px;
            font-weight: bold;
            margin-right: 20px;
            color: #ff5c00;
          "
        >
          乡村教育基金管理系统
        </span>
      </div>
      <!-- 用户信息 -->
      <div style="display: flex; align-items: center">
        <span style="margin-right: 10px; color: #fff">欢迎, xxx</span>
        <el-dropdown>
          <el-avatar
            src="https://via.placeholder.com/40"
            size="40"
            style="cursor: pointer"
          />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="viewProfile">个人信息</el-dropdown-item>
              <el-dropdown-item @click="logout">登出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>

    <el-container style="height: calc(100vh - 60px)">
      <!-- 左侧菜单栏 -->
      <el-aside
        style="
          background-color: #fff;
          width: 220px;
          height: 100%;
          border-right: 1px solid #e6e6e6;
        "
      >
        <!-- 菜单组件 -->
        <el-menu
          :default-active="$route.name"
          style="border-right: none; padding-top: 20px"
          :collapse="false"
        >
          <el-menu-item index="BoardView" @click="navigateTo('/admin')">
            <el-icon><Dashboard /></el-icon>
            仪表盘
          </el-menu-item>
          <el-menu-item index="FundManager" @click="navigateTo('/admin/funds')">
            <el-icon><Fund /></el-icon>
            项目管理
          </el-menu-item>
          <el-sub-menu index="UserFunctions">
            <template #title>
              <el-icon><User /></el-icon>
              <span style="font-size: 16px; font-weight: bold; color: #409eff;">用户功能</span>
            </template>
            <el-menu-item
              index="UserManager"
              @click="navigateTo('/admin/users')"
              style="padding-left: 40px;"
            >
              用户管理
            </el-menu-item>
            <el-menu-item
              index="RoleManager"
              @click="navigateTo('/admin/roles')"
              style="padding-left: 40px;"
            >
              角色管理
            </el-menu-item>
            <el-menu-item
              index="PermissionManager"
              @click="navigateTo('/admin/permissions')"
              style="padding-left: 40px;"
            >
              权限管理
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>

      <!-- 主内容 -->
      <el-main style="background-color: #f0f0f0; height: 100%">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();
const navigateTo = (path: string) => {
  router.push(path);
};
// 点击个人信息
const viewProfile = () => {
  console.log("跳转到个人信息页面");
};

// 点击登出
const logout = () => {
  console.log("执行登出逻辑");
  // 可以根据需要添加路由跳转或API调用
};
</script>

<style scoped>
/* 确保菜单栏宽度固定 */
.el-menu-vertical-demo {
  width: 200px;
  min-height: 100%;
}

/* 确保布局稳定，整体填满视口 */
.el-aside {
  height: 100%;
}
</style>
