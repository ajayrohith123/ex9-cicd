import { DollarSign, TrendingUp, ArrowUpRight, ArrowDownLeft, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TRANSACTIONS = [
  { id: "t001", client: "Alice Johnson", service: "Water Heater Installation", date: "Aug 5, 2026", amount: 120, type: "credit" },
  { id: "t002", client: "John Smith", service: "Pipe Leak Repair", date: "Aug 3, 2026", amount: 90, type: "credit" },
  { id: "t003", client: "Jane Doe", service: "Toilet Installation", date: "Jul 28, 2026", amount: 110, type: "credit" },
  { id: "t004", client: "Robert Davis", service: "Faucet Replacement", date: "Jul 20, 2026", amount: 75, type: "credit" },
  { id: "t005", label: "Platform withdrawal", date: "Jul 18, 2026", amount: 300, type: "debit" },
  { id: "t006", client: "Emma Wilson", service: "Drain Unclogging", date: "Jul 10, 2026", amount: 60, type: "credit" },
];

const WEEKLY_EARNINGS = [
  { day: "Mon", amount: 90 },
  { day: "Tue", amount: 0 },
  { day: "Wed", amount: 120 },
  { day: "Thu", amount: 75 },
  { day: "Fri", amount: 110 },
  { day: "Sat", amount: 45 },
  { day: "Sun", amount: 0 },
];

const maxAmount = Math.max(...WEEKLY_EARNINGS.map((d) => d.amount));

export function ProviderEarnings() {
  const totalEarnings = TRANSACTIONS
    .filter((t) => t.type === "credit")
    .reduce((s, t) => s + t.amount, 0);
  const withdrawn = TRANSACTIONS
    .filter((t) => t.type === "debit")
    .reduce((s, t) => s + t.amount, 0);
  const available = totalEarnings - withdrawn;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">Earnings</h1>
        <p className="text-muted-foreground">Track your income and payment history.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalEarnings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">All time earnings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">${available.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Ready to withdraw</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$440</div>
            <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Weekly Bar Chart */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Weekly Earnings</CardTitle>
            <CardDescription>Your earnings breakdown for the current week.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-3 h-40">
              {WEEKLY_EARNINGS.map((day) => (
                <div key={day.day} className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-full flex items-end justify-center" style={{ height: "100px" }}>
                    <div
                      className="w-full rounded-t-md bg-primary/80 hover:bg-primary transition-colors"
                      style={{ height: maxAmount > 0 ? `${(day.amount / maxAmount) * 100}%` : "4px", minHeight: "4px" }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">{day.day}</span>
                  {day.amount > 0 && <span className="text-xs font-semibold">${day.amount}</span>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Withdraw */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Withdraw Funds</CardTitle>
            <CardDescription>Transfer your earnings to your bank.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 text-center">
              <div className="text-xs text-muted-foreground">Available</div>
              <div className="text-3xl font-bold text-primary mt-1">${available}</div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Bank Account</span>
                <span className="font-medium text-foreground">••••4523</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Processing time</span>
                <span className="font-medium text-foreground">1–3 business days</span>
              </div>
            </div>
            <button className="w-full h-10 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors">
              Withdraw ${available}
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>A log of all your payments and withdrawals.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {TRANSACTIONS.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${tx.type === "credit" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                    {tx.type === "credit" ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{tx.type === "credit" ? tx.service : (tx as { label?: string }).label}</p>
                    <p className="text-xs text-muted-foreground">{tx.type === "credit" ? `From ${tx.client}` : "Withdrawal"} · {tx.date}</p>
                  </div>
                </div>
                <div className={`font-semibold ${tx.type === "credit" ? "text-green-600" : "text-red-600"}`}>
                  {tx.type === "credit" ? "+" : "-"}${tx.amount}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
