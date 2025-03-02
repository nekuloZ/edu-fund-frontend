// // src/router/index.ts
// import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// // 定义所有路由
// // 采用 Vue Router 4 的懒加载方式
// // 并在路由中添加了 meta 字段用于权限验证
// const routes: Array<RouteRecordRaw> = [
//   // 默认重定向到仪表盘
//   {
//     path: '/',
//     redirect: '/dashboard',
//     meta: { requiresAuth: true }
//   },
//   // 认证模块：登录、注册页面
//   {
//     path: '/auth',
//     name: 'Auth',
//     component: () => import('@/views/Auth/AuthLayout.vue'), // 可创建一个布局组件，内部含有 <router-view>
//     children: [
//       {
//         path: 'login',
//         name: 'Login',
//         component: () => import('@/views/Auth/Login.vue')
//       },
//       {
//         path: 'register',
//         name: 'Register',
//         component: () => import('@/views/Auth/Register.vue')
//       }
//     ]
//   },
//   // 用户管理模块
//   {
//     path: '/user',
//     name: 'User',
//     meta: { requiresAuth: true },
//     component: () => import('@/views/User/UserLayout.vue'),
//     children: [
//       {
//         path: 'profile',
//         name: 'UserProfile',
//         component: () => import('@/views/User/UserProfile.vue')
//       },
//       {
//         path: 'management',
//         name: 'UserManagement',
//         component: () => import('@/views/User/UserManagement.vue')
//       }
//     ]
//   },
//   // 基金机构管理模块
//   {
//     path: '/institution',
//     name: 'Institution',
//     meta: { requiresAuth: true },
//     component: () => import('@/views/Institution/InstitutionLayout.vue'),
//     children: [
//       {
//         path: 'list',
//         name: 'InstitutionList',
//         component: () => import('@/views/Institution/InstitutionList.vue')
//       },
//       {
//         path: 'detail/:id',
//         name: 'InstitutionDetail',
//         component: () => import('@/views/Institution/InstitutionDetail.vue'),
//         props: true
//       }
//     ]
//   },
//   // 项目管理模块
//   {
//     path: '/project',
//     name: 'Project',
//     meta: { requiresAuth: true },
//     component: () => import('@/views/Project/ProjectLayout.vue'),
//     children: [
//       {
//         path: 'list',
//         name: 'ProjectList',
//         component: () => import('@/views/Project/ProjectList.vue')
//       },
//       {
//         path: 'detail/:id',
//         name: 'ProjectDetail',
//         component: () => import('@/views/Project/ProjectDetail.vue'),
//         props: true
//       }
//     ]
//   },
//   // 基金项目申请管理模块
//   {
//     path: '/application',
//     name: 'Application',
//     meta: { requiresAuth: true },
//     component: () => import('@/views/Application/ApplicationLayout.vue'),
//     children: [
//       {
//         path: 'form',
//         name: 'ApplicationForm',
//         component: () => import('@/views/Application/ApplicationForm.vue')
//       },
//       {
//         path: 'list',
//         name: 'ApplicationList',
//         component: () => import('@/views/Application/ApplicationList.vue')
//       },
//       {
//         path: 'detail/:id',
//         name: 'ApplicationDetail',
//         component: () => import('@/views/Application/ApplicationDetail.vue'),
//         props: true
//       }
//     ]
//   },
//   // 审核与审批模块
//   {
//     path: '/review',
//     name: 'Review',
//     meta: { requiresAuth: true },
//     component: () => import('@/views/Review/ReviewLayout.vue'),
//     children: [
//       {
//         path: 'list',
//         name: 'ReviewList',
//         component: () => import('@/views/Review/ReviewList.vue')
//       },
//       {
//         path: 'detail/:id',
//         name: 'ReviewDetail',
//         component: () => import('@/views/Review/ReviewDetail.vue'),
//         props: true
//       }
//     ]
//   },
//   // 拨款与财务管理模块
//   {
//     path: '/disbursement',
//     name: 'Disbursement',
//     meta: { requiresAuth: true },
//     component: () => import('@/views/Disbursement/DisbursementLayout.vue'),
//     children: [
//       {
//         path: 'list',
//         name: 'DisbursementList',
//         component: () => import('@/views/Disbursement/DisbursementList.vue')
//       },
//       {
//         path: 'detail/:id',
//         name: 'DisbursementDetail',
//         component: () => import('@/views/Disbursement/DisbursementDetail.vue'),
//         props: true
//       }
//     ]
//   },
//   // 数据统计与报告模块
//   {
//     path: '/dashboard',
//     name: 'Dashboard',
//     meta: { requiresAuth: true },
//     component: () => import('@/views/Dashboard/DataStatistics.vue')
//   },
//   {
//     path: '/report',
//     name: 'Report',
//     meta: { requiresAuth: true },
//     component: () => import('@/views/Dashboard/Report.vue')
//   },
//   // 通知与消息模块
//   {
//     path: '/notification',
//     name: 'Notification',
//     meta: { requiresAuth: true },
//     component: () => import('@/views/Notification/NotificationLayout.vue'),
//     children: [
//       {
//         path: 'list',
//         name: 'NotificationList',
//         component: () => import('@/views/Notification/NotificationList.vue')
//       },
//       {
//         path: 'detail/:id',
//         name: 'NotificationDetail',
//         component: () => import('@/views/Notification/NotificationPage.vue'),
//         props: true
//       }
//     ]
//   },
//   // 系统管理（后台管理）模块
//   {
//     path: '/system',
//     name: 'System',
//     meta: { requiresAuth: true, isAdmin: true },
//     component: () => import('@/views/System/SystemLayout.vue'),
//     children: [
//       {
//         path: 'role-management',
//         name: 'RoleManagement',
//         component: () => import('@/views/System/RoleManagement.vue')
//       },
//       {
//         path: 'system-settings',
//         name: 'SystemSettings',
//         component: () => import('@/views/System/SystemSettings.vue')
//       }
//     ]
//   },
//   // 404 Not Found 页面
//   {
//     path: '/:pathMatch(.*)*',
//     name: 'NotFound',
//     component: () => import('@/views/NotFound.vue')
//   }
// ]

