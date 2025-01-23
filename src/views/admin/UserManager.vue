<template>
  <el-card style="margin-top: 20px; height: 90%">
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
        v-loading="loading"
        :tableData="users"
        :columns="columns"
        :actions="actions"
        :size="''"
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
          <el-tag v-if="row.roles.length === 0" type="info">
            未分配角色
          </el-tag>
        </template>
      </BaseTable>

      <!-- 分页 -->
      <BasePagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="totalUsers"
        layout="total, sizes, prev, pager, next, jumper"
        @pagination-change="handlePaginationChange"
      />
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
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
const route = useRoute();
const router = useRouter();
const loading = ref(false);
const users = ref<User[]>([]);
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const totalUsers = ref<number>(0);
const searchQuery = ref<string>("");
const selectedRole = ref<number | null>(null);
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
  } finally {
    loading.value = false;
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
const roleFilters = computed(() => {
  // 从当前表格数据中提取所有角色
  const uniqueRoles = new Set<string>();
  users.value.forEach((user) => {
    user.roles.forEach((role) => {
      uniqueRoles.add(role.name);
    });
  });

  // 转换为 filters 需要的格式
  return Array.from(uniqueRoles).map((roleName) => ({
    text: roleName,
    value: roleName,
  }));
});

// 定义表格列
const columns = [
  { prop: "avatar", width: "80px", slot: "avatarSlot", align: "center" },
  { prop: "username", label: "用户名" },
  { prop: "email", label: "邮箱" },
  {
    prop: "roles",
    label: "角色",
    slot: "rolesSlot",
    filters: roleFilters.value,
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

watch(
  () => route.query,
  async (newQuery) => {
    currentPage.value = Number(newQuery.page) || 1;
    pageSize.value = Number(newQuery.pageSize) || 10;
    await fetchUsers();
  },
  { immediate: true }
);
/**
 * 处理分页大小变化
 */
const handlePaginationChange = (page: number, size: number) => {
  currentPage.value = page;
  pageSize.value = size;
  router.push({
    path: route.path,
    query: { page, pageSize: size, search: searchQuery.value },
  });
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
  }

  .el-table {
    margin-bottom: 20px; // 调整表格与分页之间的间距
  }

  .el-pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px; // 增加分页与内容的距离
  }
}
</style>
