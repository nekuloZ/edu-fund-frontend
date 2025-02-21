// src/store/user.ts
import { defineStore } from "pinia";
import { LoginResponse, LoginDto, User } from "@/types/api"; // 从类型定义中引入相关类型
import {
  loginApi,
  registerApi,
  fetchUserProfileApi,
  updateUserProfileApi,
} from "@/api/auth";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: "" as string,
    userInfo: null as User | null,
    roles: [] as string[],
    permissions: [] as string[],
    isLoading: false as boolean,
    error: "" as string,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.roles.includes("admin"),
  },
  actions: {
    async login(payload: LoginDto) {
      this.isLoading = true;
      try {
        const res: LoginResponse = await loginApi(payload);
        this.token = res.access_token;
        // 此处可调用 fetchUserProfile() 来加载用户信息和权限
        await this.fetchUserProfile();
      } catch (error: any) {
        this.error = error.message || "登录失败";
      } finally {
        this.isLoading = false;
      }
    },
    async register(payload: any) {
      // 调用注册 API，注册成功后可以选择自动登录或跳转至登录页面
    },
    async fetchUserProfile() {
      try {
        const profile: User = await fetchUserProfileApi();
        this.userInfo = profile;
        // 假设 profile 中包含角色与权限信息
        this.roles = profile.roles || [];
        this.permissions = profile.permissions || [];
      } catch (error: any) {
        this.error = error.message || "加载用户信息失败";
      }
    },
    async updateProfile(updatedData: Partial<User>) {
      try {
        const updatedProfile: User = await updateUserProfileApi(updatedData);
        this.userInfo = updatedProfile;
      } catch (error: any) {
        this.error = error.message || "更新信息失败";
      }
    },
    logout() {
      this.token = "";
      this.userInfo = null;
      this.roles = [];
      this.permissions = [];
    },
  },
});
