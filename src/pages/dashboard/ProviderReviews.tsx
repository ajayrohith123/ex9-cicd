import { Star, ThumbsUp, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const REVIEWS = [
  { id: 1, author: "Sarah W.", authorImage: "https://i.pravatar.cc/150?u=20", rating: 5, date: "2 weeks ago", service: "Pipe Leak Repair", text: "Michael was fantastic. He arrived on time, quickly identified the problem with my sink, and had it fixed within an hour. Very professional and clean.", helpful: 4 },
  { id: 2, author: "James D.", authorImage: "https://i.pravatar.cc/150?u=21", rating: 5, date: "1 month ago", service: "Emergency Pipe Burst", text: "Excellent service! We had a pipe burst in the middle of the night, and Michael responded immediately. Saved our house from water damage.", helpful: 7 },
  { id: 3, author: "Emily R.", authorImage: "https://i.pravatar.cc/150?u=22", rating: 4, date: "2 months ago", service: "Faucet Replacement", text: "Good work, slightly more expensive than others but the quality of the repair justifies the price.", helpful: 2 },
  { id: 4, author: "Tom H.", authorImage: "https://i.pravatar.cc/150?u=23", rating: 5, date: "3 months ago", service: "Water Heater Installation", text: "Top notch! Water heater works perfectly. Michael explained everything clearly and finished quickly.", helpful: 5 },
];

const RATING_BREAKDOWN = [
  { stars: 5, count: 105 },
  { stars: 4, count: 14 },
  { stars: 3, count: 3 },
  { stars: 2, count: 2 },
  { stars: 1, count: 0 },
];
const totalReviews = RATING_BREAKDOWN.reduce((s, r) => s + r.count, 0);
const avgRating = RATING_BREAKDOWN.reduce((s, r) => s + r.stars * r.count, 0) / totalReviews;

export function ProviderReviews() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">Reviews</h1>
        <p className="text-muted-foreground">See what customers are saying about your services.</p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="text-center p-6">
          <div className="text-5xl font-bold text-primary mb-1">{avgRating.toFixed(1)}</div>
          <div className="flex justify-center text-yellow-400 mb-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < Math.round(avgRating) ? "fill-current" : "text-muted"}`} />
            ))}
          </div>
          <div className="text-sm text-muted-foreground">{totalReviews} total reviews</div>
        </Card>
        <Card className="col-span-2 p-6">
          <div className="space-y-2">
            {RATING_BREAKDOWN.map((r) => (
              <div key={r.stars} className="flex items-center gap-3 text-sm">
                <div className="w-4 text-right text-muted-foreground">{r.stars}</div>
                <Star className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full"
                    style={{ width: totalReviews > 0 ? `${(r.count / totalReviews) * 100}%` : "0%" }}
                  />
                </div>
                <span className="text-muted-foreground w-8 text-right">{r.count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Tips */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="flex items-start gap-3 p-4">
          <TrendingUp className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm text-primary">Boost your visibility</p>
            <p className="text-sm text-muted-foreground mt-0.5">
              Providers with a 4.8+ rating appear first in search results. Respond to clients promptly to improve your score.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Review list */}
      <div className="space-y-4">
        <CardHeader className="px-0 pt-0">
          <CardTitle>Recent Reviews</CardTitle>
          <CardDescription>Latest feedback from your customers.</CardDescription>
        </CardHeader>
        {REVIEWS.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={review.authorImage} />
                    <AvatarFallback>{review.author[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">{review.author}</p>
                    <p className="text-xs text-muted-foreground">{review.service} · {review.date}</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 flex-shrink-0">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-current" : "text-muted"}`} />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{review.text}</p>
              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{review.helpful} found helpful</span>
                </div>
                <Button size="sm" variant="ghost" className="h-7 text-xs">Reply</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
