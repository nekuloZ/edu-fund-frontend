<template>
  <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :total="total"
    :page-sizes="pageSizes"
    layout="total, sizes, prev, pager, next, jumper"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
  />
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';

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
});

const emit = defineEmits(['update:currentPage', 'update:pageSize', 'pagination-change']);

const currentPage = ref(1);
const pageSize = ref(props.pageSize);

const handleCurrentChange = (page) => {
  emit('update:currentPage', page);
  emit('pagination-change', { currentPage: page, pageSize: pageSize.value });
};

const handleSizeChange = (size) => {
  emit('update:pageSize', size);
  emit('pagination-change', { currentPage: currentPage.value, pageSize: size });
};
</script>
