import { API_URL, axiosInstance } from "./axios";

export const login = async (username: string, password: string) => {
  const url = `${API_URL}/auth/login`;
  const response = await axiosInstance.post(url, { username, password });
  return response.data;
};

export const register = async (username: string, password: string) => {
  const url = `${API_URL}/users`;
  const response = await axiosInstance.post(url, { username, password });
  return response.data;
};

export const getProfile = async () => {
  const url = `${API_URL}/users/profile`;
  const response = await axiosInstance.get(url);
  return response.data;
};
