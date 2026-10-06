import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  MapPin, Search as SearchIcon, SlidersHorizontal, List,
  Map as MapIcon, Star, Heart, CheckCircle2, X, Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

const MOCK_PROVIDERS = [
  { id: "1", name: "Michael Chen",    category: "Plumbing",         experience: "8 years",  rating: 4.9, reviews: 124, price: 45, distanceNum: 1.2, distance: "1.2 miles", lat: 40.7128, lng: -74.0060, image: "https://i.pravatar.cc/150?u=1", verified: true },
  { id: "2", name: "Sarah Jenkins",   category: "Electrical",       experience: "12 years", rating: 5.0, reviews: 89,  price: 55, distanceNum: 2.4, distance: "2.4 miles", lat: 40.7200, lng: -73.9900, image: "https://i.pravatar.cc/150?u=2", verified: true },
  { id: "3", name: "David Smith",     category: "Cleaning",         experience: "3 years",  rating: 4.8, reviews: 215, price: 30, distanceNum: 0.8, distance: "0.8 miles", lat: 40.7300, lng: -74.0100, image: "https://i.pravatar.cc/150?u=3", verified: false },
  { id: "4", name: "Elena Rodriguez", category: "Painting",         experience: "15 years", rating: 4.9, reviews: 67,  price: 40, distanceNum: 3.1, distance: "3.1 miles", lat: 40.7150, lng: -74.0150, image: "https://i.pravatar.cc/150?u=4", verified: true },
  { id: "5", name: "Marcus Johnson",  category: "Carpentry",        experience: "10 years", rating: 4.7, reviews: 42,  price: 50, distanceNum: 1.5, distance: "1.5 miles", lat: 40.7000, lng: -74.0200, image: "https://i.pravatar.cc/150?u=5", verified: true },
  { id: "6", name: "Linda Park",      category: "Cleaning",         experience: "5 years",  rating: 4.6, reviews: 98,  price: 28, distanceNum: 0.5, distance: "0.5 miles", lat: 40.7350, lng: -74.0050, image: "https://i.pravatar.cc/150?u=6", verified: false },
  { id: "7", name: "Ahmed Hassan",    category: "Appliance Repair", experience: "7 years",  rating: 4.8, reviews: 56,  price: 60, distanceNum: 4.2, distance: "4.2 miles", lat: 40.7050, lng: -74.0300, image: "https://i.pravatar.cc/150?u=7", verified: true },
  { id: "8", name: "Priya Sharma",    category: "Electrical",       experience: "9 years",  rating: 4.5, reviews: 73,  price: 50, distanceNum: 6.1, distance: "6.1 miles", lat: 40.7250, lng: -73.9800, image: "https://i.pravatar.cc/150?u=8", verified: true },
];

const CATEGORIES = ["Plumbing", "Electrical", "Cleaning", "Painting", "Carpentry", "Appliance Repair"];

type SortOption = "recommended" | "rating" | "price_low" | "price_high" | "distance";

