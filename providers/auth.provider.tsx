"use client";

import { useLazyGetSelfQuery, useLoginMutation } from "@/services/apis";
import { ILoginRequest, IUser } from "@/services/types";
import {
  delTokens,
  getAccessToken,
  getFromLocalStorage,
  getRefreshToken,
  setTokens,
  setToLocalStorage,
} from "@/utils";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";

type AuthContextType = {
  login: (body: ILoginRequest) => Promise<void>;
  logout: () => void;
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  currentUser: IUser | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isAuthenticated, setIsAuthenticated] = useState(
    getFromLocalStorage<boolean>("isAuthenticated") || false
  );
  const [currentUser, setCurrentUser] = useState<IUser | null>(
    getFromLocalStorage<IUser>("currentUser") || null
  );
  const [accessToken, setAccessToken] = useState<string | null>(
    getAccessToken()
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    getRefreshToken()
  );

  const authCheckRef = useRef(false);

  const saveTokens = useCallback(
    (accessToken: string, refreshToken: string) => {
      setTokens(accessToken, refreshToken);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    },
    [setAccessToken, setRefreshToken]
  );

  const revokeTokens = useCallback(() => {
    delTokens();
    setAccessToken(null);
    setRefreshToken(null);
  }, [setAccessToken, setRefreshToken]);

  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();
  const [getSelfQuery, { isLoading: isGetSelfLoading }] = useLazyGetSelfQuery();

  const login = useCallback(
    async (body: ILoginRequest) => {
      try {
        const { item, message, statusCode } = await loginMutation(
          body
        ).unwrap();
        if (statusCode === 200) {
          const { accessToken, refreshToken } = item;
          authCheckRef.current = false;
          saveTokens(accessToken, refreshToken);
          setIsAuthenticated(true);
          setToLocalStorage("isAuthenticated", true);
          router.push("/");
        } else {
          toast.error("Đăng nhập thất bại.", {
            description: message || "Vui lòng thử lại sau.",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    [loginMutation, saveTokens, setIsAuthenticated, router]
  );

  const logout = useCallback(() => {
    revokeTokens();
    setIsAuthenticated(false);
    setCurrentUser(null);
    setToLocalStorage("isAuthenticated", false);
    setToLocalStorage("currentUser", null);
    router.push("/login");
  }, [revokeTokens, setIsAuthenticated, setCurrentUser, router]);

  useEffect(() => {
    if (authCheckRef.current) return;

    const checkAuth = async () => {
      console.log("Checking authentication...");
      if (!accessToken || !refreshToken) {
        if (isAuthenticated) {
          logout();
        }
        return;
      }

      try {
        const { item, message, statusCode } = await getSelfQuery().unwrap();
        if (statusCode === 200) {
          authCheckRef.current = true;
          setCurrentUser(item);
          setToLocalStorage("currentUser", item);
          setIsAuthenticated(true);
          setToLocalStorage("isAuthenticated", true);
          if (pathname === "/login") {
            router.push("/");
          }
        } else {
          toast.error("Phiên đăng nhập đã hết hạn.", {
            description: message || "Vui lòng đăng nhập lại.",
          });
          authCheckRef.current = false;
          logout();
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (accessToken || isAuthenticated) {
      checkAuth();
    }
  }, [accessToken, refreshToken, isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isAuthenticating: isLoginLoading || isGetSelfLoading,
        isAuthenticated,
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
