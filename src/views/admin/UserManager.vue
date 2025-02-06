<template>
  <el-card style="margin-top: 20px; height: 90%">
    <div class="user-manager">
      <!-- 搜索框 -->
      <el-row class="search-bar">
        <el-input
          v-model="searchQuery"
          placeholder="输入用户名"
          class="search-input"
          clearable
        />
        <el-button type="primary" @click="searchUsers">搜索</el-button>
      </el-row>

      <!-- 用户列表 -->
      <BaseTable
        :tableData="users"
        :columns="columns"
        :actions="actions"
        :size="'large'"
        :fit="true"
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
    <!-- 编辑用户的对话框 -->
    <el-dialog
      title="角色分配"
      v-model="editDialogVisible"
      width="50%"
      @close="resetEditForm"
    >
      <el-form :model="editForm" label-width="80px" style="display: flex;">
        <el-form-item label="用户名">
          <el-input
            v-model="editForm.username"


            disabled
            style="width: fit-content; min-width: 150px; max-width: 100%"
          />
        </el-form-item>

        <el-form-item label="邮箱">
          <el-input
            v-model="editForm.email"
            disabled
            style="width: fit-content; min-width: 150px; max-width: 100%"
          />
        </el-form-item>

        <el-form-item label="角色">
          <el-select
            v-model="editForm.roles"
            multiple
            placeholder="请选择角色"
            style="width: fit-content; min-width: 150px; max-width: 100%"
          >
            <el-option
              v-for="role in Roles"
              :key="role.id"
              :label="role.name"
              :value="role.id"
            />
          </el-select>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitEdit">确定</el-button>
      </template>
    </el-dialog>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus";

/** 定义用户接口 */
interface User {
  id: number;
  username: string;
  email: string;
  avatar: string;
  roles: { id: number; name: string }[];
}
// 定义角色接口
interface Role {
  id: number;
  name: string;
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
const Roles = ref<{ id: number; name: string }[]>([]);
// 获取用户列表
const fetchUsers = async () => {
  try {
    const response = await axios.get("http://localhost:3000/users", {
      params: {
        page: currentPage.value,
        pageSize: pageSize.value,
        search: searchQuery.value || undefined,
      },
    });
    users.value = response.data.users;
    totalUsers.value = response.data.total;
  } catch (error) {
    ElMessage.error("获取用户列表失败");
  }
};

// 获取角色列表
const fetchRoles = async (): Promise<void> => {
  try {
    const response = await axios.get("http://localhost:3000/roles");
    Roles.value = response.data.map((role: Role) => ({
      id: role.id,
      name: role.name,
    })); // 只取 id 和 name
  } catch (error) {
    ElMessage.error("获取角色列表失败");
  }
};

// 搜索用户

const searchUsers = async (): Promise<void> => {
  currentPage.value = 1;
  await fetchUsers();
};

// 定义表格列
const columns = [
  { prop: "avatar", width: "80px", slot: "avatarSlot", align: "center" },
  { prop: "username", label: "用户名" },
  { prop: "email", label: "邮箱" },
  {
    prop: "roles",
    label: "角色",
    slot: "rolesSlot",
    filters: computed(() => {
      const allRoles = new Set();
      users.value.forEach((user) => {
        user.roles.forEach((role) => allRoles.add(role.name));
      });
      return Array.from(allRoles).map((role) => ({ text: role, value: role }));
    }),
    filterMethod(value: string, row: User) {
      return row.roles.some((role) => role.name === value);
    },
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

// 处理分页大小变化
const handlePaginationChange = ({
  currentPage: page,
  pageSize: size,
}: {
  currentPage: number;
  pageSize: number;
}) => {
  currentPage.value = page;
  pageSize.value = size;
  fetchUsers();
};

// 编辑用户，打开对话框并初始化编辑数据
const editDialogVisible = ref<boolean>(false);
const editForm = ref<User>({
  id: 0,
  username: "",
  email: "",
  avatar: "",
  roles: [],
});

// 克隆用户数据到编辑表单
const editUser = (user: User): void => {
  editForm.value = { ...user };
  editDialogVisible.value = true;
};
// 提交编辑数据
const submitEdit = async (): Promise<void> => {
  try {
    await axios.patch(
      `http://localhost:3000/users/${editForm.value.id}`,
      editForm.value
    );
    ElMessage.success("更新成功");
    editDialogVisible.value = false;
    fetchUsers();
  } catch (error) {
    ElMessage.error("更新失败");
  }
};
// 重置表单数据
const resetEditForm = (): void => {
  editForm.value = { id: 0, username: "", email: "", avatar: "", roles: [] };
};
// 删除用户
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
