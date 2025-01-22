<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    :width="width"
    :close-on-click-modal="closeOnClickModal"
    @close="handleClose"
  >
    <slot></slot>
    <template #footer>
      <slot name="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
      </slot>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "提示",
  },
  width: {
    type: String,
    default: "50%",
  },
  visible: {
    type: Boolean,
    default: false,
  },
  closeOnClickModal: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:visible", "confirm"]);

const dialogVisible = ref(props.visible);

const handleClose = () => {
  emit("update:visible", false);
};

const confirm = () => {
  emit("confirm");
  dialogVisible.value = false;
};
</script>
