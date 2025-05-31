import { baseQueryWithRefresh } from "@/services/apis/base.query";
import { IChangePasswordRequest, IItemResponse, IUser } from "@/services/types";
import { createApi } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({
    getSelf: builder.query<IItemResponse<IUser>, void>({
      query: () => ({
        url: "/user/self",
        method: "GET",
      }),
    }),

    changePassword: builder.mutation<
      IItemResponse<boolean>,
      IChangePasswordRequest
    >({
      query: (body) => ({
        url: "/user/change-password",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const { useLazyGetSelfQuery, useChangePasswordMutation } = userApi;
