import { baseQueryWithRefresh } from "@/services/apis/base.query";
import {
  IChangeProfileSecretRequest,
  ICreateProfileRequest,
  IDeleteProfileRequest,
  IGetProfileRequest,
  IItemResponse,
  IListResponse,
  IPaginationRequest,
  IProfile,
  IUpdateProfileNameRequest,
} from "@/services/types";
import { createApi } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({
    getProfiles: builder.query<IListResponse<IProfile>, IPaginationRequest>({
      query: ({ pageIndex = 1, pageSize = 10 }) => {
        const params = new URLSearchParams();
        params.append("pageIndex", pageIndex.toString());
        params.append("pageSize", pageSize.toString());
        return {
          url: `/profile?${params.toString()}`,
          method: "GET",
        };
      },
    }),

    getProfileById: builder.query<IItemResponse<IProfile>, IGetProfileRequest>({
      query: ({ profileId }) => ({
        url: `/profile/${profileId}`,
        method: "GET",
      }),
    }),

    createProfile: builder.mutation<
      IItemResponse<IProfile>,
      ICreateProfileRequest
    >({
      query: (body) => ({
        url: `/profile`,
        method: "POST",
        body,
      }),
    }),

    updateProfileName: builder.mutation<
      IItemResponse<IProfile>,
      IUpdateProfileNameRequest
    >({
      query: ({ profileId, name }) => ({
        url: `/profile/${profileId}`,
        method: "PUT",
        body: { name },
      }),
    }),

    changeProfileSecret: builder.mutation<
      IItemResponse<IProfile>,
      IChangeProfileSecretRequest
    >({
      query: ({ profileId }) => ({
        url: `/profile/${profileId}/secret`,
        method: "PUT",
      }),
    }),

    deleteProfile: builder.mutation<
      IItemResponse<boolean>,
      IDeleteProfileRequest
    >({
      query: ({ profileId }) => ({
        url: `/profile/${profileId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLazyGetProfilesQuery,
  useLazyGetProfileByIdQuery,
  useCreateProfileMutation,
  useUpdateProfileNameMutation,
  useChangeProfileSecretMutation,
  useDeleteProfileMutation,
} = profileApi;
