import { Star, ThumbsUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MY_REVIEWS = [
  {
    id: 1,
    provider: "Michael Chen",
    providerImage: "https://i.pravatar.cc/150?u=1",
    service: "Pipe Leak Repair",
    date: "Oct 18, 2026",
    rating: 5,
    text: "Michael was fantastic. Arrived on time, fixed the leak quickly, and left the area spotless. Highly recommended!",
    helpful: 4,
  },
  {
    id: 2,
    provider: "Elena Rodriguez",
    providerImage: "https://i.pravatar.cc/150?u=4",
    service: "Living Room Painting",
    date: "Oct 10, 2026",
    rating: 5,
    text: "Elena did an amazing job with our living room. The paint lines are perfect and she finished ahead of schedule.",
    helpful: 2,
  },
  {
    id: 3,
    provider: "David Smith",
    providerImage: "https://i.pravatar.cc/150?u=3",
    service: "Home Deep Cleaning",
    date: "Sep 30, 2026",
    rating: 4,
    text: "Great cleaning service. Very thorough and professional. Would book again.",
    helpful: 1,
  },
];

export function CustomerReviews() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">My Reviews</h1>
        <p className="text-muted-foreground">Reviews you've written for service providers.</p>
      </div>

      <div className="grid grid-cols-3 gap-4 max-w-sm">
        <Card className="col-span-1 text-center p-4">
          <div className="text-3xl font-bold text-primary">{MY_REVIEWS.length}</div>
          <div className="text-xs text-muted-foreground mt-1">Reviews Written</div>
        </Card>
        <Card className="col-span-1 text-center p-4">
          <div className="text-3xl font-bold text-yellow-500">
            {(MY_REVIEWS.reduce((s, r) => s + r.rating, 0) / MY_REVIEWS.length).toFixed(1)}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Avg Rating Given</div>
        </Card>
        <Card className="col-span-1 text-center p-4">
          <div className="text-3xl font-bold text-primary">
            {MY_REVIEWS.reduce((s, r) => s + r.helpful, 0)}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Helpful Votes</div>
        </Card>
      </div>

      <div className="space-y-4">
        {MY_REVIEWS.map((review) => (
          <Card key={review.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={review.providerImage} />
                    <AvatarFallback>{review.provider[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{review.provider}</CardTitle>
                    <CardDescription>{review.service}</CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex text-yellow-400 justify-end mb-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-current" : "text-muted"}`} />
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground">{review.date}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <p className="text-sm text-muted-foreground">{review.text}</p>
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{review.helpful} people found this helpful</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" className="h-7 text-xs">Edit</Button>
                  <Button size="sm" variant="ghost" className="h-7 text-xs text-destructive hover:text-destructive">Delete</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
