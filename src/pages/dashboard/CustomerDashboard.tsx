import { CalendarClock, CheckCircle, MessageSquare, Bell, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const UPCOMING_BOOKINGS = [
  { id: 1, provider: "Michael Chen", service: "Plumbing repair", date: "Tomorrow, 10:00 AM", status: "Confirmed" },
  { id: 2, provider: "Sarah Jenkins", service: "Electrical inspection", date: "Oct 24, 2:00 PM", status: "Pending" },
];

export function CustomerDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back, Alex</h1>
        <p className="text-muted-foreground">Here is what's happening with your services.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Bookings</CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground mt-1">Next: Tomorrow at 10 AM</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Services</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-muted-foreground mt-1">+3 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-1">From 2 providers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground mt-1">2 require action</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Upcoming Bookings</CardTitle>
            <CardDescription>Your scheduled services for the next 7 days.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {UPCOMING_BOOKINGS.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex gap-4 items-center">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <CalendarClock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">{booking.service}</p>
                      <p className="text-sm text-muted-foreground">with {booking.provider}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{booking.date}</div>
                    <div className={`text-xs font-semibold mt-1 ${booking.status === 'Confirmed' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {booking.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4" asChild>
              <Link to="/dashboard/customer/bookings">
                View all bookings <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest interactions on ServeLocal.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-0.5 w-2 h-2 rounded-full bg-primary ring-4 ring-primary/20 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium leading-none">Booking Confirmed</p>
                  <p className="text-sm text-muted-foreground mt-1">Michael Chen confirmed your plumbing repair request.</p>
                  <span className="text-xs text-muted-foreground mt-1 block">2 hours ago</span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-0.5 w-2 h-2 rounded-full bg-secondary ring-4 ring-secondary/20 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium leading-none">Review Published</p>
                  <p className="text-sm text-muted-foreground mt-1">Your 5-star review for Elena Rodriguez is live.</p>
                  <span className="text-xs text-muted-foreground mt-1 block">Yesterday</span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-0.5 w-2 h-2 rounded-full bg-muted-foreground ring-4 ring-muted flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium leading-none">Payment Processed</p>
                  <p className="text-sm text-muted-foreground mt-1">Payment of $120.00 for Home Cleaning was successful.</p>
                  <span className="text-xs text-muted-foreground mt-1 block">Oct 18</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
