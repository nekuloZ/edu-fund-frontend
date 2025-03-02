<template>
  <div class="user-management">
    <div class="page-header">
      <p class="page-description">管理系统中的所有用户账号信息</p>
    </div>

    <user-table
      @add="handleAddUser"
      @edit="handleEditUser"
      @delete="handleDeleteUser"
      @status-change="handleStatusChange"
      @batch-delete="handleBatchDelete"
      @batch-status-change="handleBatchStatusChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import UserTable from '@/components/tables/UserTable.vue';
import type { UserInfo } from '@/types/user';

// 处理添加用户
const handleAddUser = (userData: UserInfo) => {
  // 这里可以调用实际的API
  console.log('添加用户:', userData);
  ElMessage.success('添加用户成功');
};

// 处理编辑用户
const handleEditUser = (userData: UserInfo) => {
  // 这里可以调用实际的API
  console.log('编辑用户:', userData);
  ElMessage.success('编辑用户成功');
};

// 处理删除用户
const handleDeleteUser = (userId: string) => {
  // 这里可以调用实际的API
  console.log('删除用户:', userId);
  ElMessage.success('删除用户成功');
};

// 处理状态变更
const handleStatusChange = (data: { id: string; status: number }) => {
  // 这里可以调用实际的API
  console.log('状态变更:', data);
  ElMessage.success(`用户状态已${data.status === 1 ? '启用' : '禁用'}`);
};

// 处理批量删除
const handleBatchDelete = (ids: string[]) => {
  // 这里可以调用实际的API
  console.log('批量删除:', ids);
  ElMessage.success(`已成功删除 ${ids.length} 个用户`);
};

// 处理批量状态变更
const handleBatchStatusChange = (data: { ids: string[]; status: number }) => {
  // 这里可以调用实际的API
  console.log('批量状态变更:', data);
  ElMessage.success(`已成功${data.status === 1 ? '启用' : '禁用'} ${data.ids.length} 个用户`);
};
</script>

<style scoped lang="scss">
.user-management {
  .page-header {
    margin-bottom: 20px;
    
    .page-title {
      font-size: 24px;
      color: #303133;
      margin-bottom: 8px;
    }
    
    .page-description {
      font-size: 14px;
      color: #909399;
    }
  }
}
</style> 