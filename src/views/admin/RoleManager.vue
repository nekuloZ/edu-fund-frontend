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

    <!-- 编辑角色的对话框 -->
    <el-dialog
      title="角色编辑"
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
// 原来的搜索相关变量和方法已不再使用
// const searchQuery = ref("");
const editDialogVisible = ref(false);
const editForm = ref<Role>({ id: 0, name: "", description: "" });

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
      params: {
        page: currentPage.value,
        pageSize: pageSize.value,
        // search: searchQuery.value,  // 搜索参数已去除
      },
    });

    console.log("API 返回数据:", response.data);

    if (Array.isArray(response.data)) {
      roles.value = response.data;
      totalRoles.value = response.data.length;
    } else {
      ElMessage.error("角色数据格式不正确");
    }
  } catch (error) {
    ElMessage.error("获取角色列表失败");
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
  editForm.value = { ...role };
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
    if (editForm.value.id) {
      await axios.patch(
        `http://localhost:3000/roles/${editForm.value.id}`,
        editForm.value
      );
    } else {
      await axios.post("http://localhost:3000/roles", editForm.value);
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
  editForm.value = { id: 0, name: "", description: "" };
};

// 初始化数据
onMounted(() => {
  fetchRoles();
});
</script>

<style lang="scss" scoped>
.role-manager {
  padding: 20px;

  .add-role-bar {
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-end; // 可根据需求调整位置
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
