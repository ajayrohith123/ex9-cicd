import api from "./api";
import type { Provider, SearchFilters, PaginatedResponse } from "@/types";

/** Get all providers with optional filters */
export const getProviders = async (filters?: SearchFilters): Promise<PaginatedResponse<Provider>> => {
  const { data } = await api.get("/providers", { params: filters });
  return data;
};

/** Get a single provider by ID */
export const getProviderById = async (id: string): Promise<Provider> => {
  const { data } = await api.get(`/providers/${id}`);
  return data;
};

/** Get featured/top-rated providers for landing page */
export const getFeaturedProviders = async (): Promise<Provider[]> => {
  const { data } = await api.get("/providers/featured");
  return data;
};
