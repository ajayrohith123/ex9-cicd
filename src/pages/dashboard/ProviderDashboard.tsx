import { DollarSign, Star, CheckCircle, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ProviderDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Provider Overview</h1>
        <p className="text-muted-foreground">Manage your services, track earnings, and view upcoming appointments.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,231.89</div>
            <p className="text-xs text-muted-foreground mt-1">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Jobs</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145</div>
            <p className="text-xs text-muted-foreground mt-1">+12 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.9</div>
            <p className="text-xs text-muted-foreground mt-1">Based on 124 reviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground mt-1">Action required</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>You have 3 appointments today.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: "09:00 AM", task: "Pipe Leak Repair", client: "John Smith", status: "Completed" },
                { time: "01:30 PM", task: "Water Heater Installation", client: "Alice Johnson", status: "In Progress" },
                { time: "04:00 PM", task: "Faucet Replacement", client: "Robert Davis", status: "Upcoming" },
              ].map((job, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex gap-4 items-center">
                    <div className="w-16 text-center">
                      <div className="text-sm font-bold">{job.time.split(' ')[0]}</div>
                      <div className="text-xs text-muted-foreground">{job.time.split(' ')[1]}</div>
                    </div>
                    <div className="w-px h-10 bg-border"></div>
                    <div>
                      <p className="font-semibold">{job.task}</p>
                      <p className="text-sm text-muted-foreground">{job.client}</p>
                    </div>
                  </div>
                  <Badge
                    className={
                      job.status === "Completed"
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : job.status === "In Progress"
                        ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                        : "bg-muted text-muted-foreground"
                    }
                    variant="secondary"
                  >
                    {job.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Job Requests</CardTitle>
            <CardDescription>Review and accept new bookings.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { task: "Emergency Leak", client: "Emma Wilson", time: "Tomorrow, 10:00 AM", amount: "$85" },
                { task: "Drain Unclogging", client: "Tom Harris", time: "Oct 25, 2:00 PM", amount: "$60" },
              ].map((req, i) => (
                <div key={i} className="p-4 border rounded-lg space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{req.task}</p>
                      <p className="text-sm text-muted-foreground">{req.client}</p>
                    </div>
                    <div className="font-bold text-primary">{req.amount}</div>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-1" /> {req.time}
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1" size="sm">Accept</Button>
                    <Button variant="outline" className="flex-1" size="sm">Decline</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
