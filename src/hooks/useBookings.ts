import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyBookings, getBookingById, createBooking, cancelBooking } from "@/services/bookingService";
import type { CreateBookingPayload } from "@/services/bookingService";
import toast from "react-hot-toast";

/** Fetch all bookings for the current user */
export function useMyBookings() {
  return useQuery({
    queryKey: ["bookings", "mine"],
    queryFn: getMyBookings,
  });
}

/** Fetch a single booking by ID */
export function useBooking(id: string) {
  return useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBookingById(id),
    enabled: !!id,
  });
}

/** Create a booking mutation */
export function useCreateBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateBookingPayload) => createBooking(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("Booking created successfully!");
    },
    onError: () => {
      toast.error("Failed to create booking. Please try again.");
    },
  });
}

/** Cancel booking mutation */
export function useCancelBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => cancelBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("Booking cancelled.");
    },
    onError: () => {
      toast.error("Failed to cancel booking.");
    },
  });
}
