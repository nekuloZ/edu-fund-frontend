<template>
  <div>
    <!-- 搜索和筛选 -->
    <el-row style="margin-bottom: 20px">
      <el-input
        v-model="searchQuery"
        placeholder="输入用户名"
        style="width: 200px; margin-right: 20px"
      />
      <el-select
        v-model="selectedRole"
        placeholder="选择角色"
        style="width: 150px; margin-right: 20px"
        @change="filterUsersByRole"
      >
        <el-option label="全部" value="" />
        <el-option
          v-for="role in rolesList"
          :key="role.id"
          :label="role.name"
          :value="role.id"
        />
      </el-select>
      <el-button
        @click="searchUsers"
        style="background-color: #ff5c00; border-color: #ff5c00; color: #fff"
        >搜索</el-button
      >
    </el-row>

    <!-- 用户列表 -->
    <el-table :data="filteredUsers" style="width: 100%" stripe>
      <el-table-column label="头像" width="80">
        <template #default="scope">
          <el-avatar :src="scope.row.avatar" />
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column label="角色">
        <template #default="scope">
          <el-tag
            v-for="role in scope.row.roles"
            :key="role.id"
            style="margin-right: 5px"
          >
            {{ role.name || "未设置角色" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            type="primary"
            icon="Edit"
            @click="editUser(scope.row)"
            circle
            size="small"
          >
          </el-button>
          <el-button
            type="danger"
            icon="Delete"
            @click="deleteUser(scope.row)"
            circle
            size="small"
          >
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div style="display: flex; justify-content: center; margin-top: 20px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        :total="totalUsers"
        layout="total, sizes, prev, pager, next, jumper"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus";

interface Role {
  id: number;
  name: string;
  permissions: string[];
}

interface User {
  id: number;
  username: string;
  email: string;
  avatar: string;
  roles: Role[];
}

const users = ref<User[]>([]);
const filteredUsers = computed(() => {
  if (!selectedRole.value) {
    return users.value;
  }
  return users.value.filter((user) =>
    user.roles.some((role) => role.id === selectedRole.value)
  );
});
const currentPage = ref(1);
const pageSize = ref(10);
const totalUsers = ref(0);
const searchQuery = ref("");
const selectedRole = ref(0);
const rolesList = ref<Role[]>([]);

const filterUsersByRole = () => {
  currentPage.value = 1;
};

const fetchRoles = async () => {
  try {
    const response = await axios.get("http://localhost:3000/roles");
    rolesList.value = response.data;
  } catch (error) {
    console.error("获取角色列表失败:", error);
    ElMessage.error("获取角色列表失败");
  }
};

const fetchUsers = async () => {
  try {
    const response = await axios.get("http://localhost:3000/users");
    users.value = response.data.users;
    totalUsers.value = response.data.total;
  } catch (error) {
    console.error("获取用户列表失败:", error);
    ElMessage.error("获取用户列表失败");
  }
};

const handleSizeChange = (val: number) => {
  pageSize.value = val;
  fetchUsers();
};

const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  fetchUsers();
};

const editUser = (user: User) => {
  // TODO: 实现编辑用户逻辑
  console.log("编辑用户:", user);
};

const deleteUser = async (user: User) => {
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
    console.error("删除用户失败:", error);
    ElMessage.error("删除用户失败");
  }
};

onMounted(() => {
  fetchUsers();
  fetchRoles();
});
</script>
