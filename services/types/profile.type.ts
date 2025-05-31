import { IAudit } from "@/services/types/audit.type";

export interface IProfile extends IAudit {
  name: string;
  secret: string;
  userId: string;
}

export interface IGetProfileRequest {
  profileId: string;
}

export interface ICreateProfileRequest {
  name: string;
}

export interface IUpdateProfileNameRequest {
  profileId: string;
  name: string;
}

export interface IChangeProfileSecretRequest {
  profileId: string;
}

export interface IDeleteProfileRequest {
  profileId: string;
}