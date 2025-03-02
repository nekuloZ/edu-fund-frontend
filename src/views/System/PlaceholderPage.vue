<template>
  <div class="placeholder-page">
    <el-empty :description="pageName + ' 功能正在开发中...'" />
  </div>
</template>

<script setup lang="ts">
defineProps({
  pageName: {
    type: String,
    default: '页面'
  }
});
</script>

<style scoped>
.placeholder-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
}
</style> 