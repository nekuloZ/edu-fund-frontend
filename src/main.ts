import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// 引入中文语言包
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import router from "./router/index"; // 引入路由
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);
// 全局注册 Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(router).use(ElementPlus,{locale: zhCn}).mount("#app");


