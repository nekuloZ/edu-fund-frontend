/**
 * 数据模型/类型定义文档
 * 乡村教育基金管理系统
 *
 * 此文件包含了数据库表对应的接口定义以及常用 API 请求/响应 DTO 类型。
 */

/* ================================
   数据库表对应的模型定义
   ================================ */

/** 附件信息，与表 application_attachment 对应 */
export interface ApplicationAttachment {
  attachment_id: number; // 附件ID，主键
  application_id: number; // 申请ID，外键关联 fund_application.application_id
  file_path: string; // 文件存储路径或 URL
  file_type?: string; // 文件类型，如 "pdf", "jpg"，可选
  upload_date: string; // 上传时间（ISO 格式字符串）
}

/** 拨款记录，与表 disbursement_record 对应 */
export interface DisbursementRecord {
  record_id: number; // 拨款记录ID，主键
  application_id: number; // 申请ID，外键关联 fund_application.application_id
  disbursement_amount: number; // 拨款金额
  disbursement_date: string; // 拨款时间（ISO 格式字符串）
  operator_id: number; // 执行拨款的管理员或财务人员ID，外键关联 user.user_id
  status: "pending" | "confirmed" | "failed"; // 拨款状态
  note?: string; // 备注，可选
}

/** 基金项目类型，与表 fund_project_type 对应 */
export interface FundProjectType {
  project_type_id: number; // 项目类型ID，主键
  project_type_name: string; // 项目类型名称，如 "public_pool", "scholarship", "grant"
  description?: string; // 描述，可选
}

/** 申请状态，与表 application_status 对应 */
export interface ApplicationStatus {
  status_id: number; // 状态ID，主键
  status_name: string; // 申请状态名称，如 "submitted", "pending_review", "approved", "rejected", "needs_revision"
  description?: string; // 状态描述，可选
}

/** 基金项目申请，与表 fund_application 对应 */
export interface FundApplication {
  application_id: number; // 申请ID，主键
  applicant_id: number; // 提交申请的用户ID，外键关联 user.user_id
  institution_id?: number; // 所属基金机构ID（若由机构提交），外键关联 fund_institution.institution_id，允许为空
  project_id: number; // 关联的基金项目ID
  project_type_id: number; // 关联的项目类型ID，外键关联 fund_project_type.project_type_id
  status_id: number; // 申请状态ID，外键关联 application_status.status_id
  title: string; // 项目标题
  description?: string; // 详细描述，可选
  amount_requested: number; // 申请金额
  use_plan?: string; // 资金使用计划，可选
  submission_date: string; // 提交时间（ISO 格式字符串）
  updated_date: string; // 最后修改时间（ISO 格式字符串）
}

/** 资金捐赠，与表 fund_donation 对应 */
export interface FundDonation {
  donation_id: number; // 捐赠ID，主键
  donor_name: string; // 捐赠人名称
  donation_amount: number; // 捐赠金额
  donation_date: string; // 捐赠日期（ISO 格式字符串）
  fund_institution_id: number; // 捐赠所属基金机构ID，外键关联 fund_institution.institution_id
}

/** 资金动态日志，与表 fund_dynamic_log 对应 */
export interface FundDynamicLog {
  log_id: number; // 资金动态日志ID，主键
  log_type: string; // 日志类型，如 "disbursement", "donation" 等
  amount: number; // 资金变动金额
  transaction_date: string; // 交易日期（ISO 格式字符串）
  donation_source_institution?: number; // 捐赠来源基金机构ID，可选
  donation_source_donor?: number; // 捐赠来源捐款者用户ID，可选
  disbursement_source?: number; // 拨款来源，可选
  fund_destination?: string; // 资金去向（如项目名称、账户），可选
  status: "completed" | "failed" | "pending"; // 资金变动状态
}

