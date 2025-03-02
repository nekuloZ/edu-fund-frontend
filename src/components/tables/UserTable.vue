<template>
  <div class="user-table-container">
    <!-- 表格顶部工具栏 -->
    <div class="table-toolbar">
      <div class="left-actions">
        <el-button type="primary" @click="handleAddUser">
          <el-icon><Plus /></el-icon>新增用户
        </el-button>
        <el-button
          type="danger"
          :disabled="!hasSelected"
          @click="handleBatchDelete"
        >
          <el-icon><Delete /></el-icon>批量删除
        </el-button>
        <el-button
          type="warning"
          :disabled="!hasSelected"
          @click="handleBatchStatusChange(0)"
        >
          <el-icon><Lock /></el-icon>批量禁用
        </el-button>
        <el-button
          type="success"
          :disabled="!hasSelected"
          @click="handleBatchStatusChange(1)"
        >
          <el-icon><Check /></el-icon>批量启用
        </el-button>
      </div>
      <div class="right-actions">
        <el-input
          v-model="searchQuery"
          placeholder="搜索用户"
          clearable
          class="search-input"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <el-select
          v-model="statusFilter"
          placeholder="状态筛选"
          clearable
          class="filter-select"
        >
          <el-option label="全部" value="" />
          <el-option label="正常" value="1" />
          <el-option label="禁用" value="0" />
        </el-select>
        <el-select
          v-model="roleFilter"
          placeholder="角色筛选"
          clearable
          class="filter-select"
        >
          <el-option label="全部" value="" />
          <el-option
            v-for="role in roleOptions"
            :key="role.value"
            :label="role.label"
            :value="role.value"
          />
        </el-select>
      </div>
    </div>

    <!-- 用户表格 -->
    <el-table
      v-loading="loading"
      :data="filteredTableData"
      @selection-change="handleSelectionChange"
      style="width: 100%"
      row-key="id"
      border
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="ID" min-width="80" sortable />
      <el-table-column
        prop="username"
        label="用户名"
        min-width="120"
        sortable
      />
      <el-table-column prop="realName" label="姓名" min-width="120" />
      <el-table-column prop="email" label="邮箱" min-width="180" />
      <el-table-column prop="phone" label="电话" min-width="140" />
      <el-table-column prop="roleName" label="角色" min-width="120">
        <template #default="scope">
          <el-tag
            :type="getRoleTagType(scope.row.roleId)"
            effect="light"
            size="small"
          >
            {{ scope.row.roleName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" min-width="100">
        <template #default="scope">
          <el-tag
            :type="scope.row.status === 1 ? 'success' : 'danger'"
            effect="light"
            size="small"
          >
            {{ scope.row.status === 1 ? "正常" : "禁用" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        min-width="180"
        sortable
      >
        <template #default="scope">
          {{ formatDate(scope.row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="220">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            @click="handleEdit(scope.row)"
            text
            bg
          >
            <el-icon><Edit /></el-icon>编辑
          </el-button>
          <el-button
            :type="scope.row.status === 1 ? 'warning' : 'success'"
            size="small"
            @click="handleStatusChange(scope.row)"
            text
            bg
          >
            <el-icon v-if="scope.row.status === 1"><Lock /></el-icon>
            <el-icon v-else><Check /></el-icon>
            {{ scope.row.status === 1 ? "禁用" : "启用" }}
          </el-button>
          <el-popconfirm
            title="确定要删除此用户吗？"
            @confirm="handleDelete(scope.row)"
          >
            <template #reference>
              <el-button type="danger" size="small" text bg>
                <el-icon><Delete /></el-icon>删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页控件 -->
    <div class="pagination-container">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalItems"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 用户表单对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑用户' : '新增用户'"
      width="500px"
    >
      <el-form
        ref="userFormRef"
        :model="userForm"
        :rules="userFormRules"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="userForm.username"
            placeholder="请输入用户名"
            :disabled="isEdit"
          />
        </el-form-item>
        <el-form-item label="姓名" prop="realName">
          <el-input v-model="userForm.realName" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="userForm.phone" placeholder="请输入电话" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item v-if="!isEdit" label="密码" prop="password">
          <el-input
            v-model="userForm.password"
            type="password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-select
            v-model="userForm.roleId"
            placeholder="请选择角色"
            style="width: 100%"
          >
            <el-option
              v-for="role in roleOptions"
              :key="role.value"
              :label="role.label"
              :value="role.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="userForm.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm" :loading="submitting">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from "vue";
import { ElMessage, ElMessageBox, FormInstance } from "element-plus";
import {
  Edit,
  Delete,
  Search,
  Plus,
  Lock,
  Check,
  School,
} from "@element-plus/icons-vue";
import type { UserInfo } from "@/types/user";

// 定义props
const props = defineProps({
  // 可以从父组件传入预加载的数据
  preloadedData: {
    type: Array,
    default: () => [],
  },
});

// 定义emit
const emit = defineEmits([
  "add",
  "edit",
  "delete",
  "status-change",
  "batch-delete",
  "batch-status-change",
]);

// 表格数据
const tableData = ref<UserInfo[]>([]);
const loading = ref(true);
const selectedRows = ref<UserInfo[]>([]);
const hasSelected = computed(() => selectedRows.value.length > 0);

// 搜索和筛选条件
const searchQuery = ref("");
const statusFilter = ref("");
const roleFilter = ref("");

// 分页相关
const currentPage = ref(1);
const pageSize = ref(10);
const totalItems = ref(0);

// 角色选项
const roleOptions = [
  { value: "1", label: "系统管理员" },
  { value: "2", label: "机构管理员" },
  { value: "3", label: "审核员" },
  { value: "4", label: "财务人员" },
  { value: "5", label: "普通用户" },
];

// 对话框相关
const dialogVisible = ref(false);
const isEdit = ref(false);
const submitting = ref(false);
const userFormRef = ref<FormInstance>();

// 用户表单
const userForm = reactive({
  id: "",
  username: "",
  realName: "",
  email: "",
  phone: "",
  password: "",
  roleId: "",
  status: 1,
});

// 表单验证规则
const userFormRules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" },
  ],
  realName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  email: [
    { required: true, message: "请输入邮箱地址", trigger: "blur" },
    { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
  ],
  phone: [
    { required: true, message: "请输入电话号码", trigger: "blur" },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: "请输入正确的手机号",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" },
  ],
  roleId: [{ required: true, message: "请选择角色", trigger: "change" }],
};

// 根据角色ID获取标签类型
const getRoleTagType = (roleId: string) => {
  const roleMap = {
    "1": "danger",
    "2": "warning",
    "3": "success",
    "4": "info",
    "5": "",
  };
  return roleMap[roleId as keyof typeof roleMap] || "";
};

// 格式化日期
const formatDate = (timestamp: string | number | Date) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

// 过滤后的表格数据
const filteredTableData = computed(() => {
  let result = [...tableData.value];

  // 关键词搜索
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (item) =>
        item.username.toLowerCase().includes(query) ||
        item.realName.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query)
    );
  }

  // 状态筛选
  if (statusFilter.value !== "") {
    result = result.filter(
      (item) => item.status === parseInt(statusFilter.value)
    );
  }

  // 角色筛选
  if (roleFilter.value) {
    result = result.filter((item) => item.roleId === roleFilter.value);
  }

  return result;
});

// 加载数据
const loadData = async () => {
  loading.value = true;
  try {
    // 如果有预加载数据，使用预加载数据
    if (props.preloadedData.length > 0) {
      tableData.value = [...props.preloadedData] as UserInfo[];
      totalItems.value = props.preloadedData.length;
    } else {
      // 这里应该调用实际的API
      // 模拟异步加载
      await new Promise((resolve) => setTimeout(resolve, 500));

      // 模拟数据
      const mockData = Array.from({ length: 100 }, (_, index) => ({
        id: `${index + 1}`,
        username: `user${index + 1}`,
        realName: `用户${index + 1}`,
        email: `user${index + 1}@example.com`,
        phone: `1381234${(index + 1).toString().padStart(4, "0")}`,
        roleId: `${(index % 5) + 1}`,
        roleName: roleOptions[index % 5].label,
        status: index % 3 === 0 ? 0 : 1,
        createTime: new Date(Date.now() - index * 86400000).toISOString(),
      }));

      tableData.value = mockData;
      totalItems.value = mockData.length;
    }
  } catch (error) {
    console.error("加载用户数据失败:", error);
    ElMessage.error("加载用户数据失败");
  } finally {
    loading.value = false;
  }
};

// 表格选择改变
const handleSelectionChange = (selection: UserInfo[]) => {
  selectedRows.value = selection;
};

// 批量删除
const handleBatchDelete = () => {
  if (selectedRows.value.length === 0) return;

  ElMessageBox.confirm(
    `确定要删除选中的 ${selectedRows.value.length} 名用户吗？`,
    "警告",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }
  )
    .then(() => {
      const ids = selectedRows.value.map((row) => row.id);
      // 在实际应用中，这里应该调用API
      emit("batch-delete", ids);

      // 模拟成功
      ElMessage.success("批量删除成功");
      // 从表格数据中移除已删除项
      tableData.value = tableData.value.filter(
        (item) => !ids.includes(item.id)
      );
      // 清空选中
      selectedRows.value = [];
    })
    .catch(() => {
      // 用户取消操作
    });
};

// 批量更改状态
const handleBatchStatusChange = (status: number) => {
  if (selectedRows.value.length === 0) return;

  const statusText = status === 1 ? "启用" : "禁用";
  ElMessageBox.confirm(
    `确定要${statusText}选中的 ${selectedRows.value.length} 名用户吗？`,
    "提示",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }
  )
    .then(() => {
      const ids = selectedRows.value.map((row) => row.id);
      // 在实际应用中，这里应该调用API
      emit("batch-status-change", { ids, status });

      // 模拟成功
      ElMessage.success(`批量${statusText}成功`);
      // 更新表格数据中的状态
      tableData.value = tableData.value.map((item) => {
        if (ids.includes(item.id)) {
          return { ...item, status };
        }
        return item;
      });
      // 清空选中
      selectedRows.value = [];
    })
    .catch(() => {
      // 用户取消操作
    });
};

// 单个用户删除
const handleDelete = (row: UserInfo) => {
  // 在实际应用中，这里应该调用API
  emit("delete", row.id);

  // 模拟成功
  ElMessage.success("删除成功");
  // 从表格数据中移除
  tableData.value = tableData.value.filter((item) => item.id !== row.id);
};

// 更改用户状态
const handleStatusChange = (row: UserInfo) => {
  const newStatus = row.status === 1 ? 0 : 1;
  const statusText = newStatus === 1 ? "启用" : "禁用";

  // 在实际应用中，这里应该调用API
  emit("status-change", { id: row.id, status: newStatus });

  // 模拟成功
  ElMessage.success(`${statusText}成功`);
  // 更新表格数据
  tableData.value = tableData.value.map((item) => {
    if (item.id === row.id) {
      return { ...item, status: newStatus };
    }
    return item;
  });
};

// 编辑用户
const handleEdit = (row: UserInfo) => {
  isEdit.value = true;
  // 复制数据到表单
  Object.assign(userForm, row);
  // 不在编辑中显示密码
  userForm.password = "";
  dialogVisible.value = true;
};

// 新增用户
const handleAddUser = () => {
  isEdit.value = false;
  // 重置表单
  Object.assign(userForm, {
    id: "",
    username: "",
    realName: "",
    email: "",
    phone: "",
    password: "",
    roleId: "",
    status: 1,
  });
  dialogVisible.value = true;
};

// 提交表单
const submitForm = () => {
  if (!userFormRef.value) return;

  userFormRef.value.validate(async (valid) => {
    if (!valid) return;

    submitting.value = true;
    try {
      // 在实际应用中，这里应该调用API
      if (isEdit.value) {
        // 编辑用户
        emit("edit", { ...userForm });

        // 模拟成功，更新表格数据
        tableData.value = tableData.value.map((item) => {
          if (item.id === userForm.id) {
            return {
              ...item,
              ...userForm,
              roleName:
                roleOptions.find((r) => r.value === userForm.roleId)?.label ||
                "",
            };
          }
          return item;
        });

        ElMessage.success("编辑成功");
      } else {
        // 新增用户
        const newUser = {
          ...userForm,
          id: String(tableData.value.length + 1),
          createTime: new Date().toISOString(),
          roleName:
            roleOptions.find((r) => r.value === userForm.roleId)?.label || "",
        };

        emit("add", newUser);

        // 模拟成功，添加到表格数据
        tableData.value.unshift(newUser);
        totalItems.value++;

        ElMessage.success("添加成功");
      }

      dialogVisible.value = false;
    } catch (error) {
      console.error("提交用户表单失败:", error);
      ElMessage.error(isEdit.value ? "编辑失败" : "添加失败");
    } finally {
      submitting.value = false;
    }
  });
};

// 分页大小变化
const handleSizeChange = (val: number) => {
  pageSize.value = val;
  currentPage.value = 1;
  // 在实际应用中，这里应该重新加载数据
};

// 当前页变化
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  // 在实际应用中，这里应该重新加载数据
};

// 组件挂载时加载数据
onMounted(() => {
  loadData();
});
</script>

<style scoped lang="scss">
.user-table-container {
  padding: 0;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
}

.table-toolbar {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  border-bottom: 1px solid #ebeef5;

  .left-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .right-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;

    .search-input {
      width: 220px;
    }

    .filter-select {
      width: 140px;
    }
  }
}

.pagination-container {
  padding: 16px;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #ebeef5;
}

@media (max-width: 768px) {
  .table-toolbar {
    flex-direction: column;
    align-items: stretch;

    .left-actions,
    .right-actions {
      width: 100%;
      justify-content: space-between;
    }
  }

  .pagination-container {
    justify-content: center;
  }
}
</style>
