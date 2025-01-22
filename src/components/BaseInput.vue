<template>
  <el-input
    v-model="inputValue"
    :placeholder="placeholder"
    :type="type"
    :clearable="clearable"
  ></el-input>
</template>

<script setup>
import { defineProps, ref } from 'vue';

defineProps({
  placeholder: {
    type: String,
    default: '请输入内容',
  },
  type: {
    type: String,
    default: 'text',
  },
  clearable: {
    type: Boolean,
    default: true,
  },
});

const inputValue = ref('');
</script>
