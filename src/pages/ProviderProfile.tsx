import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, MapPin, CheckCircle2, Shield, Clock, Calendar, MessageSquare, Heart, Share2, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Mock data
const PROVIDER = {
  id: "1",
  name: "Michael Chen",
  title: "Master Plumber",
  rating: 4.9,
  reviews: 124,
  location: "Downtown, New York",
  memberSince: "2022",
  price: 45,
  verified: true,
  about: "I am a licensed master plumber with over 8 years of experience in residential and commercial plumbing. I specialize in leak detection, pipe installation, and emergency repairs. My goal is to provide fast, reliable, and high-quality service to all my customers.",
  skills: ["Pipe Repair", "Water Heaters", "Drain Cleaning", "Leak Detection", "Toilet Installation"],
  certifications: ["State Licensed Plumber", "OSHA Safety Certified"],
  stats: {
    jobsCompleted: 342,
    onTimeRate: "98%",
    responseRate: "< 1 hour",
  },
};

const REVIEWS = [
  { id: 1, author: "Sarah W.", rating: 5, date: "2 weeks ago", text: "Michael was fantastic. He arrived on time, quickly identified the problem with my sink, and had it fixed within an hour. Very professional and clean." },
  { id: 2, author: "James D.", rating: 5, date: "1 month ago", text: "Excellent service! We had a pipe burst in the middle of the night, and Michael responded immediately. Saved our house from water damage." },
  { id: 3, author: "Emily R.", rating: 4, date: "2 months ago", text: "Good work, slightly more expensive than others but the quality of the repair justifies the price." },
];

export function ProviderProfile() {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  // In a real app, you would fetch provider data based on ID here

  return (
    <div className="min-h-screen bg-background">
      {/* Cover Image */}
      <div className="h-48 md:h-64 lg:h-80 w-full bg-gradient-to-r from-primary/20 to-secondary/20 relative">
        <img 
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop" 
          alt="Cover" 
          className="w-full h-full object-cover mix-blend-overlay opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl -mt-20 md:-mt-32 relative z-10 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content (Left) */}
          <div className="flex-1 space-y-6">
            
            {/* Header / Info */}
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end">
              <div className="h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-background overflow-hidden bg-muted flex-shrink-0 shadow-sm">
                <img src={`https://i.pravatar.cc/150?u=${id || 1}`} alt={PROVIDER.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-2 mb-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl md:text-4xl font-bold">{PROVIDER.name}</h1>
                  {PROVIDER.verified && <CheckCircle2 className="w-6 h-6 text-primary" />}
                </div>
                <p className="text-xl text-muted-foreground font-medium">{PROVIDER.title}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-1">
                  <div className="flex items-center gap-1 text-foreground font-medium">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{PROVIDER.rating}</span>
                    <span className="text-muted-foreground font-normal">({PROVIDER.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {PROVIDER.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Joined {PROVIDER.memberSince}
                  </div>
                </div>
              </div>
            </div>

            {/* Badges/Stats */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y">
              <div className="text-center">
                <div className="text-2xl font-bold">{PROVIDER.stats.jobsCompleted}</div>
                <div className="text-sm text-muted-foreground">Jobs Completed</div>
              </div>
              <div className="text-center border-l">
                <div className="text-2xl font-bold">{PROVIDER.stats.onTimeRate}</div>
                <div className="text-sm text-muted-foreground">On Time</div>
              </div>
              <div className="text-center border-l">
                <div className="text-2xl font-bold">{PROVIDER.stats.responseRate}</div>
                <div className="text-sm text-muted-foreground">Response Rate</div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="about" className="w-full pt-4">
              <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 space-x-6">
                <TabsTrigger value="about" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3 text-base">About</TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3 text-base">Reviews ({PROVIDER.reviews})</TabsTrigger>
                <TabsTrigger value="portfolio" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3 text-base">Portfolio</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="pt-6 space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3">About Me</h3>
                  <p className="text-muted-foreground leading-relaxed">{PROVIDER.about}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Skills & Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {PROVIDER.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm">{skill}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Certifications</h3>
                  <div className="space-y-3">
                    {PROVIDER.certifications.map((cert) => (
                      <div key={cert} className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <Award className="h-5 w-5" />
                        </div>
                        <span className="font-medium">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="pt-6 space-y-6">
                <div className="flex items-center gap-6 p-6 bg-muted/50 rounded-xl">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-primary">{PROVIDER.rating}</div>
                    <div className="flex items-center justify-center gap-1 mt-2 text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">Based on {PROVIDER.reviews} reviews</div>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center gap-3 text-sm">
                        <div className="w-3">{star}</div>
                        <Star className="w-3 h-3 text-muted-foreground" />
                        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                          <div 
                            className="h-full bg-yellow-400 rounded-full" 
                            style={{ width: star === 5 ? '85%' : star === 4 ? '10%' : '2%' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {REVIEWS.map((review) => (
                    <div key={review.id} className="p-4 border rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold">{review.author}</div>
                            <div className="text-xs text-muted-foreground">{review.date}</div>
                          </div>
                        </div>
                        <div className="flex text-yellow-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-muted'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm">{review.text}</p>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-4">Load More Reviews</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="portfolio" className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="aspect-square rounded-xl overflow-hidden group relative bg-muted cursor-pointer">
                      <img 
                        src={`https://images.unsplash.com/photo-${i % 2 === 0 ? '1581578731548-c64695cc6952' : '1584622650111-993a426fbf0a'}?q=80&w=500&auto=format&fit=crop`} 
                        alt="Portfolio" 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white font-medium">View Project</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar / Booking CTA (Right) */}
          <div className="lg:w-96 w-full flex-shrink-0 mt-8 lg:mt-32">
            <Card className="sticky top-24 shadow-soft">
              <CardContent className="p-6">
                <div className="flex justify-between items-end mb-6 border-b pb-6">
                  <div>
                    <div className="text-sm text-muted-foreground font-medium mb-1">Starting from</div>
                    <div className="text-4xl font-bold text-foreground">${PROVIDER.price}<span className="text-base font-normal text-muted-foreground">/hr</span></div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => setIsFavorite(!isFavorite)}>
                      <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <span>Usually responds in <strong>1 hour</strong></span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Shield className="w-5 h-5 text-muted-foreground" />
                    <span>Background checked & verified</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link to={`/book/${PROVIDER.id}`} className="block">
                    <Button className="w-full h-12 text-base font-semibold shadow-sm">
                      Request to Book
                    </Button>
                  </Link>
                  <Link to="/chat" className="block">
                    <Button variant="outline" className="w-full h-12 text-base font-medium">
                      <MessageSquare className="w-4 h-4 mr-2" /> Message Provider
                    </Button>
                  </Link>
                </div>
                
                <p className="text-xs text-center text-muted-foreground mt-4">
                  You won't be charged yet
                </p>
              </CardContent>
            </Card>
          </div>
          
        </div>
      </div>
    </div>
  );
}
