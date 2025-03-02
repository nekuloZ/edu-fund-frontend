export interface UserInfo {
  id: string;
  username: string;
  realName: string;
  email: string;
  phone: string;
  roleId: string;
  roleName: string;
  status: number;
  createTime: string;
  [key: string]: any;
}
