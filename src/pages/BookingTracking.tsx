import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Phone, MessageSquare, CheckCircle2, Clock, Navigation, Wrench, Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BOOKING_STEPS = [
  { id: "requested", label: "Booking Requested", desc: "Your request has been sent to the provider.", time: "10:00 AM" },
  { id: "accepted", label: "Booking Accepted", desc: "Michael Chen has accepted your booking.", time: "10:15 AM" },
  { id: "travelling", label: "Provider Travelling", desc: "Your provider is on the way to your location.", time: "11:45 AM" },
  { id: "started", label: "Work Started", desc: "The service has started at your location.", time: null },
  { id: "completed", label: "Service Completed", desc: "The job has been successfully completed.", time: null },
];

const CURRENT_STEP = 2; // 0-indexed: "travelling" is active

export function BookingTracking() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-3xl">
        <Link to="/dashboard/customer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 w-fit">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Track Your Service</h1>
          <p className="text-muted-foreground">Booking #BK-{id || "12345"}</p>
        </div>

        {/* Provider Info Card */}
        <Card className="mb-8">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src="https://i.pravatar.cc/150?u=1"
                  alt="Michael Chen"
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary/20"
                />
                <div>
                  <div className="font-bold text-lg">Michael Chen</div>
                  <div className="text-sm text-muted-foreground">Expert Plumber</div>
                  <div className="flex items-center gap-1 text-sm mt-0.5">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">4.9</span>
                    <span className="text-muted-foreground">(124 reviews)</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full h-10 w-10" asChild>
                  <Link to="/chat">
                    <MessageSquare className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* ETA Banner */}
            {CURRENT_STEP === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center gap-3 bg-blue-50 text-blue-700 rounded-xl p-4"
              >
                <Navigation className="w-5 h-5 animate-pulse flex-shrink-0" />
                <div>
                  <div className="font-semibold">Estimated Arrival: ~15 minutes</div>
                  <div className="text-sm text-blue-600">Your provider is 3.2 km away</div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Visual Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Service Progress</CardTitle>
          </CardHeader>
          <CardContent className="pb-6">
            <div className="relative ml-4">
              {BOOKING_STEPS.map((step, index) => {
                const isDone = index < CURRENT_STEP;
                const isActive = index === CURRENT_STEP;
                const isPending = index > CURRENT_STEP;

                const Icon = index === 0 ? CheckCircle2 :
                  index === 1 ? CheckCircle2 :
                  index === 2 ? Navigation :
                  index === 3 ? Wrench :
                  Star;

                return (
                  <div key={step.id} className="relative flex gap-6 pb-8 last:pb-0">
                    {/* Vertical line */}
                    {index < BOOKING_STEPS.length - 1 && (
                      <div className={`absolute left-5 top-10 w-0.5 h-full -ml-px ${isDone || isActive ? "bg-primary" : "bg-border"}`} />
                    )}

                    {/* Icon */}
                    <motion.div
                      initial={isActive ? { scale: 0.8 } : {}}
                      animate={isActive ? { scale: [0.8, 1.1, 1] } : {}}
                      transition={{ duration: 0.5, repeat: isActive ? Infinity : 0, repeatDelay: 2 }}
                      className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all ${
                        isDone
                          ? "bg-primary border-primary text-primary-foreground"
                          : isActive
                          ? "bg-primary/10 border-primary text-primary animate-pulse"
                          : "bg-background border-border text-muted-foreground"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 pt-1.5">
                      <div className="flex items-center justify-between">
                        <div className={`font-semibold ${isPending ? "text-muted-foreground" : "text-foreground"}`}>
                          {step.label}
                        </div>
                        {step.time && (
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {step.time}
                          </div>
                        )}
                        {isActive && !step.time && (
                          <div className="text-xs text-primary font-medium flex items-center gap-1">
                            <span className="w-2 h-2 bg-primary rounded-full animate-pulse inline-block"></span>
                            Live
                          </div>
                        )}
                      </div>
                      <p className={`text-sm mt-1 ${isPending ? "text-muted-foreground/50" : "text-muted-foreground"}`}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Service Details */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Service Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span>123 Main Street, Downtown, New York, NY 10001</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span>Scheduled for October 25, 2026 at 12:00 PM</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Wrench className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span>Pipe leak repair in bathroom</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
