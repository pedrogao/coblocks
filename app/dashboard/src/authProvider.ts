import { AuthBindings } from "@refinedev/core";
import i18n from "./i18n";
import { login as apiLogin, getProfile } from "./api/auth";
import { TOKEN_KEY, axiosInstance } from "./api/axios";

export const authProvider: AuthBindings = {
  login: async ({ username, password }) => {
    const errResp = {
      success: false,
      error: {
        name: i18n.t("pages.login.errors.loginFailed"),
        message: i18n.t("pages.login.errors.loginFailedMsg"),
      },
    };

    if (username && password) {
      try {
        const { accessToken } = await apiLogin(username, password);

        if (!accessToken) {
          return errResp;
        }

        localStorage.setItem(TOKEN_KEY, accessToken);
        axiosInstance.interceptors.request.use((config) => {
          config.headers.Authorization = `Bearer ${accessToken}`;
          return config;
        });

        return {
          success: true,
          redirectTo: "/",
        };
      } catch (error) {
        console.error(error);
        return errResp;
      }
    }

    return errResp;
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    try {
      const user = await getProfile();
      return user;
    } catch (error) {
      console.error(error);
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
