import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Search, Star, MapPin, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const MOCK_FAVORITES = [
  { id: "1", name: "Michael Chen", category: "Plumbing", rating: 4.9, reviews: 124, price: 45, distance: "1.2 miles", image: "https://i.pravatar.cc/150?u=1", verified: true },
  { id: "2", name: "Sarah Jenkins", category: "Electrical", rating: 5.0, reviews: 89, price: 55, distance: "2.4 miles", image: "https://i.pravatar.cc/150?u=2", verified: true },
  { id: "4", name: "Elena Rodriguez", category: "Painting", rating: 4.9, reviews: 67, price: 40, distance: "3.1 miles", image: "https://i.pravatar.cc/150?u=4", verified: true },
];

export function CustomerFavorites() {
  const [favorites, setFavorites] = useState(MOCK_FAVORITES);
  const [search, setSearch] = useState("");

  const filtered = favorites.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">Saved Providers</h1>
        <p className="text-muted-foreground">Professionals you've saved for quick booking.</p>
      </div>

      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search favorites..."
          className="pl-9 h-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <Heart className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium">No saved providers</p>
          <p className="text-sm mt-1 mb-6">Browse services and save your favourite professionals.</p>
          <Link to="/search">
            <Button>Find Professionals</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((provider) => (
            <Card key={provider.id} className="overflow-hidden hover:shadow-soft transition-all group">
              <div className="h-24 bg-gradient-to-r from-primary/20 to-secondary/20" />
              <CardContent className="relative pt-0 px-5 pb-5 text-center">
                <div className="mx-auto w-16 h-16 rounded-full border-4 border-card -mt-8 overflow-hidden mb-3 bg-muted">
                  <img src={provider.image} alt={provider.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center justify-center gap-1 mb-0.5">
                  <h3 className="font-bold">{provider.name}</h3>
                  {provider.verified && (
                    <Badge className="ml-1 text-[10px] px-1.5 py-0 bg-primary/10 text-primary hover:bg-primary/20">✓</Badge>
                  )}
                </div>
                <p className="text-sm text-primary font-medium mb-1">{provider.category}</p>
                <div className="flex justify-center items-center gap-1 text-xs text-muted-foreground mb-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-foreground">{provider.rating}</span>
                  <span>({provider.reviews})</span>
                </div>
                <div className="flex justify-center items-center gap-1 text-xs text-muted-foreground mb-4">
                  <MapPin className="w-3 h-3" /> {provider.distance}
                </div>
                <div className="flex gap-2">
                  <Link to={`/book/${provider.id}`} className="flex-1">
                    <Button size="sm" className="w-full">Book — ${provider.price}/hr</Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive hover:bg-destructive/10 hover:border-destructive"
                    onClick={() => removeFavorite(provider.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
