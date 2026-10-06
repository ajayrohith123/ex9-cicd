import { useQuery } from "@tanstack/react-query";
import { getProviders, getProviderById, getFeaturedProviders } from "@/services/providerService";
import type { SearchFilters } from "@/types";

/** Fetch paginated list of providers with search filters */
export function useProviders(filters?: SearchFilters) {
  return useQuery({
    queryKey: ["providers", filters],
    queryFn: () => getProviders(filters),
  });
}

/** Fetch a single provider by ID */
export function useProvider(id: string) {
  return useQuery({
    queryKey: ["provider", id],
    queryFn: () => getProviderById(id),
    enabled: !!id,
  });
}

/** Fetch featured providers for landing page */
export function useFeaturedProviders() {
  return useQuery({
    queryKey: ["providers", "featured"],
    queryFn: getFeaturedProviders,
  });
}
