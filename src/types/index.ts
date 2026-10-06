// Provider types
export interface Provider {
  id: string;
  name: string;
  title: string;
  category: string;
  rating: number;
  reviews: number;
  price: number;
  distance: string;
  image: string;
  verified: boolean;
  experience: string;
  location: string;
  about: string;
  skills: string[];
  lat: number;
  lng: number;
}

// Booking types
export type BookingStatus =
  | "requested"
  | "accepted"
  | "travelling"
  | "started"
  | "completed"
  | "cancelled";

export interface Booking {
  id: string;
  providerId: string;
  providerName: string;
  providerImage: string;
  service: string;
  date: string;
  time: string;
  address: string;
  status: BookingStatus;
  price: number;
  notes?: string;
}

// Review types
export interface Review {
  id: string;
  authorId: string;
  authorName: string;
  authorImage?: string;
  providerId: string;
  rating: number;
  text: string;
  date: string;
}

// User types
export type UserRole = "customer" | "provider" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  location?: string;
  createdAt: string;
}

// Chat types
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  time: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: string;
  lastTime: string;
  unread: number;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Search/filter types
export interface SearchFilters {
  query?: string;
  location?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  distance?: number;
  sortBy?: "recommended" | "rating" | "price_low" | "price_high" | "distance";
}
