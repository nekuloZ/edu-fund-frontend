import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000", // 后端地址
  headers: {
    "Content-Type": "application/json",
  },
});

// 注释掉认证相关的拦截器
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//       window.location.href = "/";
//     }
//     return Promise.reject(error);
//   }
// );

export default {
  async getAdminPage() {
    try {
      return await apiClient.get("/admin");
    } catch (error) {
      console.error("Error fetching admin page:", error);
      throw error; // 抛出错误以便在页面中处理
    }
  },
  async getHello() {
    try {
      return await apiClient.get("/hello");
    } catch (error) {
      console.error("Error fetching hello page:", error);
      throw error; // 抛出错误以便在页面中处理
    }
  },
};