/** 基金机构，与表 fund_institution 对应 */
export interface FundInstitution {
  institution_id: number; // 机构ID，主键
  institution_name: string; // 机构名称
  institution_code?: string; // 机构编码，唯一（可选）
  contact_person?: string; // 联系人
  phone?: string; // 联系电话
  email?: string; // 机构邮箱
  address?: string; // 机构地址
  description?: string; // 机构描述
  created_at: string; // 创建时间（ISO 格式字符串）
}

/** 基金项目，与表 fund_project 对应 */
export interface FundProject {
  project_id: number; // 项目ID，主键
  project_name: string; // 项目名称
  project_leader?: string; // 项目负责人，可选
  budget?: number; // 项目预算，可选
  progress?: string; // 项目进度，可选
  description?: string; // 项目总体描述，可选
  created_at: string; // 创建时间（ISO 格式字符串）
  updated_at: string; // 最后修改时间（ISO 格式字符串）
}

/** 通知，与表 notification 对应 */
export interface Notification {
  notification_id: number; // 通知ID，主键
  recipient_id: number; // 消息接收者ID，外键关联 user.user_id
  title: string; // 通知标题
  message: string; // 通知内容
  status: "unread" | "read"; // 通知状态
  created_at: string; // 通知生成时间（ISO 格式字符串）
  message_type?: string; // 消息类型，如系统消息、邮件、短信，可选
}

/** 权限，与表 permission 对应 */
export interface Permission {
  permission_id: number; // 权限ID，主键
  permission_name: string; // 权限名称，如 "申请提交", "审核操作", "拨款确认" 等
  description?: string; // 权限描述，可选
}

/** 审核记录，与表 review_log 对应 */
export interface ReviewLog {
  review_id: number; // 审核记录ID，主键
  application_id: number; // 申请ID，外键关联 fund_application.application_id
  reviewer_id: number; // 审核人员ID，外键关联 user.user_id
  review_stage: number; // 审核阶段，例如 1 表示初审，2 表示复审
  review_opinion?: string; // 审核意见，可选
  review_result: "approved" | "rejected" | "needs_revision"; // 审核结果
  review_attachment?: string; // 审核附件路径，可选
  review_date: string; // 审核时间（ISO 格式字符串）
}

/** 角色，与表 role 对应 */
export interface Role {
  role_id: number; // 角色ID，主键
  role_name: string; // 角色名称，如 "applicant", "auditor", "finance", "admin"
  description?: string; // 角色描述，可选
}

/** 角色权限关联，与表 role_permission 对应 */
export interface RolePermission {
  role_id: number; // 角色ID
  permission_id: number; // 权限ID
}

/** 奖学金档次，与表 tier 对应 */
export interface Tier {
  tier_id: number; // 档次ID，主键
  tier_name: string; // 档次名称，如 "211", "985", "双非"
  award_amount: number; // 对应奖金额度
  conditions?: string; // 适用条件描述，可选
  created_at: string; // 创建时间（ISO 格式字符串）
  updated_at: string; // 最后修改时间（ISO 格式字符串）
}

/* ================================
   API 请求/响应 DTO 定义
   ================================ */

/** 创建基金项目申请的请求数据 */
export interface CreateFundApplicationDto {
  applicant_id: number;
  institution_id?: number;
  project_id: number;
  project_type_id: number;
  title: string;
  description?: string;
  amount_requested: number;
  use_plan?: string;
}

/** 更新基金项目申请的请求数据 */
export interface UpdateFundApplicationDto {
  title?: string;
  description?: string;
  amount_requested?: number;
  use_plan?: string;
}

/** 创建申请附件的请求数据 */
export interface CreateApplicationAttachmentDto {
  application_id: number;
  file_path: string;
  file_type?: string;
}

/** 更新申请附件的请求数据 */
export interface UpdateApplicationAttachmentDto {
  file_path?: string;
  file_type?: string;
}

/** 创建拨款记录的请求数据 */
export interface CreateDisbursementRecordDto {
  application_id: number;
  disbursement_amount: number;
  operator_id: number;
  status: "pending" | "confirmed" | "failed";
  note?: string;
}

