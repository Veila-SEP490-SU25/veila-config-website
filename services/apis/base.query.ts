import { IItemResponse, IToken } from "@/services/types";
import {
  clearLocalStorage,
  getApiURL,
  getFromLocalStorage,
  getTokens,
  setTokens,
} from "@/utils";
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

const API_URL = getApiURL();

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders(headers, api) {
    const { accessToken } = getTokens();
    if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);
  },
});

export const baseQueryWithRefresh: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  const { statusCode, message } = result.data as IItemResponse<null>;
  if (statusCode >= 400 && statusCode < 500) {
    if (message.includes("hết hạn.")) {
      const refreshToken = getTokens().refreshToken;
      if (refreshToken) {
        const refreshResult = await baseQuery(
          {
            url: "/auth/refresh",
            method: "POST",
            body: { refreshToken },
          },
          api,
          extraOptions
        );
        const { statusCode, item } =
          refreshResult.data as IItemResponse<IToken>;
        if (statusCode === 200) {
          setTokens(item.accessToken, item.refreshToken);
          result = await baseQuery(args, api, extraOptions);
        } else {
          clearLocalStorage();
        }
      }
    }
  }

  return result;
};
