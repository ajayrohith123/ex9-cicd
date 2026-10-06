import api from "./api";
import type { User } from "@/types";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: "customer" | "provider";
}

export interface AuthResponse {
  user: User;
  access_token: string;
  refresh_token: string;
}

/** Login with email and password */
export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>("/auth/login", payload);
  localStorage.setItem("access_token", data.access_token);
  return data;
};

/** Register a new user */
export const register = async (payload: RegisterPayload): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>("/auth/register", payload);
  localStorage.setItem("access_token", data.access_token);
  return data;
};

/** Logout the current user */
export const logout = async (): Promise<void> => {
  await api.post("/auth/logout").catch(() => {});
  localStorage.removeItem("access_token");
};

/** Get the current authenticated user */
export const getCurrentUser = async (): Promise<User> => {
  const { data } = await api.get("/auth/me");
  return data;
};