/** 更新拨款记录的请求数据 */
export interface UpdateDisbursementRecordDto {
  disbursement_amount?: number;
  status?: "pending" | "confirmed" | "failed";
  note?: string;
}

/** 创建基金项目类型的请求数据 */
export interface CreateFundProjectTypeDto {
  project_type_name: string;
  description?: string;
}

/** 更新基金项目类型的请求数据 */
export interface UpdateFundProjectTypeDto {
  project_type_name?: string;
  description?: string;
}

/** 创建基金项目的请求数据 */
export interface CreateFundProjectDto {
  project_name: string;
  project_leader?: string;
  budget?: number;
  progress?: string;
  description?: string;
}

/** 更新基金项目的请求数据 */
export interface UpdateFundProjectDto {
  project_name?: string;
  project_leader?: string;
  budget?: number;
  progress?: string;
  description?: string;
}

/** 创建资金动态日志的请求数据 */
export interface CreateFundDynamicLogDto {
  log_type: string;
  amount: number;
  donation_source_institution?: number;
  donation_source_donor?: number;
  disbursement_source?: number;
  fund_destination?: string;
  status: "completed" | "failed" | "pending";
  transaction_date?: string; // 可选，默认由服务器设置
}

/** 更新资金动态日志的请求数据 */
export interface UpdateFundDynamicLogDto {
  log_type?: string;
  amount?: number;
  donation_source_institution?: number;
  donation_source_donor?: number;
  disbursement_source?: number;
  fund_destination?: string;
  status?: "completed" | "failed" | "pending";
  transaction_date?: string;
}

/** 创建捐赠记录的请求数据 */
export interface CreateFundDonationDto {
  donor_name: string;
  donation_amount: number;
  fund_institution_id: number;
  donation_date?: string; // 默认服务器设置当前时间
}

/** 创建通知的请求数据 */
export interface CreateNotificationDto {
  recipient_id: number;
  title: string;
  message: string;
  message_type?: string;
}

/** 更新通知的请求数据 */
export interface UpdateNotificationDto {
  title?: string;
  message?: string;
  status?: "unread" | "read";
  message_type?: string;
}

/** 创建申请状态的请求数据 */
export interface CreateApplicationStatusDto {
  status_name: string;
  description?: string;
}

/** 更新申请状态的请求数据 */
export interface UpdateApplicationStatusDto {
  status_name?: string;
  description?: string;
}

/** 创建审核记录的请求数据 */
export interface CreateReviewLogDto {
  application_id: number;
  reviewer_id: number;
  review_stage: number;
  review_opinion?: string;
  review_result: "approved" | "rejected" | "needs_revision";
  review_attachment?: string;
}

/** 更新审核记录的请求数据 */
export interface UpdateReviewLogDto {
  review_opinion?: string;
  review_attachment?: string;
}

/** 创建角色的请求数据 */
export interface CreateRoleDto {
  role_name: string;
  description?: string;
}

/** 更新角色的请求数据 */
export interface UpdateRoleDto {
  role_name?: string;
  description?: string;
}

/** 创建权限的请求数据 */
export interface CreatePermissionDto {
  permission_name: string;
  description?: string;
}

/** 更新权限的请求数据 */
export interface UpdatePermissionDto {
  permission_name?: string;
  description?: string;
}

/** 创建用户的请求数据 */
export interface CreateUserDto {
  username: string;
  password: string;
  email: string;
  phone?: string;
}

/** 更新用户信息的请求数据 */
export interface UpdateUserDto {
  username?: string;
  email?: string;
  phone?: string;
  // 可扩展其他属性，例如头像等
}

/** 用户登录请求数据 */
export interface LoginDto {
  username: string;
  password: string;
}

/** 用户登录响应数据 */
export interface LoginResponse {
  access_token: string;
}
