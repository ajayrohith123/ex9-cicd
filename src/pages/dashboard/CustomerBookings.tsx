import { useState } from "react";
import { Link } from "react-router-dom";
import { CalendarClock, MapPin, Navigation, CheckCircle2, XCircle, Clock, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Status = "all" | "upcoming" | "completed" | "cancelled";

const ALL_BOOKINGS = [
  { id: "12345", provider: "Michael Chen", service: "Pipe Leak Repair", date: "Tomorrow, 10:00 AM", status: "confirmed", price: "$90", image: "https://i.pravatar.cc/150?u=1" },
  { id: "12344", provider: "Sarah Jenkins", service: "Electrical Inspection", date: "Oct 24, 2:00 PM", status: "pending", price: "$110", image: "https://i.pravatar.cc/150?u=2" },
  { id: "12343", provider: "Elena Rodriguez", service: "Living Room Painting", date: "Oct 18, 9:00 AM", status: "completed", price: "$240", image: "https://i.pravatar.cc/150?u=4" },
  { id: "12342", provider: "David Smith", service: "Home Deep Cleaning", date: "Oct 10, 11:00 AM", status: "completed", price: "$120", image: "https://i.pravatar.cc/150?u=3" },
  { id: "12341", provider: "Marcus Johnson", service: "Shelf Installation", date: "Sep 30, 2:00 PM", status: "cancelled", price: "$75", image: "https://i.pravatar.cc/150?u=5" },
];

const STATUS_STYLES: Record<string, { label: string; className: string; icon: React.ElementType }> = {
  confirmed: { label: "Confirmed", className: "bg-green-100 text-green-700 hover:bg-green-200", icon: CheckCircle2 },
  pending: { label: "Pending", className: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200", icon: Clock },
  completed: { label: "Completed", className: "bg-blue-100 text-blue-700 hover:bg-blue-200", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", className: "bg-red-100 text-red-700 hover:bg-red-200", icon: XCircle },
};

const TABS: { label: string; value: Status }[] = [
  { label: "All", value: "all" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

export function CustomerBookings() {
  const [activeTab, setActiveTab] = useState<Status>("all");
  const [search, setSearch] = useState("");

  const filtered = ALL_BOOKINGS.filter((b) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "upcoming" && (b.status === "confirmed" || b.status === "pending")) ||
      (activeTab === "completed" && b.status === "completed") ||
      (activeTab === "cancelled" && b.status === "cancelled");

    const matchesSearch =
      b.provider.toLowerCase().includes(search.toLowerCase()) ||
      b.service.toLowerCase().includes(search.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">My Bookings</h1>
        <p className="text-muted-foreground">Track and manage all your service bookings.</p>
      </div>

      {/* Filters row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bookings..."
            className="pl-9 h-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-1 bg-muted p-1 rounded-lg border w-fit">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.value
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings list */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <CalendarClock className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium">No bookings found</p>
          <p className="text-sm mt-1">Try adjusting your filters or search.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((booking) => {
            const s = STATUS_STYLES[booking.status];
            const StatusIcon = s.icon;
            return (
              <Card key={booking.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-5 flex flex-col sm:flex-row gap-4 sm:items-center">
                  <img
                    src={booking.image}
                    alt={booking.provider}
                    className="w-14 h-14 rounded-full object-cover border-2 border-border flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                      <div>
                        <p className="font-bold text-lg leading-tight">{booking.service}</p>
                        <p className="text-sm text-muted-foreground">with {booking.provider}</p>
                      </div>
                      <Badge variant="secondary" className={s.className}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {s.label}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mt-2">
                      <span className="flex items-center gap-1">
                        <CalendarClock className="w-3.5 h-3.5" /> {booking.date}
                      </span>
                      <span className="font-semibold text-foreground">{booking.price}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    {(booking.status === "confirmed" || booking.status === "pending") && (
                      <Link to={`/track/${booking.id}`}>
                        <Button size="sm" className="gap-1">
                          <Navigation className="w-3.5 h-3.5" /> Track
                        </Button>
                      </Link>
                    )}
                    {booking.status === "completed" && (
                      <Button size="sm" variant="outline">Leave Review</Button>
                    )}
                    <Link to={`/provider/1`}>
                      <Button size="sm" variant="outline">
                        <MapPin className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
