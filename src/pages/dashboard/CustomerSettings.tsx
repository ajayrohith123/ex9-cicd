import { useState } from "react";
import { Bell, Shield, Globe, Trash2, Moon } from "lucide-react";
import { toast } from "react-hot-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const NOTIFICATION_PREFS = [
  { id: "booking_confirm", label: "Booking Confirmations", desc: "When a provider accepts or declines your request.", defaultOn: true },
  { id: "booking_remind", label: "Service Reminders", desc: "Reminders 24 hours before your appointment.", defaultOn: true },
  { id: "messages", label: "New Messages", desc: "When you receive a message from a provider.", defaultOn: true },
  { id: "promotions", label: "Promotional Offers", desc: "Deals and discounts from ServeLocal.", defaultOn: false },
  { id: "news", label: "Platform Updates", desc: "News about new features and improvements.", defaultOn: false },
];

const PRIVACY_SETTINGS = [
  { id: "show_profile", label: "Public Profile", desc: "Allow providers to view your profile details." },
  { id: "location", label: "Share Location", desc: "Share your general location for better matches." },
  { id: "activity", label: "Activity Status", desc: "Show when you were last active." },
];

function Toggle({ defaultChecked, onChange }: { defaultChecked: boolean; onChange?: (val: boolean) => void }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => { setChecked(!checked); onChange?.(!checked); }}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${checked ? "bg-primary" : "bg-muted-foreground/30"}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}

export function CustomerSettings() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">Settings</h1>
        <p className="text-muted-foreground">Manage your notification preferences and account settings.</p>
      </div>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Moon className="w-4 h-4" /> Appearance</CardTitle>
          <CardDescription>Customize the look of your dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-sm">Dark Mode</p>
              <p className="text-xs text-muted-foreground">Switch between light and dark theme.</p>
            </div>
            <Toggle defaultChecked={false} onChange={() => toast.success("Theme toggle coming soon!")} />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bell className="w-4 h-4" /> Notifications</CardTitle>
          <CardDescription>Choose what you want to be notified about.</CardDescription>
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

      {/* Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Shield className="w-4 h-4" /> Privacy</CardTitle>
          <CardDescription>Control your data and profile visibility.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-1">
          {PRIVACY_SETTINGS.map((setting) => (
            <div key={setting.id} className="flex items-center justify-between py-3 border-b last:border-0">
              <div>
                <p className="font-medium text-sm">{setting.label}</p>
                <p className="text-xs text-muted-foreground">{setting.desc}</p>
              </div>
              <Toggle defaultChecked={true} />
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
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Language</label>
              <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring">
                <option>English (US)</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Timezone</label>
              <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring">
                <option>UTC-5 (Eastern Time)</option>
                <option>UTC-6 (Central Time)</option>
                <option>UTC-7 (Mountain Time)</option>
                <option>UTC-8 (Pacific Time)</option>
                <option>UTC+5:30 (India)</option>
              </select>
            </div>
          </div>
          <Button className="mt-4 h-10" onClick={() => toast.success("Preferences saved!")}>Save Preferences</Button>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2"><Trash2 className="w-4 h-4" /> Danger Zone</CardTitle>
          <CardDescription>These actions are irreversible.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border border-destructive/20 rounded-lg bg-destructive/5">
            <div>
              <p className="font-semibold text-sm">Delete Account</p>
              <p className="text-xs text-muted-foreground">Permanently delete your account and all data.</p>
            </div>
            <Button variant="destructive" size="sm" onClick={() => toast.error("Account deletion disabled in demo mode.")}>
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
