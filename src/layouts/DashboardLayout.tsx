import { Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, CalendarClock, MessageSquare, Star, DollarSign, Heart, User, Settings, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function DashboardLayout() {
  const location = useLocation();
  const isProvider = location.pathname.includes('/provider');
  const isAdmin = location.pathname.includes('/admin');

  const links = isAdmin ? [
    { name: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
    { name: "Users", href: "/dashboard/admin/users", icon: User },
    { name: "Bookings", href: "/dashboard/admin/bookings", icon: CalendarClock },
    { name: "Settings", href: "/dashboard/admin/settings", icon: Settings },
  ] : isProvider ? [
    { name: "Dashboard", href: "/dashboard/provider", icon: LayoutDashboard },
    { name: "My Bookings", href: "/dashboard/provider/bookings", icon: CalendarClock },
    { name: "Messages", href: "/chat", icon: MessageSquare },
    { name: "Reviews", href: "/dashboard/provider/reviews", icon: Star },
    { name: "Earnings", href: "/dashboard/provider/earnings", icon: DollarSign },
    { name: "Profile", href: "/dashboard/provider/profile", icon: User },
    { name: "Settings", href: "/dashboard/provider/settings", icon: Settings },
  ] : [
    { name: "Dashboard", href: "/dashboard/customer", icon: LayoutDashboard },
    { name: "My Bookings", href: "/dashboard/customer/bookings", icon: CalendarClock },
    { name: "Messages", href: "/chat", icon: MessageSquare },
    { name: "Reviews", href: "/dashboard/customer/reviews", icon: Star },
    { name: "Favorites", href: "/dashboard/customer/favorites", icon: Heart },
    { name: "Profile", href: "/dashboard/customer/profile", icon: User },
    { name: "Settings", href: "/dashboard/customer/settings", icon: Settings },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 sm:p-6 pb-2">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            S
          </div>
          <span className="font-bold text-xl tracking-tight">ServeLocal</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {links.map((link) => {
          const isActive = location.pathname === link.href;
          return (
            <Link
              key={link.name}
              to={link.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <link.icon className="h-5 w-5" />
              {link.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 mt-auto border-t">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
      <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Sidebar</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
            <SidebarContent />
          </SheetContent>
        </Sheet>
        <div className="font-semibold text-lg">Dashboard</div>
        <div className="ml-auto flex items-center gap-4">
          <div className="h-8 w-8 rounded-full bg-primary/20 border-2 border-primary"></div>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 border-r bg-card hidden md:block flex-shrink-0">
          <SidebarContent />
        </aside>
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="hidden md:flex justify-end mb-8 items-center gap-4">
            <span className="text-sm font-medium">Hello, {isProvider ? 'Provider' : isAdmin ? 'Admin' : 'Customer'}</span>
            <div className="h-10 w-10 rounded-full bg-primary/20 border-2 border-primary overflow-hidden">
              <img src="https://i.pravatar.cc/150?u=a" alt="User" className="w-full h-full object-cover" />
            </div>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
