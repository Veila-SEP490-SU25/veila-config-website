import { baseQueryWithRefresh } from "@/services/apis/base.query";
import {
  IItemResponse,
  ILoginRequest,
  IRegisterRequest,
  IRegisterResponse,
  IToken,
} from "@/services/types";
import { createApi } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({
    login: builder.mutation<IItemResponse<IToken>, ILoginRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),

    register: builder.mutation<
      IItemResponse<IRegisterResponse>,
      IRegisterRequest
    >({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
