<template>
  <el-button
    :type="type"
    :size="size"
    :icon="icon"
    :disabled="disabled"
    :plain="plain"
    :round="round"
    :circle="circle"
    @click="handleClick"
  >
    <slot>{{ text }}</slot>
  </el-button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  text: {
    type: String,
    default: '按钮',
  },
  type: {
    type: String,
    default: 'primary', // 可选: primary, success, warning, danger, info, text
  },
  size: {
    type: String,
    default: 'default', // 可选: large, default, small
  },
  icon: {
    type: String,
    default: '', // 可传入 Element Plus 图标名称，如 'Edit', 'Delete'
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  plain: {
    type: Boolean,
    default: false, // 是否为朴素按钮
  },
  round: {
    type: Boolean,
    default: false, // 是否为圆角按钮
  },
  circle: {
    type: Boolean,
    default: false, // 是否为圆形按钮
  },
});

const emit = defineEmits(['click']);

const handleClick = () => {
  emit('click');
};
</script>
