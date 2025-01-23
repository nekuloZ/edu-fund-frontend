<template>
  <el-pagination
    :current-page="currentPage"
    :page-size="pageSize"
    :total="total"
    :page-sizes="pageSizes"
    layout="total, sizes, prev, pager, next, jumper"
    @current-change="emitCurrentChange"
    @size-change="emitSizeChange"
  />
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

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

function emitCurrentChange(page) {
  emit("update:currentPage", page);
  emit("pagination-change", {
    currentPage: page,
    pageSize: props.pageSize,
  });
}

function emitSizeChange(size) {
  emit("update:pageSize", size);
  emit("pagination-change", {
    currentPage: props.currentPage,
    pageSize: size,
  });
}
</script>
