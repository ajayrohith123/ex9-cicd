import { useState } from "react";
import { Shield, Bell, Globe, DollarSign, Percent, Trash2, Save } from "lucide-react";
import { toast } from "react-hot-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Toggle({ defaultChecked, label }: { defaultChecked: boolean; label: string }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-0">
      <span className="text-sm font-medium">{label}</span>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => setChecked(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? "bg-primary" : "bg-muted-foreground/30"}`}
      >
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`} />
      </button>
    </div>
  );
}

export function AdminSettings() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">Platform Settings</h1>
        <p className="text-muted-foreground">Configure global platform behaviour and policies.</p>
      </div>

      {/* General */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Globe className="w-4 h-4" /> General</CardTitle>
          <CardDescription>Basic platform configuration.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Platform Name</label>
            <Input defaultValue="ServeLocal" className="h-10" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Support Email</label>
            <Input defaultValue="support@servelocal.com" type="email" className="h-10" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Default Language</label>
            <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              <option>English (US)</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
          <Button className="h-10 gap-2" onClick={() => toast.success("General settings saved!")}>
            <Save className="w-4 h-4" /> Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Fees */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><DollarSign className="w-4 h-4" /> Fees & Commissions</CardTitle>
          <CardDescription>Set platform commission and payout rules.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Platform Fee (%)</label>
              <div className="relative">
                <Input type="number" defaultValue="10" min="0" max="50" className="h-10 pr-8" />
                <Percent className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Min. Booking Amount ($)</label>
              <Input type="number" defaultValue="20" min="0" className="h-10" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Payout Schedule</label>
              <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option>Instant</option>
                <option>Daily</option>
                <option>Weekly</option>
                <option>Bi-weekly</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Cancellation Window (hrs)</label>
              <Input type="number" defaultValue="24" min="0" className="h-10" />
            </div>
          </div>
          <Button className="h-10 gap-2" onClick={() => toast.success("Fee settings saved!")}>
            <Save className="w-4 h-4" /> Save Fee Settings
          </Button>
        </CardContent>
      </Card>

      {/* Provider Verification */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Shield className="w-4 h-4" /> Provider Verification</CardTitle>
          <CardDescription>Control verification requirements for providers.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-1">
          <Toggle defaultChecked={true} label="Require government ID verification" />
          <Toggle defaultChecked={true} label="Require background check" />
          <Toggle defaultChecked={false} label="Require skill certification" />
          <Toggle defaultChecked={true} label="Manual approval for new providers" />
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bell className="w-4 h-4" /> System Notifications</CardTitle>
          <CardDescription>Configure platform-wide notification behaviour.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-1">
          <Toggle defaultChecked={true} label="Email notifications to users" />
          <Toggle defaultChecked={false} label="SMS notifications to users" />
          <Toggle defaultChecked={true} label="Send weekly reports to admins" />
          <Toggle defaultChecked={true} label="Alert on suspicious activity" />
        </CardContent>
      </Card>

      {/* Maintenance */}
      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2"><Trash2 className="w-4 h-4" /> Maintenance</CardTitle>
          <CardDescription>Dangerous platform-level operations.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border border-destructive/20 rounded-lg bg-destructive/5">
            <div>
              <p className="font-semibold text-sm">Enable Maintenance Mode</p>
              <p className="text-xs text-muted-foreground">Temporarily takes the platform offline for all users.</p>
            </div>
            <Button variant="outline" size="sm" className="border-destructive/50 text-destructive hover:bg-destructive/10" onClick={() => toast.error("Maintenance mode disabled in demo.")}>
              Enable Maintenance
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border border-destructive/20 rounded-lg bg-destructive/5">
            <div>
              <p className="font-semibold text-sm">Clear Cache</p>
              <p className="text-xs text-muted-foreground">Flush all cached data across the platform.</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => toast.success("Cache cleared successfully.")}>
              Clear Cache
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