export function Search() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "";

  // Filter state — all controlled
  const [query, setQuery]                   = useState(initialQuery);
  const [location, setLocation]             = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    initialCategory ? new Set([initialCategory]) : new Set()
  );
  const [minPrice, setMinPrice]             = useState("");
  const [maxPrice, setMaxPrice]             = useState("");
  const [maxDistance, setMaxDistance]       = useState("20");
  const [minRating, setMinRating]           = useState("0");
  const [sortBy, setSortBy]                 = useState<SortOption>("recommended");
  const [viewMode, setViewMode]             = useState<"list" | "map">("list");
  const [favorites, setFavorites]           = useState<Set<string>>(new Set());

  const toggleFavorite = (id: string) => {
    const next = new Set(favorites);
    next.has(id) ? next.delete(id) : next.add(id);
    setFavorites(next);
  };

  const toggleCategory = (cat: string) => {
    const next = new Set(selectedCategories);
    next.has(cat) ? next.delete(cat) : next.add(cat);
    setSelectedCategories(next);
  };

  const clearAllFilters = () => {
    setQuery("");
    setLocation("");
    setSelectedCategories(new Set());
    setMinPrice("");
    setMaxPrice("");
    setMaxDistance("20");
    setMinRating("0");
    setSortBy("recommended");
  };

  const hasActiveFilters =
    query ||
    selectedCategories.size > 0 ||
    minPrice ||
    maxPrice ||
    maxDistance !== "20" ||
    minRating !== "0";

  // Filter + sort logic
  const filteredProviders = useMemo(() => {
    let results = MOCK_PROVIDERS.filter((p) => {
      // Text query
      if (query) {
        const q = query.toLowerCase();
        const matches =
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.experience.toLowerCase().includes(q);
        if (!matches) return false;
      }
      // Categories
      if (selectedCategories.size > 0 && !selectedCategories.has(p.category)) return false;
      // Price
      if (minPrice && p.price < Number(minPrice)) return false;
      if (maxPrice && p.price > Number(maxPrice)) return false;
      // Distance
      if (maxDistance && p.distanceNum > Number(maxDistance)) return false;
      // Rating
      if (minRating && p.rating < Number(minRating)) return false;
      return true;
    });

    // Sort
    switch (sortBy) {
      case "rating":
        results = [...results].sort((a, b) => b.rating - a.rating);
        break;
      case "price_low":
        results = [...results].sort((a, b) => a.price - b.price);
        break;
      case "price_high":
        results = [...results].sort((a, b) => b.price - a.price);
        break;
      case "distance":
        results = [...results].sort((a, b) => a.distanceNum - b.distanceNum);
        break;
      default:
        // recommended: verified first, then by rating
        results = [...results].sort((a, b) => {
          if (a.verified !== b.verified) return a.verified ? -1 : 1;
          return b.rating - a.rating;
        });
    }

    return results;
  }, [query, selectedCategories, minPrice, maxPrice, maxDistance, minRating, sortBy]);

  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCategories.has(cat)}
                onChange={() => toggleCategory(cat)}
                className="rounded border-input text-primary focus:ring-primary h-4 w-4 cursor-pointer"
              />
              <span className="text-sm group-hover:text-primary transition-colors">{cat}</span>
              <span className="ml-auto text-xs text-muted-foreground">
                ({MOCK_PROVIDERS.filter((p) => p.category === cat).length})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3">Price Range ($/hr)</h3>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="h-9"
            min="0"
          />
          <span className="text-muted-foreground">–</span>
          <Input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="h-9"
            min="0"
          />
        </div>
      </div>

      {/* Distance */}
      <div>
        <h3 className="font-semibold mb-3">Max Distance</h3>
        <Select value={maxDistance} onValueChange={setMaxDistance}>
          <SelectTrigger className="w-full h-9">
            <SelectValue placeholder="Select distance" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2">Within 2 miles</SelectItem>
            <SelectItem value="5">Within 5 miles</SelectItem>
            <SelectItem value="10">Within 10 miles</SelectItem>
            <SelectItem value="20">Within 20 miles</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Minimum Rating */}
      <div>
        <h3 className="font-semibold mb-3">Minimum Rating</h3>
        <Select value={minRating} onValueChange={setMinRating}>
          <SelectTrigger className="w-full h-9">
            <SelectValue placeholder="Select rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Any rating</SelectItem>
            <SelectItem value="3">3.0 &amp; up</SelectItem>
            <SelectItem value="4">4.0 &amp; up</SelectItem>
            <SelectItem value="4.5">4.5 &amp; up</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <Button variant="outline" className="w-full" onClick={clearAllFilters}>
          <X className="w-4 h-4 mr-2" /> Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-background">
      {/* Search Header */}
      <div className="bg-card border-b sticky top-16 z-30 shadow-sm">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="What service do you need?"
                  className="pl-9 h-10 w-full"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, neighborhood, or zip"
                  className="pl-9 h-10 w-full"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Mobile filter sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden flex-1 relative">
                    <Filter className="mr-2 h-4 w-4" /> Filters
                    {hasActiveFilters && (
                      <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                        {selectedCategories.size + (minPrice ? 1 : 0) + (maxPrice ? 1 : 0) + (maxDistance !== "20" ? 1 : 0) + (minRating !== "0" ? 1 : 0)}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader className="mb-6">
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <FiltersContent />
                </SheetContent>
              </Sheet>

              {/* Sort */}
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                <SelectTrigger className="w-full md:w-[180px] h-10">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price_low">Price: Low to High</SelectItem>
                  <SelectItem value="price_high">Price: High to Low</SelectItem>
                  <SelectItem value="distance">Nearest First</SelectItem>
                </SelectContent>
              </Select>

              {/* List / Map toggle */}
              <div className="hidden sm:flex bg-muted rounded-lg p-1 border">
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="sm"
                  className="px-3"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "map" ? "secondary" : "ghost"}
                  size="sm"
                  className="px-3"
                  onClick={() => setViewMode("map")}
                >
                  <MapIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Active filter chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mt-3">
              {query && (
                <Badge variant="secondary" className="gap-1">
                  "{query}"
                  <button onClick={() => setQuery("")}><X className="w-3 h-3" /></button>
                </Badge>
              )}
              {Array.from(selectedCategories).map((cat) => (
                <Badge key={cat} variant="secondary" className="gap-1">
                  {cat}
                  <button onClick={() => toggleCategory(cat)}><X className="w-3 h-3" /></button>
                </Badge>
              ))}
              {(minPrice || maxPrice) && (
                <Badge variant="secondary" className="gap-1">
                  ${minPrice || "0"}–${maxPrice || "∞"}/hr
                  <button onClick={() => { setMinPrice(""); setMaxPrice(""); }}><X className="w-3 h-3" /></button>
                </Badge>
              )}
              {maxDistance !== "20" && (
                <Badge variant="secondary" className="gap-1">
                  Within {maxDistance} miles
                  <button onClick={() => setMaxDistance("20")}><X className="w-3 h-3" /></button>
                </Badge>
              )}
              {minRating !== "0" && (
                <Badge variant="secondary" className="gap-1">
                  {minRating}★ &amp; up
                  <button onClick={() => setMinRating("0")}><X className="w-3 h-3" /></button>
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 container mx-auto px-4 py-6 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-6 h-full">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-64 flex-shrink-0 sticky top-40 h-[calc(100vh-10rem)] overflow-y-auto pr-4">
          <FiltersContent />
        </aside>

        {/* Results */}
        <div className="flex-1 flex flex-col h-full">
          <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground font-medium">
            <span>
              Showing <span className="text-foreground font-semibold">{filteredProviders.length}</span> of {MOCK_PROVIDERS.length} professionals
              {location && <> near <span className="text-foreground font-semibold">"{location}"</span></>}
            </span>
          </div>

          {filteredProviders.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2">No results found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your filters or searching for a different service.</p>
              <Button onClick={clearAllFilters} variant="outline">Clear All Filters</Button>
            </div>
          ) : viewMode === "list" ? (
            <div className="space-y-4">
              {filteredProviders.map((provider) => (
                <Card key={provider.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-0 sm:flex">
                    <div className="sm:w-48 h-48 sm:h-auto bg-muted relative flex-shrink-0">
                      <img src={provider.image} alt={provider.name} className="w-full h-full object-cover" />
                      {provider.verified && (
                        <div className="absolute top-2 left-2 bg-background/90 backdrop-blur-sm text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                          <CheckCircle2 className="w-3 h-3 text-primary" /> Verified
                        </div>
                      )}
                      <button
                        onClick={() => toggleFavorite(provider.id)}
                        className="absolute top-2 right-2 p-2 bg-background/50 hover:bg-background/80 backdrop-blur-sm rounded-full transition-colors"
                        aria-label={favorites.has(provider.id) ? "Remove from favorites" : "Add to favorites"}
                      >
                        <Heart className={`w-4 h-4 transition-colors ${favorites.has(provider.id) ? "fill-red-500 text-red-500" : "text-foreground"}`} />
                      </button>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <Link to={`/provider/${provider.id}`} className="hover:underline">
                            <h3 className="font-bold text-xl text-foreground">{provider.name}</h3>
                          </Link>
                          <div className="text-sm font-medium text-primary mb-1">{provider.category}</div>
                          <div className="text-sm text-muted-foreground">{provider.experience} experience · {provider.distance}</div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-4">
                          <div className="font-bold text-xl text-foreground">${provider.price}<span className="text-sm font-normal text-muted-foreground">/hr</span></div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 mb-4 mt-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-sm">{provider.rating}</span>
                        <span className="text-sm text-muted-foreground">({provider.reviews} reviews)</span>
                      </div>

                      <div className="mt-auto flex gap-3 pt-4 border-t">
                        <Link to={`/provider/${provider.id}`} className="flex-1">
                          <Button variant="outline" className="w-full">View Profile</Button>
                        </Link>
                        <Link to={`/book/${provider.id}`} className="flex-1">
                          <Button className="w-full">Book Now</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex-1 rounded-xl overflow-hidden border shadow-sm relative min-h-[500px]">
              <MapContainer center={[40.7128, -74.0060]} zoom={12} scrollWheelZoom={false} className="w-full h-full absolute inset-0">
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {filteredProviders.map((provider) => (
                  <Marker key={provider.id} position={[provider.lat, provider.lng]}>
                    <Popup>
                      <div className="flex items-center gap-3">
                        <img src={provider.image} alt={provider.name} className="w-12 h-12 rounded-full object-cover" />
                        <div>
                          <div className="font-bold">{provider.name}</div>
                          <div className="text-xs text-primary">{provider.category}</div>
                          <div className="text-xs font-semibold mt-1">${provider.price}/hr</div>
                          <div className="flex items-center gap-0.5 text-xs">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            {provider.rating}
                          </div>
                        </div>
                      </div>
                      <Link to={`/provider/${provider.id}`} className="mt-2 block">
                        <Button size="sm" className="w-full h-7 text-xs">View Profile</Button>
                      </Link>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
