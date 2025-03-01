import { defineStore } from "pinia";
import { LoginDto, LoginResponse, User } from "@/types/api";
import {
  loginApi,
  registerApi,
  fetchUserProfileApi,
  updateUserProfileApi,
} from "@/api/auth";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: "" as string, // 登录成功返回的 JWT token
    userInfo: null as User | null, // 当前用户详细信息
    roles: [] as string[], // 当前用户角色数组
    permissions: [] as string[], // 当前用户权限数组
    loading: false as boolean, // 异步操作加载状态
    error: "" as string, // 全局错误信息
  }),
  getters: {
    // 判断用户是否已登录
    isAuthenticated(state): boolean {
      return !!state.token;
    },
    // 判断用户是否具有管理员权限
    isAdmin(state): boolean {
      return state.roles.includes("admin");
    },
  },
  actions: {
    // 登录操作：提交登录数据，保存 token 并加载用户信息
    async login(payload: LoginDto) {
      this.loading = true;
      try {
        const res: LoginResponse = await loginApi(payload);
        this.token = res.access_token;
        // 登录成功后，加载用户详细信息，包括角色和权限
        await this.fetchUserProfile();
      } catch (error: any) {
        this.error = error.message || "登录失败";
      } finally {
        this.loading = false;
      }
    },
    // 注册操作：提交注册数据，注册成功后可自动登录或跳转至登录页面
    async register(payload: any) {
      this.loading = true;
      try {
        await registerApi(payload);
        // 注册成功后，可选择自动登录或提示用户前往登录页面
      } catch (error: any) {
        this.error = error.message || "注册失败";
      } finally {
        this.loading = false;
      }
    },
    // 加载当前用户信息
    async fetchUserProfile() {
      try {
        const profile: User = await fetchUserProfileApi();
        this.userInfo = profile;
        // 假设接口返回的用户信息包含角色与权限字段
        this.roles = profile.roles || [];
        this.permissions = profile.permissions || [];
      } catch (error: any) {
        this.error = error.message || "加载用户信息失败";
      }
    },
    // 更新用户信息
    async updateProfile(updatedData: Partial<User>) {
      try {
        const updatedProfile: User = await updateUserProfileApi(updatedData);
        this.userInfo = updatedProfile;
      } catch (error: any) {
        this.error = error.message || "更新信息失败";
      }
    },
    // 注销操作：清空所有用户状态
    logout() {
      this.token = "";
      this.userInfo = null;
      this.roles = [];
      this.permissions = [];
    },
  },
});
