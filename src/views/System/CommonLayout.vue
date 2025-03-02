<template>
  <div class="common-layout">
    <!-- 左侧导航栏 -->
    <div class="sidebar">
      <div class="logo-container">
        <!-- 使用占位图替代 logo.png -->
        <img
          src="https://placeholder.im/50x50?text=Logo"
          alt="Logo"
          class="logo"
        />
        <h2 class="system-title">教育基金管理系统</h2>
      </div>

      <el-menu
        default-active="1"
        class="sidebar-menu"
        background-color="#222b45"
        text-color="#fff"
        active-text-color="#409eff"
        :collapse="isCollapse"
        :router="true"
      >
        <el-menu-item index="/dashboard" route="/dashboard">
          <el-icon><Monitor /></el-icon>
          <span>数据概览</span>
        </el-menu-item>

        <el-menu-item index="/institutions" route="/institutions">
          <el-icon><School /></el-icon>
          <span>机构管理</span>
        </el-menu-item>

        <el-menu-item index="/projects" route="/projects">
          <el-icon><Folder /></el-icon>
          <span>项目管理</span>
        </el-menu-item>

        <el-menu-item index="/review" route="/review">
          <el-icon><Check /></el-icon>
          <span>审核审批</span>
        </el-menu-item>

        <el-menu-item index="/finance" route="/finance">
          <el-icon><Money /></el-icon>
          <span>财务管理</span>
        </el-menu-item>

        <el-menu-item index="/reports" route="/reports">
          <el-icon><PieChart /></el-icon>
          <span>统计报表</span>
        </el-menu-item>

        <el-menu-item index="/users" route="/users">
          <el-icon><User /></el-icon>
          <span>用户管理</span>
        </el-menu-item>

        <el-menu-item index="/settings" route="/settings">
          <el-icon><Setting /></el-icon>
          <span>系统设置</span>
        </el-menu-item>
      </el-menu>
    </div>

    <!-- 右侧内容区 -->
    <div class="main-content">
      <!-- 顶部栏 -->
      <div class="header">
        <div class="header-left">
          <el-icon @click="toggleSidebar" class="toggle-sidebar">
            <Fold v-if="!isCollapse" />
            <Expand v-else />
          </el-icon>
          <h2 class="page-title">{{ pageTitle }}</h2>
        </div>

        <div class="header-right">
          <el-input
            v-model="searchQuery"
            placeholder="搜索..."
            prefix-icon="Search"
            class="search-input"
          />

          <el-dropdown>
            <div class="user-info">
              <el-badge :value="3" class="notification-badge">
                <el-icon><Bell /></el-icon>
              </el-badge>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>基金申请通过</el-dropdown-item>
                <el-dropdown-item>项目审核待处理</el-dropdown-item>
                <el-dropdown-item>系统更新通知</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <el-dropdown>
            <div class="user-info">
              <!-- 使用占位图替代 avatar.png -->
              <img
                src="https://placeholder.im/36x36?text=Avatar"
                alt="Avatar"
                class="avatar"
              />
              <span class="username">管理员</span>
              <el-icon><ArrowDown /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人资料</el-dropdown-item>
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>

      <!-- 主要内容区 - 替换为路由视图 -->
      <div class="content">
        <!-- 使用路由视图来显示不同页面 -->
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import {
  Monitor,
  Document,
  Folder,
  School,
  Check,
  Money,
  PieChart,
  User,
  Setting,
  Bell,
  ArrowDown,
  Search,
  Fold,
  Expand,
} from "@element-plus/icons-vue";

// 侧边栏折叠状态
const isCollapse = ref(false);

// 搜索查询
const searchQuery = ref("");

// 获取当前路由信息
const route = useRoute();

// 动态页面标题
const pageTitle = computed(() => {
  // 根据当前路由路径返回对应的页面标题
  const routePath = route.path;
  if (routePath.includes("/dashboard")) return "数据概览";
  if (routePath.includes("/institutions")) return "机构管理";
  if (routePath.includes("/projects")) return "项目管理";
  if (routePath.includes("/review")) return "审核审批";
  if (routePath.includes("/finance")) return "财务管理";
  if (routePath.includes("/reports")) return "统计报表";
  if (routePath.includes("/users")) return "用户管理";
  if (routePath.includes("/settings")) return "系统设置";
  return "数据概览";
});

