// src/main.ts
import { createApp } from "vue";
import App from "./App.vue";

// 插件导入
import router from "./router";
import pinia from "./store";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// 全局样式
import "@/styles/global.scss"; // 全局样式
import "@/styles/element-custom.scss"; // Element Plus 自定义样式
import "element-plus/dist/index.css"; // Element Plus 样式
import "element-plus/theme-chalk/index.css";

// 全局组件导入
import BasePagination from "@/components/BasePagination.vue";
import BaseDialog from "@/components/BaseDialog.vue";
import BaseTable from "@/components/BaseTable.vue";
import BasePopover from "@/components/BasePopover.vue";

// 创建 Vue 应用实例
const app = createApp(App);

// 注册 Pinia 状态管理
app.use(pinia);

// 注册路由
app.use(router);

// 注册 Element Plus 组件库，设置中文语言包
app.use(ElementPlus, { locale: zhCn });

// 全局注册 Element Plus 图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 全局注册自定义基础组件
app.component("BasePagination", BasePagination);
app.component("BaseDialog", BaseDialog);
app.component("BaseTable", BaseTable);
app.component("BasePopover", BasePopover);

// 挂载应用到 #app
app.mount("#app");

