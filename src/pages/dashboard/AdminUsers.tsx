import { useState } from "react";
import { Search, CheckCircle, XCircle, Shield, User, MoreVertical } from "lucide-react";
import { toast } from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type RoleFilter = "all" | "customer" | "provider" | "admin";

const USERS = [
  { id: "u1", name: "Alex Johnson", email: "alex@example.com", role: "customer", status: "active", joinDate: "Aug 3, 2026", image: "https://i.pravatar.cc/150?u=a" },
  { id: "u2", name: "Michael Chen", email: "mchen@example.com", role: "provider", status: "active", joinDate: "Jul 28, 2026", image: "https://i.pravatar.cc/150?u=1" },
  { id: "u3", name: "Sarah Jenkins", email: "sjenkins@example.com", role: "provider", status: "pending", joinDate: "Aug 1, 2026", image: "https://i.pravatar.cc/150?u=2" },
  { id: "u4", name: "Elena Rodriguez", email: "erodriguez@example.com", role: "provider", status: "active", joinDate: "Jul 10, 2026", image: "https://i.pravatar.cc/150?u=4" },
  { id: "u5", name: "John Smith", email: "jsmith@example.com", role: "customer", status: "suspended", joinDate: "Jun 5, 2026", image: "https://i.pravatar.cc/150?u=30" },
  { id: "u6", name: "Emma Wilson", email: "ewilson@example.com", role: "customer", status: "active", joinDate: "Aug 4, 2026", image: "https://i.pravatar.cc/150?u=31" },
  { id: "u7", name: "Marcus Johnson", email: "mjohnson@example.com", role: "provider", status: "pending", joinDate: "Aug 5, 2026", image: "https://i.pravatar.cc/150?u=5" },
];

const STATUS_STYLES: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  suspended: "bg-red-100 text-red-700",
};

const ROLE_STYLES: Record<string, string> = {
  customer: "bg-blue-100 text-blue-700",
  provider: "bg-purple-100 text-purple-700",
  admin: "bg-orange-100 text-orange-700",
};

export function AdminUsers() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");

  const filtered = USERS.filter((u) => {
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">User Management</h1>
        <p className="text-muted-foreground">View, suspend, and manage all platform users.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="text-center p-4">
          <div className="text-2xl font-bold">{USERS.filter(u => u.role === "customer").length}</div>
          <div className="text-xs text-muted-foreground mt-1">Customers</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-purple-600">{USERS.filter(u => u.role === "provider").length}</div>
          <div className="text-xs text-muted-foreground mt-1">Providers</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-yellow-600">{USERS.filter(u => u.status === "pending").length}</div>
          <div className="text-xs text-muted-foreground mt-1">Pending Approval</div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search users..." className="pl-9 h-10" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-1 bg-muted p-1 rounded-lg border w-fit">
          {(["all", "customer", "provider", "admin"] as RoleFilter[]).map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize transition-all ${roleFilter === r ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="text-left font-medium px-4 py-3 text-muted-foreground">User</th>
                  <th className="text-left font-medium px-4 py-3 text-muted-foreground">Role</th>
                  <th className="text-left font-medium px-4 py-3 text-muted-foreground">Status</th>
                  <th className="text-left font-medium px-4 py-3 text-muted-foreground">Joined</th>
                  <th className="text-left font-medium px-4 py-3 text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => (
                  <tr key={user.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.image} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium leading-none">{user.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary" className={`capitalize ${ROLE_STYLES[user.role]}`}>
                        {user.role === "provider" ? <Shield className="w-2.5 h-2.5 mr-1" /> : <User className="w-2.5 h-2.5 mr-1" />}
                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary" className={`capitalize ${STATUS_STYLES[user.status]}`}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{user.joinDate}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {user.status === "pending" && (
                          <>
                            <Button size="sm" className="h-7 text-xs" onClick={() => toast.success(`${user.name} approved!`)}><CheckCircle className="w-3 h-3 mr-1" />Approve</Button>
                            <Button size="sm" variant="outline" className="h-7 text-xs text-destructive hover:bg-destructive/10" onClick={() => toast.error(`${user.name} rejected.`)}><XCircle className="w-3 h-3 mr-1" />Reject</Button>
                          </>
                        )}
                        {user.status === "active" && (
                          <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => toast.success(`${user.name} suspended.`)}>Suspend</Button>
                        )}
                        {user.status === "suspended" && (
                          <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => toast.success(`${user.name} reinstated!`)}>Reinstate</Button>
                        )}
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0"><MoreVertical className="w-3.5 h-3.5" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
