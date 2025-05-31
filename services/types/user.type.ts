import { IAudit } from "@/services/types/audit.type";

export interface IUser extends IAudit {
  username: string;
  fullName?: string;
}

export interface IChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}