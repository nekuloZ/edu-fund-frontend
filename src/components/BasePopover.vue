<template>
  <el-popover
    ref="popoverRef"
    placement="bottom"
    :width="width"
    trigger="click"
    popper-class="base-popover"
  >
    <div class="popover-content">
      <!-- 搜索功能 -->
      <el-input
        v-if="enableSearch"
        v-model="inputValue"
        :placeholder="inputPlaceholder"
        clearable
        @input="handleInput"
      />

      <!-- 筛选功能 -->
      <el-select
        v-if="enableFilter && options.length > 0"
        v-model="selectedOption"
        :placeholder="selectPlaceholder"
        clearable
        @change="handleSelectChange"
      >
        <el-option
          v-for="option in options"
          :key="option.value"
          :label="option.text"
          :value="option.value"
        />
      </el-select>

      <!-- 确认按钮 -->
      <el-button v-if="showButton" type="primary" @click="onConfirm">
        {{ buttonText }}
      </el-button>
    </div>

    <template #reference>
      <slot name="reference">
        <el-button type="text">
          {{ label }} <el-icon><arrow-down /></el-icon>
        </el-button>
      </slot>
    </template>
  </el-popover>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from "vue";
import { ArrowDown } from "@element-plus/icons-vue";

const props = defineProps({
  // 通用配置
  label: { type: String, default: "操作" },
  width: { type: Number, default: 250 },
  showButton: { type: Boolean, default: true },
  buttonText: { type: String, default: "确认" },

  // 搜索功能配置
  enableSearch: { type: Boolean, default: false },
  inputPlaceholder: { type: String, default: "请输入搜索内容" },

  // 筛选功能配置
  enableFilter: { type: Boolean, default: false },
  selectPlaceholder: { type: String, default: "请选择" },
  options: {
    type: Array as () => { text: string; value: string }[],
    default: () => [],
  },
});

const emits = defineEmits(["update:input", "update:select", "confirm"]);

const inputValue = ref<string>(""); // Explicitly typed as string
const selectedOption = ref<string | null>(null); // Allowing null initially

// 处理输入搜索
const handleInput = () => {
  emits("update:input", inputValue.value);
};

// 处理筛选选择
const handleSelectChange = () => {
  emits("update:select", selectedOption.value);
};

// 处理确认操作
const onConfirm = () => {
  emits("confirm", {
    inputValue: inputValue.value,
    selectedOption: selectedOption.value,
  });
};
</script>

<style scoped>
.popover-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.base-popover {
  padding: 10px;
}
</style>
