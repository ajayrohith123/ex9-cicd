import { useState } from "react";
import { CalendarClock, CheckCircle, Clock, XCircle, Search, Phone, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type TabStatus = "all" | "pending" | "upcoming" | "completed";

const ALL_JOBS = [
  { id: "j001", client: "Alice Johnson", service: "Water Heater Installation", date: "Today, 1:30 PM", status: "in_progress", price: "$120", image: "https://i.pravatar.cc/150?u=10" },
  { id: "j002", client: "Robert Davis", service: "Faucet Replacement", date: "Today, 4:00 PM", status: "upcoming", price: "$75", image: "https://i.pravatar.cc/150?u=11" },
  { id: "j003", client: "Emma Wilson", service: "Emergency Leak", date: "Tomorrow, 10:00 AM", status: "pending", price: "$85", image: "https://i.pravatar.cc/150?u=12" },
  { id: "j004", client: "Tom Harris", service: "Drain Unclogging", date: "Oct 25, 2:00 PM", status: "pending", price: "$60", image: "https://i.pravatar.cc/150?u=13" },
  { id: "j005", client: "John Smith", service: "Pipe Leak Repair", date: "Oct 20, 9:00 AM", status: "completed", price: "$90", image: "https://i.pravatar.cc/150?u=14" },
  { id: "j006", client: "Jane Doe", service: "Toilet Installation", date: "Oct 15, 11:00 AM", status: "completed", price: "$110", image: "https://i.pravatar.cc/150?u=15" },
];

const STATUS_CONFIG: Record<string, { label: string; className: string; icon: React.ElementType }> = {
  pending: { label: "Pending", className: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200", icon: Clock },
  upcoming: { label: "Upcoming", className: "bg-blue-100 text-blue-700 hover:bg-blue-200", icon: CalendarClock },
  in_progress: { label: "In Progress", className: "bg-purple-100 text-purple-700 hover:bg-purple-200", icon: Clock },
  completed: { label: "Completed", className: "bg-green-100 text-green-700 hover:bg-green-200", icon: CheckCircle },
  cancelled: { label: "Cancelled", className: "bg-red-100 text-red-700 hover:bg-red-200", icon: XCircle },
};

const TABS: { label: string; value: TabStatus }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Completed", value: "completed" },
];

export function ProviderBookings() {
  const [activeTab, setActiveTab] = useState<TabStatus>("all");
  const [search, setSearch] = useState("");

  const filtered = ALL_JOBS.filter((j) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pending" && j.status === "pending") ||
      (activeTab === "upcoming" && (j.status === "upcoming" || j.status === "in_progress")) ||
      (activeTab === "completed" && j.status === "completed");
    const matchesSearch =
      j.client.toLowerCase().includes(search.toLowerCase()) ||
      j.service.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">My Bookings</h1>
        <p className="text-muted-foreground">Manage all your incoming and past service jobs.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs..."
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

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <CalendarClock className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium">No jobs found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((job) => {
            const s = STATUS_CONFIG[job.status];
            const StatusIcon = s.icon;
            const isPending = job.status === "pending";
            return (
              <Card key={job.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                  <img
                    src={job.image}
                    alt={job.client}
                    className="w-12 h-12 rounded-full object-cover border-2 border-border flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                      <div>
                        <p className="font-bold leading-tight">{job.service}</p>
                        <p className="text-sm text-muted-foreground">Client: {job.client}</p>
                      </div>
                      <Badge variant="secondary" className={s.className}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {s.label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <CalendarClock className="w-3.5 h-3.5" /> {job.date}
                      </span>
                      <span className="font-semibold text-foreground">{job.price}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    {isPending && (
                      <>
                        <Button size="sm" onClick={() => toast.success("Job accepted!")}>Accept</Button>
                        <Button size="sm" variant="outline" onClick={() => toast.error("Job declined.")}>Decline</Button>
                      </>
                    )}
                    {!isPending && (
                      <>
                        <Link to="/chat">
                          <Button size="sm" variant="outline">
                            <MessageSquare className="w-3.5 h-3.5" />
                          </Button>
                        </Link>
                        <Button size="sm" variant="outline">
                          <Phone className="w-3.5 h-3.5" />
                        </Button>
                      </>
                    )}
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
