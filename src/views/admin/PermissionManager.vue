<template>
  <el-card style="margin-top: 20px; height: 90%">
    <div class="permission-manager">
      <!-- 搜索框 -->
      <el-row class="search-bar">
        <el-input
          v-model="searchQuery"
          placeholder="输入权限名称或描述"
          class="search-input"
          clearable
        />
        <el-button type="primary" @click="searchPermissions">搜索</el-button>
      </el-row>

      <!-- 权限列表 -->
      <BaseTable
        :tableData="permissions"
        :columns="columns"
        :size="'large'"
        :fit="true"
      />

      <!-- 分页 -->
      <BasePagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="totalPermissions"
        layout="total, sizes, prev, pager, next, jumper"
        @pagination-change="handlePaginationChange"
      />
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus";

interface Permission {
  id: number;
  name: string;
  code: string;
  description: string;
}

interface TableColumn {
  prop: string;
  label: string;
  width?: string;
}

// 响应式数据
const permissions = ref<Permission[]>([]);
const currentPage = ref(1);
const pageSize = ref(10);
const totalPermissions = ref(0);
const searchQuery = ref("");

// 表格列配置
const columns: TableColumn[] = [
  { prop: "id", label: "ID", width: "80px" },
  { prop: "name", label: "权限名称" },
  { prop: "code", label: "权限代码" },
  { prop: "description", label: "权限描述" },
];

// 获取权限列表
const fetchPermissions = async () => {
  try {
    const response = await axios.get("http://localhost:3000/permissions", {
      params: {
        page: currentPage.value,
        pageSize: pageSize.value,
        search: searchQuery.value || undefined, // 添加搜索参数
      },
    });
    console.log(response.data);
    if (response.data?.permissions) {
      permissions.value = response.data.permissions;
      totalPermissions.value = response.data.total;
    } else {
      ElMessage.error("权限数据格式错误");
    }
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
  fetchPermissions();
};
// 搜索
const searchPermissions = async () => {
  currentPage.value = 1; // 重置到第一页
  await fetchPermissions();
};

// 初始化数据
onMounted(() => {
  fetchPermissions();
});
</script>

<style lang="scss" scoped>
.permission-manager {
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
    margin-bottom: 20px;
  }

  .el-pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>
