<template>
  <div class="user-manager">
    <!-- 搜索和筛选 -->
    <el-row class="search-bar">
      <BaseInput
        v-model="searchQuery"
        placeholder="输入用户名"
        class="search-input"
      />
      <BaseButton @click="searchUsers">搜索</BaseButton>
    </el-row>

    <!-- 用户列表 -->
    <BaseTable
      :tableData="users"
      :columns="columns"
      :actions="actions"
      :border="false"
      :size="'large'"
      :fit="true"
      @filter-change="handleFilterChange"
    >
      <!-- 头像插槽 -->
      <template #avatarSlot="{ row }">
        <el-avatar :src="row.avatar" />
      </template>

      <!-- 角色插槽 -->
      <template #rolesSlot="{ row }">
        <el-tag
          v-for="role in row.roles"
          :key="role.id"
          type="primary"
          effect="plain"
          style="margin-right: 5px"
        >
          {{ role.name }}
        </el-tag>
        <el-tag v-if="row.roles.length === 0" type="info"> 未分配角色 </el-tag>
      </template>
    </BaseTable>

    <!-- 分页 -->
    <BasePagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :total="totalUsers"
      background
      layout="total, sizes, prev, pager, next, jumper"
      @pagination-change="handlePaginationChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus";

/** 定义角色接口 */
interface Role {
  id: number;
  name: string;
  permissions?: string[];
}

/** 定义用户接口 */
interface User {
  id: number;
  username: string;
  email: string;
  avatar: string;
  roles: Role[];
}
/** 定义表格列接口 */
interface columns {
  prop: string;
  label: string;
  width?: string;
  slot?: string;
}

/** 定义表格操作按钮接口 */
interface actions {
  label: string;
  type: string;
  icon: string;
  handler: (row: User) => void;
}
// 定义响应式变量
const users = ref<User[]>([]);
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const totalUsers = ref<number>(0);
const searchQuery = ref<string>("");
const selectedRole = ref<number | null>(null);
const rolesList = ref<Role[]>([]);
/**
 * 获取角色列表
 */
const fetchRoles = async (): Promise<void> => {
  try {
    const response = await axios.get("http://localhost:3000/roles");
    rolesList.value = response.data;
  } catch (error) {
    ElMessage.error("获取角色列表失败");
  }
};
/**
 * 获取用户列表
 */
const fetchUsers = async () => {
  try {
    const response = await axios.get("http://localhost:3000/users", {
      params: {
        page: currentPage.value,
        pageSize: pageSize.value,
        search: searchQuery.value,
        roleId: selectedRole.value || undefined, // 只有在选择了角色时才传递
      },
    });
    users.value = response.data.users;
    totalUsers.value = response.data.total;
  } catch (error) {
    ElMessage.error("获取用户列表失败");
  }
};
/**
 * 搜索用户
 */
const searchUsers = async (): Promise<void> => {
  currentPage.value = 1;
  await fetchUsers();
};
/**
 * 按角色筛选用户
 */
const roleFilters = computed(() =>
  rolesList.value.map((role) => ({
    text: role.name, // 筛选显示的文本
    value: role.name, // 筛选的依据
  }))
);

// 定义表格列
const columns = [
  { prop: "avatar", width: "80", slot: "avatarSlot", align: "center" },
  { prop: "username", label: "用户名", minWidth: "150" },
  { prop: "email", label: "邮箱", minWidth: "200" },
  {
    prop: "roles",
    label: "角色",
    slot: "rolesSlot",
    minWidth: "250",
    filters: roleFilters,
    filterMethod: (value: string, row: User) =>
      row.roles.some((role) => role.name.includes(value)),
  },
];

// 定义操作按钮
const actions = [
  {
    label: "编辑",
    type: "primary",
    icon: "Edit",
    circle: true,
    handler: (row: User) => editUser(row),
  },
  {
    label: "删除",
    type: "danger",
    icon: "Delete",
    circle: true,
    handler: (row: User) => deleteUser(row),
  },
];

const handleFilterChange = async (filters: Record<string, any>) => {
  console.log("筛选条件:", filters);
  selectedRole.value = filters.roles ? filters.roles[0] : null;
  await fetchUsers();
};
/**
 * 处理分页大小变化
 */
const handlePaginationChange = (page: number, size: number) => {
  currentPage.value = page;
  pageSize.value = size;
  fetchUsers();
};
/**
 * 编辑用户
 */
const editUser = (user: User): void => {
  console.log("编辑用户:", user);
};

/**
 * 删除用户
 */
const deleteUser = async (user: User): Promise<void> => {
  try {
    await ElMessageBox.confirm(`确定要删除用户 ${user.username} 吗？`, "警告", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    });
    await axios.delete(`http://localhost:3000/users/${user.id}`);
    ElMessage.success("删除成功");
    fetchUsers();
  } catch (error) {
    ElMessage.error("删除用户失败");
  }
};

// 组件挂载时加载数据
onMounted(() => {
  fetchUsers();
  fetchRoles();
});
</script>

<style lang="scss" scoped>
.user-manager {
  padding: 20px;

  .search-bar {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 20px;

    .search-input {
      width: 220px;
    }

    .role-select {
      width: 180px;
    }
  }
}
</style>
