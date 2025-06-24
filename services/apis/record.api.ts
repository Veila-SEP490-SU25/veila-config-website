import { baseQueryWithRefresh } from "@/services/apis/base.query";
import {
  ICreateRecordRequest,
  IDeleteRecordRequest,
  IGetRecordsRequest,
  IItemResponse,
  IListResponse,
  IRecord,
  IUpdateRecordRequest,
} from "@/services/types";
import { createApi } from "@reduxjs/toolkit/query/react";

export const recordApi = createApi({
  reducerPath: "recordApi",
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({
    getRecords: builder.query<IListResponse<IRecord>, IGetRecordsRequest>({
      query: ({ secret }) => ({
        url: "/record",
        headers: {
          "X-Secret-Key": secret,
        },
      }),
    }),

    createRecord: builder.mutation<
      IItemResponse<IRecord>,
      ICreateRecordRequest
    >({
      query: ({ secret, key, value }) => ({
        url: "/record",
        method: "POST",
        headers: {
          "X-Secret-Key": secret,
        },
        body: { key, value },
      }),
    }),

    updateRecord: builder.mutation<
      IItemResponse<IRecord>,
      IUpdateRecordRequest
    >({
      query: ({ secret, key, value }) => ({
        url: `/record`,
        method: "PUT",
        headers: {
          "X-Secret-Key": secret,
        },
        body: { key, value },
      }),
    }),

    deleteRecord: builder.mutation<
      IItemResponse<IRecord>,
      IDeleteRecordRequest
    >({
      query: ({ secret, key }) => ({
        url: `/record`,
        method: "DELETE",
        headers: {
          "X-Secret-Key": secret,
        },
        body: { key },
      }),
    }),
  }),
});

export const {
  useLazyGetRecordsQuery,
  useCreateRecordMutation,
  useUpdateRecordMutation,
  useDeleteRecordMutation,
} = recordApi;
