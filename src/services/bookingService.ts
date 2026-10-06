import api from "./api";
import type { Booking } from "@/types";

export interface CreateBookingPayload {
  providerId: string;
  service: string;
  date: string;
  time: string;
  address: string;
  description: string;
}

/** Get all bookings for the current user */
export const getMyBookings = async (): Promise<Booking[]> => {
  const { data } = await api.get("/bookings");
  return data;
};

/** Get a single booking by ID */
export const getBookingById = async (id: string): Promise<Booking> => {
  const { data } = await api.get(`/bookings/${id}`);
  return data;
};

/** Create a new booking */
export const createBooking = async (payload: CreateBookingPayload): Promise<Booking> => {
  const { data } = await api.post("/bookings", payload);
  return data;
};

/** Cancel a booking */
export const cancelBooking = async (id: string): Promise<void> => {
  await api.patch(`/bookings/${id}/cancel`);
};
