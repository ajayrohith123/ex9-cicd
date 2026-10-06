import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, MapPin, Star, Shield, Wrench, Zap, Home, Droplets, Paintbrush, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const CATEGORIES = [
  { name: "Plumbing", icon: Droplets, color: "text-blue-500", bg: "bg-blue-100" },
  { name: "Electrical", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-100" },
  { name: "Carpentry", icon: Wrench, color: "text-amber-600", bg: "bg-amber-100" },
  { name: "Cleaning", icon: Home, color: "text-emerald-500", bg: "bg-emerald-100" },
  { name: "Painting", icon: Paintbrush, color: "text-purple-500", bg: "bg-purple-100" },
];

const FEATURED_PROVIDERS = [
  {
    id: "1",
    name: "Michael Chen",
    service: "Expert Plumber",
    rating: 4.9,
    reviews: 124,
    price: "$45/hr",
    image: "https://i.pravatar.cc/150?u=1",
  },
  {
    id: "2",
    name: "Sarah Jenkins",
    service: "Certified Electrician",
    rating: 5.0,
    reviews: 89,
    price: "$55/hr",
    image: "https://i.pravatar.cc/150?u=2",
  },
  {
    id: "3",
    name: "David Smith",
    service: "Home Cleaning Pro",
    rating: 4.8,
    reviews: 215,
    price: "$30/hr",
    image: "https://i.pravatar.cc/150?u=3",
  },
  {
    id: "4",
    name: "Elena Rodriguez",
    service: "Interior Painter",
    rating: 4.9,
    reviews: 67,
    price: "$40/hr",
    image: "https://i.pravatar.cc/150?u=4",
  },
];

export function Landing() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}&loc=${encodeURIComponent(location)}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 pt-24 pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20 px-4 py-1.5 rounded-full text-sm font-medium">
                #1 Local Service Marketplace
              </Badge>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
                Find the perfect <span className="text-primary">Professional</span> for your needs
              </h1>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Connect with top-rated local service providers. From plumbers to tutors, book trusted professionals in minutes.
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onSubmit={handleSearch}
              className="bg-card shadow-soft p-3 rounded-2xl flex flex-col md:flex-row gap-3 max-w-3xl mx-auto border"
            >
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="What service do you need?"
                  className="pl-12 h-14 border-0 focus-visible:ring-0 bg-transparent text-lg shadow-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="hidden md:block w-px bg-border my-2" />
              <div className="relative flex-1 border-t md:border-t-0 md:border-l border-transparent">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Your Location"
                  className="pl-12 h-14 border-0 focus-visible:ring-0 bg-transparent text-lg shadow-none"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <Button type="submit" size="lg" className="h-14 px-8 text-lg rounded-xl w-full md:w-auto">
                Search
              </Button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground"
            >
              <span>Popular:</span>
              {["House Cleaning", "Plumbing repair", "AC Servicing", "Electrician"].map((tag) => (
                <Link key={tag} to={`/search?q=${tag}`} className="hover:text-primary underline underline-offset-4">
                  {tag}
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
        
        {/* Abstract Background Shapes */}
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 -right-64 w-96 h-96 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-card relative z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How ServeLocal Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Getting things done has never been easier. Just three simple steps to solve your problems.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: Search, title: "1. Search for Service", desc: "Find the exact service you need from our categorized list of professionals." },
              { icon: Shield, title: "2. Compare & Book", desc: "Check reviews, compare prices, and book the best professional for your budget." },
              { icon: CheckCircle2, title: "3. Get it Done", desc: "The professional arrives at your location and completes the job to your satisfaction." }
            ].map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <step.icon className="w-10 h-10 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Categories</h2>
              <p className="text-muted-foreground max-w-2xl">Explore our most demanded services and find exactly what you need.</p>
            </div>
            <Link to="/search">
              <Button variant="outline" className="hidden md:flex gap-2">
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {CATEGORIES.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link to={`/search?category=${category.name}`}>
                  <Card className="h-full hover:shadow-soft hover:border-primary/50 transition-all cursor-pointer group">
                    <CardContent className="p-6 flex flex-col items-center text-center justify-center h-full">
                      <div className={`w-16 h-16 rounded-full ${category.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <category.icon className={`w-8 h-8 ${category.color}`} />
                      </div>
                      <h3 className="font-semibold">{category.name}</h3>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Top Rated Professionals</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Meet our most highly recommended service providers ready to help you.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURED_PROVIDERS.map((provider, index) => (
              <motion.div
                key={provider.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-soft transition-all">
                  <div className="h-32 bg-gradient-to-r from-primary/20 to-secondary/20" />
                  <CardContent className="relative pt-0 px-6 pb-6 text-center">
                    <div className="mx-auto w-20 h-20 rounded-full border-4 border-card -mt-10 overflow-hidden mb-4 bg-muted">
                      <img src={provider.image} alt={provider.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-bold text-lg">{provider.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{provider.service}</p>
                    
                    <div className="flex justify-center items-center gap-1 mb-6 bg-muted/50 py-1.5 rounded-full w-fit mx-auto px-3">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-sm">{provider.rating}</span>
                      <span className="text-xs text-muted-foreground">({provider.reviews})</span>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t">
                      <div className="font-bold text-primary">{provider.price}</div>
                      <Link to={`/provider/${provider.id}`}>
                        <Button size="sm">Book Now</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Provider CTA */}
      <section className="py-24 bg-primary relative overflow-hidden text-primary-foreground">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Are you a professional?</h2>
            <p className="text-xl mb-10 text-primary-foreground/80">Join ServeLocal to grow your business, reach more customers, and manage your bookings effortlessly.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth/register?role=provider">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto h-14 px-8 text-lg rounded-xl">
                  Become a Provider
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Everything you need to know about ServeLocal.</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg">How do I pay for a service?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                You can pay securely through our platform using credit card, debit card, or digital wallets once the service is completed to your satisfaction.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg">Are the professionals verified?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes, all our professionals undergo a strict background check and skill verification process before they can offer services on ServeLocal.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg">What happens if I'm not satisfied?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                We offer a 100% satisfaction guarantee. If you're not happy with the service, our support team will help resolve the issue or arrange a refund.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg">Can I cancel a booking?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes, you can cancel a booking free of charge up to 24 hours before the scheduled time. Late cancellations may incur a small fee.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}
