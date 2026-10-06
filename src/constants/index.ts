export const APP_NAME = "ServeLocal";
export const APP_TAGLINE = "Your trusted local services marketplace";

export const SERVICE_CATEGORIES = [
  { id: "plumbing", name: "Plumbing", emoji: "🔧" },
  { id: "electrical", name: "Electrical", emoji: "⚡" },
  { id: "carpentry", name: "Carpentry", emoji: "🪵" },
  { id: "cleaning", name: "Cleaning", emoji: "🧹" },
  { id: "painting", name: "Painting", emoji: "🎨" },
  { id: "ac-repair", name: "AC Repair", emoji: "❄️" },
  { id: "tutor", name: "Tutoring", emoji: "📚" },
  { id: "mechanic", name: "Mechanic", emoji: "🚗" },
  { id: "gardening", name: "Gardening", emoji: "🌱" },
  { id: "appliance", name: "Appliance Repair", emoji: "🔌" },
];

export const BOOKING_STATUSES = {
  requested: { label: "Requested", color: "text-blue-600", bg: "bg-blue-50" },
  accepted: { label: "Accepted", color: "text-indigo-600", bg: "bg-indigo-50" },
  travelling: { label: "Travelling", color: "text-yellow-600", bg: "bg-yellow-50" },
  started: { label: "In Progress", color: "text-orange-600", bg: "bg-orange-50" },
  completed: { label: "Completed", color: "text-green-600", bg: "bg-green-50" },
  cancelled: { label: "Cancelled", color: "text-red-600", bg: "bg-red-50" },
} as const;

export const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "rating", label: "Highest Rated" },
  { value: "price_low", label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
  { value: "distance", label: "Nearest First" },
];

export const DISTANCE_OPTIONS = [
  { value: "2", label: "Within 2 miles" },
  { value: "5", label: "Within 5 miles" },
  { value: "10", label: "Within 10 miles" },
  { value: "20", label: "Within 20 miles" },
];
