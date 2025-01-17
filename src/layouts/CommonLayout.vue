<template>
  <el-container style="height: 100vh;">
    <!-- 顶部 Header -->
    <el-header
      style="
        background-color: #3e8ef7;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        height: 60px;
      "
    >
      <div style="display: flex; align-items: center;">
        <!-- 网站名字 -->
        <span style="font-size: 18px; font-weight: bold; margin-right: 20px;">
          乡村教育基金管理系统
        </span>

        <!-- 菜单折叠按钮 -->
        <el-button
          type="primary"
          size="small"
          style="margin-left: 10px;"
          @click="toggleCollapse"
        >
          <span v-if="!isCollapse">Collapse Menu</span>
          <span v-else>Expand Menu</span>
        </el-button>
      </div>
    </el-header>

    <el-container style="height: calc(100vh - 60px);">
      <!-- 左侧菜单栏 -->
      <el-aside
        :style="{
          backgroundColor: '#fff', /* 改为白色背景 */
          width: isCollapse ? '60px' : '200px',
          height: '100%',
          transition: 'width 0.3s',
        }"
      >
        <!-- 菜单组件 -->
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          style="background-color: #fff; height: 100%; border: 1px solid transparent;"  
        >
          <el-menu-item index="1">
            <el-icon><Location /></el-icon>
            <span v-if="!isCollapse">功能一</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon><IconMenu /></el-icon>
            <span v-if="!isCollapse">功能二</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon><Setting /></el-icon>
            <span v-if="!isCollapse">功能三</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 主内容 -->
      <el-main style="background-color: #f0f0f0; height: 100%;"> <!-- 改为灰色背景 -->
        <slot />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  Location,
  Menu as IconMenu,
  Setting,
} from "@element-plus/icons-vue";

// 控制菜单折叠状态
const isCollapse = ref(true);

// 切换菜单折叠状态
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value;
};
</script>

<style scoped>
/* 确保菜单栏宽度变化时不破坏布局 */
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100%;
}

/* 确保布局稳定，整体填满视口 */
.el-aside {
  height: 100%;
}
</style>
