<template>
  <el-table
    :data="tableData"
    :max-height="maxHeight"
    :stripe="stripe"
    :border="border"
    :size="size"
    highlight-current-row
    table-layout="fixed"
    :header-cell-style="{
      background: '#E6E8EB',
      color: '#303133',
      fontWeight: 'bold',
      fontSize: 'medium',
    }"
  >
    <el-table-column
      v-for="column in columns"
      :key="column.prop"
      :prop="column.prop"
      :label="column.label"
      :width="column.width"
      :align="column.align || 'left'"
      :sortable="column.sortable || false"
      :filters="column.filters || null"
      :filter-method="column.filterMethod || null"
    >
      <template v-if="column.slot" #default="scope">
        <slot :name="column.slot" :row="scope.row"></slot>
      </template>
      <template v-else #default="scope">
        {{ scope.row[column.prop] || column.defaultText || "N/A" }}
      </template>
    </el-table-column>

    <!-- 操作列 -->
    <el-table-column
      v-if="actions.length"
      label="操作"
      align="center"
      :width="actionColumnWidth"
    >
      <template #default="scope">
        <el-button
          v-for="action in actions"
          :key="action.label"
          :type="action.type"
          :size="action.size || 'small'"
          :circle="action.circle"
          style="margin-right: 8px"
          @click="action.handler(scope.row)"
        >
          <el-icon>
            <component :is="action.icon" />
          </el-icon>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import type { PropType } from "vue";

interface TableAction {
  columns: string;
  label: string;
  type: string;
  icon?: string;
  circle?: boolean;
  size?: string;
  handler: (row: any) => void;
}

interface TableColumn {
  prop: string;
  label: string;
  width?: string;
  align?: string;
  slot?: string;
  defaultText?: string;
  sortable?: boolean; // 是否可排序
  filters?: Array<{ text: string; value: any }>; // 筛选项
  filterMethod?: (value: any, row: any, column: any) => boolean; // 自定义筛选方法
}

const props = defineProps({
  tableData: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Array as PropType<TableColumn[]>,
    required: true,
    default: () => [],
  },
  actions: {
    type: Array as PropType<TableAction[]>,
    default: () => [],
  },
  stripe: {
    type: Boolean,
    default: false,
  },
  border: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: "default", // 可选: 'large', 'default', 'small'
  },
  actionColumnWidth: {
    type: String,
    default: "125",
  },
  sortable: {
    type: Boolean,
    default: false,
  },
  filters: {
    type: Array,
    default: () => [],
  },
  filterMethod: {
    type: Function,
    default: null,
  },
  maxHeight: {
    type: String,
    default: "60vh", // 你可以根据需要设置默认值
  },
});
const emit = defineEmits(["action"]);
</script>
