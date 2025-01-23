<template>
  <el-container style="height: 100vh">
    <!-- 左侧菜单栏 -->
    <el-aside style="background: #1e293b; width: 250px; height: 100%">
      <!-- 网站名称 -->
      <div
        style="
          background-color: #1e293b;
          text-align: center;
          padding: 20px 0;
          border-bottom: medium solid #f0f0f0;
        "
      >
        <el-text type="warning" class="page-title">
          乡村教育基金管理系统
        </el-text>
      </div>

      <!-- 菜单组件 -->
      <el-menu
        router
        :default-active="$route.path"
        style="border-right: none; padding-top: 20px"
        :collapse="false"
        background-color="#1e293b"
        text-color="#fff"
      >
        <el-menu-item index="/admin" @click="navigateTo('/admin')">
          <el-icon><House /></el-icon>
          <span>仪表盘</span>
        </el-menu-item>

        <el-sub-menu index="user-management">
          <template #title>
            <el-icon><User /></el-icon>
            <span class="nav-text">用户管理</span>
          </template>
          <el-menu-item
            index="/admin/users"
            @click="navigateTo('/admin/users')"
          >
            <el-icon><Avatar /></el-icon>
            用户列表
          </el-menu-item>
          <el-menu-item
            index="/admin/roles"
            @click="navigateTo('/admin/roles')"
          >
            <el-icon><Key /></el-icon>
            角色管理
          </el-menu-item>
          <el-menu-item
            index="/admin/permissions"
            @click="navigateTo('/admin/permissions')"
          >
            <el-icon><Lock /></el-icon>
            权限管理
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <!-- 顶部 Header -->
      <el-header
        style="
          height: 80px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 20px;
          top: 0;
          right: 0;
          width: 100%;
          background-color: #fff;
        "
      >
        <!-- 用户信息 -->
        <el-row style="display: flex; align-items: center; margin-left: auto">
          <el-text
            class="normal-text"
            style="margin-right: 10px; color: #303133"
            >欢迎, xxx</el-text
          >
          <el-dropdown>
            <el-avatar
              src="https://via.placeholder.com/40"
              size="40"
              style="cursor: pointer"
            />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="viewProfile"
                  >个人信息</el-dropdown-item
                >
                <el-dropdown-item @click="logout">登出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-row>
      </el-header>
      <!-- 主内容 -->
      <el-main
        class="normal-text"
        style="background-color: #f0f0f0; height: 100vh"
      >
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
.el-menu-item {
  font-size: var(--el-font-size-small);
  line-height: var(--el-line-height-14);
  font-weight: var(--el-font-weight-bold);
  border-radius: 20px; /* 调整圆角，使其变成胶囊形 */
  margin: 5px 10px; /* 适当增加外边距，确保不紧贴边界 */
  padding: 10px 20px; /* 增加内边距使内容更居中 */
}

.el-menu-item:hover {
  background-color: #3b82f6 !important; /* 更明显的悬停颜色 */
}
.el-menu-item.is-active {
  background-color: #334155 !important;
  transition: all 0.3s ease-in-out; /* 添加平滑过渡效果 */
}
.el-sub-menu__title {
  font-size: 16px;
  color: #409eff !important;
}

.el-icon {
  margin-right: 8px;
}

.el-header {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}
</style>
