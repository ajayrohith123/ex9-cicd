import { useState } from "react";
import { Search, CalendarClock, CheckCircle, Clock, XCircle } from "lucide-react";
import { toast } from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type StatusFilter = "all" | "confirmed" | "in_progress" | "completed" | "cancelled";

const ALL_BOOKINGS = [
  { id: "BK-12345", customer: "Alex Johnson", customerImg: "https://i.pravatar.cc/150?u=a", provider: "Michael Chen", providerImg: "https://i.pravatar.cc/150?u=1", service: "Pipe Leak Repair", date: "Aug 5, 2026 – 10:00 AM", amount: "$90", status: "in_progress" },
  { id: "BK-12344", customer: "Emma Wilson", customerImg: "https://i.pravatar.cc/150?u=31", provider: "Sarah Jenkins", providerImg: "https://i.pravatar.cc/150?u=2", service: "Electrical Inspection", date: "Aug 5, 2026 – 2:00 PM", amount: "$110", status: "confirmed" },
  { id: "BK-12343", customer: "John Smith", customerImg: "https://i.pravatar.cc/150?u=30", provider: "Elena Rodriguez", providerImg: "https://i.pravatar.cc/150?u=4", service: "Living Room Painting", date: "Aug 3, 2026 – 9:00 AM", amount: "$240", status: "completed" },
  { id: "BK-12342", customer: "Robert Davis", customerImg: "https://i.pravatar.cc/150?u=32", provider: "David Smith", providerImg: "https://i.pravatar.cc/150?u=3", service: "Home Deep Cleaning", date: "Aug 2, 2026 – 11:00 AM", amount: "$120", status: "completed" },
  { id: "BK-12341", customer: "Tom Harris", customerImg: "https://i.pravatar.cc/150?u=33", provider: "Marcus Johnson", providerImg: "https://i.pravatar.cc/150?u=5", service: "Shelf Installation", date: "Aug 1, 2026 – 2:00 PM", amount: "$75", status: "cancelled" },
];

const STATUS_CONFIG: Record<string, { label: string; className: string; icon: React.ElementType }> = {
  confirmed: { label: "Confirmed", className: "bg-blue-100 text-blue-700", icon: CalendarClock },
  in_progress: { label: "In Progress", className: "bg-purple-100 text-purple-700", icon: Clock },
  completed: { label: "Completed", className: "bg-green-100 text-green-700", icon: CheckCircle },
  cancelled: { label: "Cancelled", className: "bg-red-100 text-red-700", icon: XCircle },
};

export function AdminBookings() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filtered = ALL_BOOKINGS.filter((b) => {
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    const matchesSearch =
      b.customer.toLowerCase().includes(search.toLowerCase()) ||
      b.provider.toLowerCase().includes(search.toLowerCase()) ||
      b.service.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalRevenue = ALL_BOOKINGS
    .filter((b) => b.status === "completed")
    .reduce((s, b) => s + parseInt(b.amount.replace("$", "")), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">Booking Management</h1>
        <p className="text-muted-foreground">Monitor and manage all platform bookings.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card className="text-center p-4">
          <div className="text-2xl font-bold">{ALL_BOOKINGS.length}</div>
          <div className="text-xs text-muted-foreground mt-1">Total Bookings</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-purple-600">{ALL_BOOKINGS.filter(b => b.status === "in_progress").length}</div>
          <div className="text-xs text-muted-foreground mt-1">In Progress</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-green-600">{ALL_BOOKINGS.filter(b => b.status === "completed").length}</div>
          <div className="text-xs text-muted-foreground mt-1">Completed</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-primary">${totalRevenue}</div>
          <div className="text-xs text-muted-foreground mt-1">Revenue</div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search bookings..." className="pl-9 h-10" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex flex-wrap gap-1 bg-muted p-1 rounded-lg border w-fit">
          {(["all", "confirmed", "in_progress", "completed", "cancelled"] as StatusFilter[]).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all ${statusFilter === s ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              {s.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Bookings ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="text-left font-medium px-4 py-3 text-muted-foreground">Booking ID</th>
                  <th className="text-left font-medium px-4 py-3 text-muted-foreground">Customer</th>
                  <th className="text-left font-medium px-4 py-3 text-muted-foreground">Provider</th>
                  <th className="text-left font-medium px-4 py-3 text-muted-foreground">Service</th>
                  <th className="text-left font-medium px-4 py-3 text-muted-foreground">Date</th>
                  <th className="text-left font-medium px-4 py-3 text-muted-foreground">Amount</th>
                  <th className="text-left font-medium px-4 py-3 text-muted-foreground">Status</th>
                  <th className="text-left font-medium px-4 py-3 text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((booking) => {
                  const s = STATUS_CONFIG[booking.status];
                  const StatusIcon = s.icon;
                  return (
                    <tr key={booking.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{booking.id}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7">
                            <AvatarImage src={booking.customerImg} />
                            <AvatarFallback>{booking.customer[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{booking.customer}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7">
                            <AvatarImage src={booking.providerImg} />
                            <AvatarFallback>{booking.provider[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{booking.provider}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">{booking.service}</td>
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{booking.date}</td>
                      <td className="px-4 py-3 font-semibold">{booking.amount}</td>
                      <td className="px-4 py-3">
                        <Badge variant="secondary" className={s.className}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {s.label}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        {booking.status !== "cancelled" && booking.status !== "completed" && (
                          <Button size="sm" variant="outline" className="h-7 text-xs text-destructive hover:bg-destructive/10" onClick={() => toast.success(`Booking ${booking.id} cancelled.`)}>
                            Cancel
                          </Button>
                        )}
                        {booking.status === "cancelled" && (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
