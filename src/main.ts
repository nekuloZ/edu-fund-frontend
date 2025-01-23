import { createApp } from "vue";
import App from "./App.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseButton from "@/components/BaseButton.vue";
import BasePagination from "@/components/BasePagination.vue";
import BaseDialog from "@/components/BaseDialog.vue";
import BaseTable from "@/components/BaseTable.vue";
import BasePopover from "@/components/BasePopover.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/index.css";
import '@/styles/global.scss';  // 引入全局样式
import '@/styles/element-custom.scss';  // 引入Element Plus自定义样式

// 引入中文语言包
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import router from "./router/index"; // 引入路由
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);
// 全局注册 Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.component("BaseInput", BaseInput);
app.component("BaseButton", BaseButton);
app.component("BasePagination", BasePagination);
app.component("BaseDialog", BaseDialog);
app.component("BaseTable", BaseTable);
app.component("BasePopover", BasePopover);
app.use(router).use(ElementPlus, { locale: zhCn }).mount("#app");






