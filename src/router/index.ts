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
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由守卫
router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem("token");

  // 无 token 且需要认证
  if (to.meta.requiresAuth && !token) {
    return next("/login");
  }
  if (token) {
    try {
      const payload = jwtDecode(token);
      // 检查 Token 是否过期
      if (Date.now() >= payload.exp * 1000) {
        localStorage.removeItem("token");
        return next("/login");
      }
      // 检查角色权限
      if (to.meta.roles && !to.meta.roles.includes(payload.roles)) {
        return next("/403"); // 跳转到 403 页面
      }
      // 加载动态权限
      if (!store.state.permissions) {
        await store.dispatch("fetchPermissions");
      }
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem("token");
      return next("/login"); // 清除无效 token 并跳转登录
    }
  }

  next(); // 验证通过，进入目标页面
});

export default router;
