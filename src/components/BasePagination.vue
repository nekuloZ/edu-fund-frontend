<template>
  <el-pagination
    :current-page="currentPage"
    :page-size="pageSize"
    :total="total"
    :page-sizes="pageSizes"
    layout="total, sizes, prev, pager, next, jumper"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  total: {
    type: Number,
    required: true,
    default: 0,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  pageSizes: {
    type: Array,
    default: () => [10, 20, 50, 100],
  },
  currentPage: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits([
  "update:currentPage",
  "update:pageSize",
  "pagination-change",
]);

function handleCurrentChange(page: number) {
  emit("update:currentPage", page);
  emit("pagination-change", {
    currentPage: page,
    pageSize: props.pageSize,
  });
}

function handleSizeChange(size: number) {
  emit("update:pageSize", size);
  emit("pagination-change", {
    currentPage: props.currentPage,
    pageSize: size,
  });
}
</script>
