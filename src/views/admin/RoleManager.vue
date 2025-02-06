<template>
  <el-card style="margin-top: 20px; height: 90%">
    <div class="role-manager">
      <!-- 添加角色 -->
      <el-row class="add-role-bar">
        <el-button type="primary" @click="addRole">添加角色</el-button>
      </el-row>

      <!-- 角色列表 -->
      <BaseTable
        :tableData="roles"
        :columns="columns"
        :actions="actions"
        :size="'large'"
        :fit="true"
      />

      <!-- 分页 -->
      <BasePagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="totalRoles"
        layout="total, sizes, prev, pager, next, jumper"
        @pagination-change="handlePaginationChange"
      />
    </div>

    <!-- 编辑/添加角色的对话框 -->
    <el-dialog
      title="角色管理"
      v-model="editDialogVisible"
      width="40%"
      @close="resetEditForm"
    >
      <el-form :model="editForm" label-width="100px">
        <el-form-item label="角色名称">
          <el-input v-model="editForm.name" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="editForm.description" type="textarea" />
        </el-form-item>
        <el-form-item label="关联权限">
          <el-select
            v-model="editForm.permissions"
            multiple
            filterable
            placeholder="选择关联权限"
            style="width: 100%"
            value-key="id"
          >
            <el-option
              v-for="permission in availablePermissions"
              :key="permission.id"
              :label="permission.name"
              :value="permission"
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
import { ref, onMounted } from "vue";
import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus";

interface Role {
  id: number;
  name: string;
  description: string;
  permissions: Permission[]; // 存储权限对象数组，而不是 ID
}

interface Permission {
  id: number;
  name: string;
  code: string;
}

interface TableColumn {
  prop: string;
  label: string;
  width?: string;
}

// 响应式数据
const roles = ref<Role[]>([]);
const currentPage = ref(1);
const pageSize = ref(10);
const totalRoles = ref(0);
const editDialogVisible = ref(false);
const editForm = ref<Role>({
  id: 0,
  name: "",
  description: "",
  permissions: [],
});
const availablePermissions = ref<Permission[]>([]);

// 表格列配置
const columns: TableColumn[] = [
  { prop: "id", label: "角色ID", width: "120px" },
  { prop: "name", label: "角色名称" },
  { prop: "description", label: "角色描述" },
];

// 操作按钮配置
const actions = [
  {
    label: "编辑",
    type: "primary",
    icon: "Edit",
    circle: true,
    handler: (row: Role) => editRole(row),
  },
  {
    label: "删除",
    type: "danger",
    icon: "Delete",
    circle: true,
    handler: (row: Role) => deleteRole(row),
  },
];

// 获取角色列表
const fetchRoles = async () => {
  try {
    const response = await axios.get("http://localhost:3000/roles", {
      params: { page: currentPage.value, pageSize: pageSize.value },
    });

    if (response.data) {
      roles.value = response.data.map((role: Role) => ({
        ...role,
        permissions: role.permissions || [],
      }));
      totalRoles.value = response.data.length;
    }
  } catch (error) {
    ElMessage.error("获取角色列表失败");
  }
};

// 获取权限列表
const fetchPermissions = async () => {
  try {
    const response = await axios.get("http://localhost:3000/permissions");
    availablePermissions.value = response.data.permissions;
    console.log(availablePermissions.value);
  } catch (error) {
    ElMessage.error("获取权限列表失败");
  }
};

// 分页处理
const handlePaginationChange = ({
  currentPage: page,
  pageSize: size,
}: {
  currentPage: number;
  pageSize: number;
}) => {
  currentPage.value = page;
  pageSize.value = size;
  fetchRoles();
};

// 编辑角色
const editRole = (role: Role) => {
  editForm.value = {
    ...role,
    permissions: role.permissions.map(
      (p) => availablePermissions.value.find((perm) => perm.id === p.id) || p
    ),
  };
  editDialogVisible.value = true;
};

// 添加角色
const addRole = () => {
  resetEditForm();
  editDialogVisible.value = true;
};

// 提交编辑（编辑或新增）
const submitEdit = async () => {
  try {
    const payload = {
      ...editForm.value,
      permissionIds: editForm.value.permissions.map((p) => p.id),
    };

    if (editForm.value.id) {
      await axios.patch(
        `http://localhost:3000/roles/${editForm.value.id}`,
        payload
      );
    } else {
      await axios.post("http://localhost:3000/roles", payload);
    }
    ElMessage.success("操作成功");
    editDialogVisible.value = false;
    fetchRoles();
  } catch (error) {
    ElMessage.error("操作失败");
  }
};

// 删除角色
const deleteRole = async (role: Role) => {
  try {
    await ElMessageBox.confirm(`确定删除角色 ${role.name} 吗？`, "警告", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    });
    await axios.delete(`http://localhost:3000/roles/${role.id}`);
    ElMessage.success("删除成功");
    fetchRoles();
  } catch (error) {
    ElMessage.error("删除失败");
  }
};

// 重置表单
const resetEditForm = () => {
  editForm.value = { id: 0, name: "", description: "", permissions: [] };
};

// 初始化数据
onMounted(() => {
  fetchRoles();
  fetchPermissions();
});
</script>

<style lang="scss" scoped>
.role-manager {
  padding: 20px;

  .add-role-bar {
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-end;
  }

  .el-table {
    margin-bottom: 20px;
  }

  .el-pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>
