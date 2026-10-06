import { useState } from "react";
import { Bell, Shield, Globe, Trash2, Moon, Clock, DollarSign } from "lucide-react";
import { toast } from "react-hot-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Toggle({ defaultChecked }: { defaultChecked: boolean }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => setChecked(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${checked ? "bg-primary" : "bg-muted-foreground/30"}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}

const NOTIFICATION_PREFS = [
  { id: "new_booking", label: "New Booking Requests", desc: "Get notified when a client requests your service.", defaultOn: true },
  { id: "cancellation", label: "Cancellations", desc: "Alert when a client cancels a booking.", defaultOn: true },
  { id: "messages", label: "New Messages", desc: "When clients send you a message.", defaultOn: true },
  { id: "reviews", label: "New Reviews", desc: "When a client leaves you a review.", defaultOn: true },
  { id: "promotions", label: "Platform News", desc: "Updates about new features and tips.", defaultOn: false },
];

export function ProviderSettings() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">Settings</h1>
        <p className="text-muted-foreground">Manage your provider account and notification preferences.</p>
      </div>

      {/* Availability */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Clock className="w-4 h-4" /> Availability</CardTitle>
          <CardDescription>Control when clients can book your services.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Accept New Bookings</p>
              <p className="text-xs text-muted-foreground">Turn off to pause all new booking requests.</p>
            </div>
            <Toggle defaultChecked={true} />
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Available From</label>
              <Input type="time" defaultValue="08:00" className="h-10" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Available Until</label>
              <Input type="time" defaultValue="18:00" className="h-10" />
            </div>
          </div>
          <Button className="h-10" onClick={() => toast.success("Availability saved!")}>Save Hours</Button>
        </CardContent>
      </Card>

      {/* Pricing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><DollarSign className="w-4 h-4" /> Pricing</CardTitle>
          <CardDescription>Set your hourly rate and minimum booking duration.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Hourly Rate ($)</label>
              <Input type="number" defaultValue="45" className="h-10" min="1" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Minimum Hours</label>
              <Input type="number" defaultValue="1" className="h-10" min="1" />
            </div>
          </div>
          <Button className="h-10" onClick={() => toast.success("Pricing updated!")}>Save Pricing</Button>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Moon className="w-4 h-4" /> Appearance</CardTitle>
          <CardDescription>Customize your dashboard theme.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-sm">Dark Mode</p>
              <p className="text-xs text-muted-foreground">Switch between light and dark theme.</p>
            </div>
            <Toggle defaultChecked={false} />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bell className="w-4 h-4" /> Notifications</CardTitle>
          <CardDescription>Choose what alerts you receive.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-1">
          {NOTIFICATION_PREFS.map((pref) => (
            <div key={pref.id} className="flex items-center justify-between py-3 border-b last:border-0">
              <div>
                <p className="font-medium text-sm">{pref.label}</p>
                <p className="text-xs text-muted-foreground">{pref.desc}</p>
              </div>
              <Toggle defaultChecked={pref.defaultOn} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Language */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Globe className="w-4 h-4" /> Language & Region</CardTitle>
          <CardDescription>Set your preferred language and timezone.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Language</label>
              <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring">
                <option>English (US)</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Timezone</label>
              <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring">
                <option>UTC-5 (Eastern)</option>
                <option>UTC-6 (Central)</option>
                <option>UTC+5:30 (India)</option>
              </select>
            </div>
          </div>
          <Button className="h-10" onClick={() => toast.success("Preferences saved!")}>Save Preferences</Button>
        </CardContent>
      </Card>

      {/* Danger */}
      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2"><Trash2 className="w-4 h-4" /> Danger Zone</CardTitle>
          <CardDescription>Irreversible account actions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border border-destructive/20 rounded-lg bg-destructive/5">
            <div>
              <p className="font-semibold text-sm">Deactivate Provider Account</p>
              <p className="text-xs text-muted-foreground">Pause your listings and hide your profile from search.</p>
            </div>
            <Button variant="outline" size="sm" className="border-destructive/50 text-destructive hover:bg-destructive/10" onClick={() => toast.error("Account deactivation disabled in demo mode.")}>
              Deactivate
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
