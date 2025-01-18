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
      >
        <el-option label="管理员" value="admin"></el-option>
        <el-option label="普通用户" value="user"></el-option>
      </el-select>
      <el-button
        @click="searchUsers"
        style="background-color: #ff5c00; border-color: #ff5c00; color: #fff"
        >搜索</el-button
      >
      <el-button type="success" @click="addUser">新增用户</el-button>
    </el-row>

    <!-- 用户列表 -->
    <el-table :data="users" style="width: 100%" stripe>
      <el-table-column label="头像" width="80">
        <template #default="scope">
          <el-avatar :src="scope.row.avatar" />
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="role" label="角色" />
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <el-tooltip :content="scope.row.status ? '点击禁用' : '点击启用'">
            <el-switch
              v-model="scope.row.status"
              @change="toggleStatus(scope.row)"
            />
          </el-tooltip>
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
          ></el-button>
          <el-button
            type="danger"
            icon="Delete"
            @click="deleteUser(scope.row)"
            circle
            size="small"
          ></el-button>
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
    <el-dialog
      v-model="dialogVisible"
      title="用户信息"
      width="50%"
      :close-on-click-modal="false"
    >
      <UserForm
        :form-data="formData"
        :permissions="['view:username', 'view:email', 'view:role']"
        @submit="handleSubmit"
        style="padding: 20px"
      />
    </el-dialog>
  </div>
</template>

<style scoped>
/* 为页面添加背景色 */
.admin-page {
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  min-height: 100vh;
  padding: 20px;
}

/* 加深表格标题行颜色 */
.el-table th {
  background-color: #f0f2f5 !important;
  color: #333;
}

/* 自定义表格行样式 */
.el-table .even-row {
  background-color: #f9f9f9;
}
.custom-dialog {
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.custom-dialog .el-dialog__body {
  padding: 20px 30px;
}
</style>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import UserForm from "../../components/UserForm.vue";

// 定义用户类型
interface User {
  id: number;
  avatar: string;
  username: string;
  email: string;
  role: string;
  status: boolean;
}

// 搜索和筛选
const searchQuery = ref(""); // 搜索关键字
const selectedRole = ref(""); // 筛选角色

// 表格数据
const users = ref<User[]>([]); // 用户列表
const totalUsers = ref(0); // 总用户数
const currentPage = ref(1); // 当前页码
const pageSize = ref(10); // 每页条数

// 静态用户数据
const allUsers: User[] = [
  {
    id: 1,
    avatar: "https://example.com/avatar1.png",
    username: "admin",
    email: "admin@example.com",
    role: "admin",
    status: true,
  },
  {
    id: 2,
    avatar: "https://example.com/avatar2.png", // 添加 avatar 属性
    username: "user1",
    email: "user1@example.com",
    role: "user",
    status: true,
  },
  {
    id: 3,
    avatar: "https://example.com/avatar3.png", // 添加 avatar 属性
    username: "user2",
    email: "user2@example.com",
    role: "user",
    status: false,
  },
  {
    id: 4,
    avatar: "https://example.com/avatar4.png", // 添加 avatar 属性
    username: "user3",
    email: "user3@example.com",
    role: "user",
    status: true,
  },
  {
    id: 5,
    avatar: "https://example.com/avatar5.png", // 添加 avatar 属性
    username: "user4",
    email: "user4@example.com",
    role: "user",
    status: false,
  },
];

// 弹窗和表单
const dialogVisible = ref(false); // 表单弹窗显示状态
const formData = reactive<Partial<User>>({}); // 当前编辑的用户数据
const isEditing = ref(false); // 区分新增和编辑模式

// 分页方法
const handleSizeChange = (size: number) => {
  pageSize.value = size;
  fetchUsers();
};
const handleCurrentChange = (page: number) => {
  currentPage.value = page;
  fetchUsers();
};

// 获取用户列表
const fetchUsers = () => {
  let filteredUsers = allUsers;
  if (searchQuery.value) {
    filteredUsers = filteredUsers.filter((user) =>
      user.username.includes(searchQuery.value)
    );
  }
  if (selectedRole.value) {
    filteredUsers = filteredUsers.filter(
      (user) => user.role === selectedRole.value
    );
  }
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  users.value = filteredUsers.slice(start, end);
  totalUsers.value = filteredUsers.length;
};

// 搜索用户
const searchUsers = () => {
  currentPage.value = 1;
  fetchUsers();
};

// 新增用户
const addUser = () => {
  dialogVisible.value = true;
  isEditing.value = false; // 新增模式
  Object.assign(formData, {
    id: Date.now(),
    avatar: "",
    username: "",
    email: "",
    role: "",
    status: true,
  });
};

// 编辑用户
const editUser = (user: User) => {
  dialogVisible.value = true;
  isEditing.value = true; // 编辑模式
  Object.assign(formData, user); // 填充表单数据
};

// 表单提交
const handleSubmit = (data: User) => {
  if (isEditing.value) {
    // 更新用户数据
    const index = allUsers.findIndex((u) => u.id === data.id);
    if (index !== -1) {
      allUsers[index] = { ...data };
      ElMessage.success("用户信息已更新");
    }
  } else {
    // 新增用户
    allUsers.push({ ...data });
    ElMessage.success("用户已新增");
  }
  fetchUsers();
  dialogVisible.value = false;
};

// 删除用户
const deleteUser = async (user: User) => {
  try {
    await ElMessageBox.confirm(`确认删除用户 "${user.username}" 吗？`, "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    });
    const index = allUsers.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      allUsers.splice(index, 1);
      ElMessage.success("用户删除成功");
      fetchUsers();
    }
  } catch (error) {
    if (error !== "cancel") {
      ElMessage.error("删除用户失败");
    }
  }
};

// 切换用户状态
const toggleStatus = (user: User) => {
  user.status = !user.status;
  ElMessage.success(`用户 "${user.username}" 状态已更新`);
};

// 添加方法来返回行的类名
const tableRowClassName = (row: any, index: number) => {
  if (index % 2 === 1) {
    return "even-row";
  }
  return "";
};

// 初始化加载用户数据
onMounted(() => {
  fetchUsers();
});
</script>