// 切换侧边栏
function toggleSidebar() {
  isCollapse.value = !isCollapse.value;
}

// 格式化进度条显示
const format = (percentage: number) => {
  return percentage + "%";
};

// 格式化当前时间
const currentTime = computed(() => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hour}:${minute}`;
});
</script>

<style scoped lang="scss">
.common-layout {
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: #f8f9fa;
}

// 侧边栏样式
.sidebar {
  width: 250px;
  background-color: #222b45;
  color: #fff;
  transition: width 0.3s;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);

  &.collapsed {
    width: 64px;
  }

  .logo-container {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .logo {
      width: 50px;
      height: 50px;
      margin-bottom: 10px;
    }

    .system-title {
      font-size: 16px;
      margin: 0;
      text-align: center;
      color: #fff;
      white-space: nowrap;
    }
  }

  .sidebar-menu {
    border-right: none;

    .el-menu-item {
      border-left: 3px solid transparent;

      &.is-active {
        border-left: 3px solid #409eff;
        background-color: #1a2035 !important;
      }

      &:hover {
        background-color: #1a2035 !important;
      }

      .el-icon {
        margin-right: 5px;
      }
    }
  }
}

// 主内容区样式
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .header {
    height: 60px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

    .header-left {
      display: flex;
      align-items: center;

      .toggle-sidebar {
        font-size: 20px;
        margin-right: 20px;
        cursor: pointer;
        color: #606266;
      }

      .page-title {
        font-size: 18px;
        margin: 0;
        color: #303133;
      }
    }

    .header-right {
      display: flex;
      align-items: center;

      .search-input {
        margin-right: 20px;
        width: 200px;
      }

      .notification-badge {
        margin-right: 20px;
        font-size: 20px;
        cursor: pointer;

        .el-icon {
          color: #606266;
        }
      }

      .user-info {
        display: flex;
        align-items: center;
        cursor: pointer;

        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          margin-right: 10px;
        }

        .username {
          font-size: 14px;
          margin-right: 5px;
          color: #303133;
        }
      }
    }
  }

  .content {
    flex: 1;
    padding: 20px;
    overflow-y: auto;

    .data-cards {
      margin-bottom: 20px;

      .data-card {
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        transition:
          transform 0.3s,
          box-shadow 0.3s;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .card-header {
          font-size: 16px;
          color: #606266;
          padding: 15px;
          border-bottom: 1px solid #f0f0f0;
        }

        .card-value {
          font-size: 48px;
          font-weight: bold;
          padding: 20px 15px;
          text-align: center;
        }

        &.unresolved {
          .card-value {
            color: #606266;
          }
        }

        &.overdue {
          .card-value {
            color: #f56c6c;
          }
        }

        &.active {
          .card-value {
            color: #67c23a;
          }
        }

        &.on-hold {
          .card-value {
            color: #e6a23c;
          }
        }
      }
    }

    .chart-container {
      margin-bottom: 20px;

      .chart-card {
        border-radius: 8px;
        overflow: hidden;

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;

          span {
            font-size: 16px;
            font-weight: bold;
            color: #303133;
          }

          .time-info {
            font-size: 12px;
            color: #909399;
          }
        }

        .chart-content {
          padding: 20px 0;
          height: 300px;

          .chart-placeholder {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            .chart-image {
              max-width: 100%;
              max-height: 100%;
              object-fit: contain;
            }
          }
        }
      }
    }

    .statistics-row {
      margin-bottom: 20px;

      .statistic-card {
        text-align: center;
        border-radius: 8px;
        padding: 10px;

        .statistic-title {
          font-size: 14px;
          color: #909399;
          margin-bottom: 10px;
        }

        .statistic-value {
          font-size: 24px;
          font-weight: bold;
          color: #303133;
        }
      }
    }

    .performance-card {
      border-radius: 8px;
      padding: 20px;

      .performance-title {
        font-size: 16px;
        margin-bottom: 15px;
        color: #303133;
      }
    }
  }
}

/* 添加过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
