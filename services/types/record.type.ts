import { IAudit } from "@/services/types/audit.type";

export interface IRecord extends IAudit {
  key: string;
  value: string;
  profileId: string;
}

export interface IGetRecordsRequest {
  secret: string;
}

export interface ICreateRecordRequest {
  secret: string;
  key: string;
  value: string;
}

export interface IUpdateRecordRequest {
  secret: string;
  key: string;
  value: string;
}

export interface IDeleteRecordRequest {
  secret: string;
  key: string;
}