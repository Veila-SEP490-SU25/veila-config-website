export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface IRegisterRequest {
  username: string;
  password: string;
  fullName?: string;
}

export interface IRegisterResponse {
  username: string;
  fullName?: string;
}