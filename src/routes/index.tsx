import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { DashboardLayout } from "@/layouts/DashboardLayout";

// Lazy-loaded pages for code splitting
const Landing = lazy(() => import("@/pages/Landing").then((m) => ({ default: m.Landing })));
const Login = lazy(() => import("@/pages/auth/Login").then((m) => ({ default: m.Login })));
const Register = lazy(() => import("@/pages/auth/Register").then((m) => ({ default: m.Register })));
const Search = lazy(() => import("@/pages/Search").then((m) => ({ default: m.Search })));
const ProviderProfile = lazy(() => import("@/pages/ProviderProfile").then((m) => ({ default: m.ProviderProfile })));
const Booking = lazy(() => import("@/pages/Booking").then((m) => ({ default: m.Booking })));
const BookingTracking = lazy(() => import("@/pages/BookingTracking").then((m) => ({ default: m.BookingTracking })));
const Profile = lazy(() => import("@/pages/Profile").then((m) => ({ default: m.Profile })));
const Chat = lazy(() => import("@/pages/Chat").then((m) => ({ default: m.Chat })));
const NotFound = lazy(() => import("@/pages/NotFound").then((m) => ({ default: m.NotFound })));

// Customer dashboard pages
const CustomerDashboard = lazy(() => import("@/pages/dashboard/CustomerDashboard").then((m) => ({ default: m.CustomerDashboard })));
const CustomerBookings = lazy(() => import("@/pages/dashboard/CustomerBookings").then((m) => ({ default: m.CustomerBookings })));
const CustomerFavorites = lazy(() => import("@/pages/dashboard/CustomerFavorites").then((m) => ({ default: m.CustomerFavorites })));
const CustomerReviews = lazy(() => import("@/pages/dashboard/CustomerReviews").then((m) => ({ default: m.CustomerReviews })));
const CustomerSettings = lazy(() => import("@/pages/dashboard/CustomerSettings").then((m) => ({ default: m.CustomerSettings })));

// Provider dashboard pages
const ProviderDashboard = lazy(() => import("@/pages/dashboard/ProviderDashboard").then((m) => ({ default: m.ProviderDashboard })));
const ProviderBookings = lazy(() => import("@/pages/dashboard/ProviderBookings").then((m) => ({ default: m.ProviderBookings })));
const ProviderEarnings = lazy(() => import("@/pages/dashboard/ProviderEarnings").then((m) => ({ default: m.ProviderEarnings })));
const ProviderReviews = lazy(() => import("@/pages/dashboard/ProviderReviews").then((m) => ({ default: m.ProviderReviews })));
const ProviderSettings = lazy(() => import("@/pages/dashboard/ProviderSettings").then((m) => ({ default: m.ProviderSettings })));

// Admin dashboard pages
const AdminDashboard = lazy(() => import("@/pages/dashboard/AdminDashboard").then((m) => ({ default: m.AdminDashboard })));
const AdminUsers = lazy(() => import("@/pages/dashboard/AdminUsers").then((m) => ({ default: m.AdminUsers })));
const AdminBookings = lazy(() => import("@/pages/dashboard/AdminBookings").then((m) => ({ default: m.AdminBookings })));
const AdminSettings = lazy(() => import("@/pages/dashboard/AdminSettings").then((m) => ({ default: m.AdminSettings })));

// Page loading fallback
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        <p className="text-sm text-muted-foreground font-medium">Loading...</p>
      </div>
    </div>
  );
}

function Wrap({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Wrap><Landing /></Wrap> },
      { path: "search", element: <Wrap><Search /></Wrap> },
      { path: "provider/:id", element: <Wrap><ProviderProfile /></Wrap> },
      { path: "book/:id", element: <Wrap><Booking /></Wrap> },
      { path: "track/:id", element: <Wrap><BookingTracking /></Wrap> },
      { path: "*", element: <Wrap><NotFound /></Wrap> },
    ],
  },
  {
    path: "/auth",
    children: [
      { path: "login", element: <Wrap><Login /></Wrap> },
      { path: "register", element: <Wrap><Register /></Wrap> },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      // Customer routes
      { path: "customer", element: <Wrap><CustomerDashboard /></Wrap> },
      { path: "customer/bookings", element: <Wrap><CustomerBookings /></Wrap> },
      { path: "customer/favorites", element: <Wrap><CustomerFavorites /></Wrap> },
      { path: "customer/reviews", element: <Wrap><CustomerReviews /></Wrap> },
      { path: "customer/profile", element: <Wrap><Profile /></Wrap> },
      { path: "customer/settings", element: <Wrap><CustomerSettings /></Wrap> },

      // Provider routes
      { path: "provider", element: <Wrap><ProviderDashboard /></Wrap> },
      { path: "provider/bookings", element: <Wrap><ProviderBookings /></Wrap> },
      { path: "provider/earnings", element: <Wrap><ProviderEarnings /></Wrap> },
      { path: "provider/reviews", element: <Wrap><ProviderReviews /></Wrap> },
      { path: "provider/profile", element: <Wrap><Profile /></Wrap> },
      { path: "provider/settings", element: <Wrap><ProviderSettings /></Wrap> },

      // Admin routes
      { path: "admin", element: <Wrap><AdminDashboard /></Wrap> },
      { path: "admin/users", element: <Wrap><AdminUsers /></Wrap> },
      { path: "admin/bookings", element: <Wrap><AdminBookings /></Wrap> },
      { path: "admin/settings", element: <Wrap><AdminSettings /></Wrap> },
    ],
  },
  {
    path: "/chat",
    element: <Wrap><Chat /></Wrap>,
  },
]);