// const router = createRouter({
//   history: createWebHistory(),
//   routes
// })

// // 全局路由守卫示例：检查需要认证的页面
// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('token') // 假设 token 存储在 localStorage
//   if (to.meta.requiresAuth && !token) {
//     next({ name: 'Login' })
//   } else {
//     next()
//   }
// })

// export default router

// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/dev/login",
    name: "Login",
    component: () => import("@/views/Auth/Enter.vue"),
  },
  {
    path: "/dev/register",
    name: "Register",
    redirect: "/dev/login?form=register",
  },
  {
    path: "/dev/system",
    name: "System",
    component: () => import("@/views/System/CommonLayout.vue"),
    redirect: "/dev/system/dashboard",
    children: [
      {
        path: "users",
        name: "UserManagement",
        component: () => import("@/views/System/UserManagement.vue"),
      },
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/System/Dashboard.vue"),
      },
      // {
      //   path: "institutions",
      //   name: "InstitutionManagement",
      //   component: () => import("@/views/System/InstitutionManagement.vue"),
      // },
      // {
      //   path: "projects",
      //   name: "ProjectManagement",
      //   component: () => import("@/views/System/ProjectManagement.vue"),
      // },
      // {
      //   path: "review",
      //   name: "ReviewManagement",
      //   component: () => import("@/views/System/ReviewManagement.vue"),
      // },
      // {
      //   path: "finance",
      //   name: "FinanceManagement",
      //   component: () => import("@/views/System/FinanceManagement.vue"),
      // },
      // {
      //   path: "reports",
      //   name: "ReportManagement",
      //   component: () => import("@/views/System/ReportManagement.vue"),
      // },
      // {
      //   path: "settings",
      //   name: "SystemSettings",
      //   component: () => import("@/views/System/SystemSettings.vue"),
      // },
    ],
  },
  // {
  //   path: '/dev/auth/register',
  //   name: 'DevRegister',
  //   component: () => import('@/views/Auth/Register.vue')
  // },
  // {
  //   path: '/dev/user/profile',
  //   name: 'DevUserProfile',
  //   component: () => import('@/views/User/UserProfile.vue')
  // },
  // {
  //   path: '/dev/user/management',
  //   name: 'DevUserManagement',
  //   component: () => import('@/views/User/UserManagement.vue')
  // },
  // // 基金机构与项目管理模块
  // {
  //   path: '/dev/institution/list',
  //   name: 'DevInstitutionList',
  //   component: () => import('@/views/Institution/InstitutionList.vue')
  // },
  // {
  //   path: '/dev/institution/detail/:id',
  //   name: 'DevInstitutionDetail',
  //   component: () => import('@/views/Institution/InstitutionDetail.vue'),
  //   props: true
  // },
  // {
  //   path: '/dev/project/list',
  //   name: 'DevProjectList',
  //   component: () => import('@/views/Project/ProjectList.vue')
  // },
  // {
  //   path: '/dev/project/detail/:id',
  //   name: 'DevProjectDetail',
  //   component: () => import('@/views/Project/ProjectDetail.vue'),
  //   props: true
  // },
  // // 基金项目申请管理模块
  // {
  //   path: '/dev/application/form',
  //   name: 'DevApplicationForm',
  //   component: () => import('@/views/Application/ApplicationForm.vue')
  // },
  // {
  //   path: '/dev/application/list',
  //   name: 'DevApplicationList',
  //   component: () => import('@/views/Application/ApplicationList.vue')
  // },
  // {
  //   path: '/dev/application/detail/:id',
  //   name: 'DevApplicationDetail',
  //   component: () => import('@/views/Application/ApplicationDetail.vue'),
  //   props: true
  // },
  // // 审核与审批模块
  // {
  //   path: '/dev/review/list',
  //   name: 'DevReviewList',
  //   component: () => import('@/views/Review/ReviewList.vue')
  // },
  // {
  //   path: '/dev/review/detail/:id',
  //   name: 'DevReviewDetail',
  //   component: () => import('@/views/Review/ReviewDetail.vue'),
  //   props: true
  // },
  // // 拨款与财务管理模块
  // {
  //   path: '/dev/disbursement/list',
  //   name: 'DevDisbursementList',
  //   component: () => import('@/views/Disbursement/DisbursementList.vue')
  // },
  // {
  //   path: '/dev/disbursement/detail/:id',
  //   name: 'DevDisbursementDetail',
  //   component: () => import('@/views/Disbursement/DisbursementDetail.vue'),
  //   props: true
  // },
  // // 数据统计与报表模块
  // {
  //   path: '/dev/dashboard',
  //   name: 'DevDashboard',
  //   component: () => import('@/views/Dashboard/DataStatistics.vue')
  // },
  // {
  //   path: '/dev/report',
  //   name: 'DevReport',
  //   component: () => import('@/views/Dashboard/Report.vue')
  // },
  // // 通知与消息模块
  // {
  //   path: '/dev/notification/list',
  //   name: 'DevNotificationList',
  //   component: () => import('@/views/Notification/NotificationList.vue')
  // },
  // {
  //   path: '/dev/notification/detail/:id',
  //   name: 'DevNotificationDetail',
  //   component: () => import('@/views/Notification/NotificationPage.vue'),
  //   props: true
  // },
  // // 系统管理模块
  // {
  //   path: '/dev/system/role-management',
  //   name: 'DevRoleManagement',
  //   component: () => import('@/views/System/RoleManagement.vue')
  // },
  // {
  //   path: '/dev/system/system-settings',
  //   name: 'DevSystemSettings',
  //   component: () => import('@/views/System/SystemSettings.vue')
  // },
  // // 默认跳转到登录页
  // {
  //   path: '/:pathMatch(.*)*',
  //   redirect: '/dev/auth/login'
  // }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
