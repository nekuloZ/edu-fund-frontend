import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { jwtDecode } from "jwt-decode";
import store from "@/store/index";
import AdminLayout from "../layouts/CommonLayout.vue";
import BoardView from "../views/admin/BoardView.vue";
import FundManager from "../views/admin/FundManager.vue";
import UserManager from "../views/admin/UserManager.vue";
import Index from "../views/user/index.vue";
import Login from "../views/login.vue";
import Forbidden from "../views/error/403.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Register from "../views/Register.vue";

// 定义路由
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    component: Index,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresAuth: false }, // 显式设置不需要认证
  },
  {
    path: "/admin",
    component: AdminLayout,
    children: [
      { path: "", name: "BoardView", component: BoardView },
      { path: "funds", name: "FundManager", component: FundManager },
      { path: "users", name: "UserManager", component: UserManager },
    ],
    meta: { requiresAuth: true, roles: ["Admin"] }, // 修改为 roles 数组
  },
  {
    path: "/403",
    name: "Forbidden",
    component: Forbidden, // 加载 403 页面
    meta: { requiresAuth: false },
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: { requiresAuth: false },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { requiresAuth: false },
  },
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由守卫
;

export default router;
