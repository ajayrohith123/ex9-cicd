import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, MessageSquare, ImagePlus, ArrowLeft, ArrowRight, CheckCircle2, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const STEPS = ["Service Details", "Schedule", "Confirmation"];

const TIME_SLOTS = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"];

const PROVIDER = {
  id: "1",
  name: "Michael Chen",
  service: "Expert Plumber",
  price: 45,
  image: "https://i.pravatar.cc/150?u=1",
  rating: 4.9,
};

export function Booking() {
  const { id } = useParams();
  const [step, setStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);

  const totalHours = 2;
  const serviceFee = PROVIDER.price * totalHours;
  const platformFee = Math.round(serviceFee * 0.1);
  const total = serviceFee + platformFee;

  const handleNext = () => {
    if (step === 0 && (!address.trim() || address.length < 5 || !description.trim())) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (step === 1 && (!selectedDate || !selectedTime)) {
      toast.error("Please select a date and time.");
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setCompleted(true);
    }, 1800);
  };

  const today = new Date();
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i + 1);
    return d;
  });

  if (completed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Booking Confirmed!</h1>
          <p className="text-muted-foreground mb-2">Your booking with <strong>{PROVIDER.name}</strong> has been placed.</p>
          <p className="text-muted-foreground mb-8">You'll receive a confirmation shortly. Track your service in real-time on the dashboard.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/dashboard/customer">
              <Button className="w-full sm:w-auto">Go to Dashboard</Button>
            </Link>
            <Link to="/search">
              <Button variant="outline" className="w-full sm:w-auto">Find More Services</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-4xl">
        {/* Back Link */}
        <Link to={`/provider/${id}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 w-fit">
          <ArrowLeft className="w-4 h-4" />
          Back to Profile
        </Link>

        <h1 className="text-3xl font-bold mb-8">Book a Service</h1>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-10">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                  i < step ? "bg-primary border-primary text-primary-foreground" :
                  i === step ? "border-primary text-primary" :
                  "border-border text-muted-foreground"
                }`}>
                  {i < step ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                </div>
                <span className={`text-xs mt-2 font-medium hidden sm:block ${i === step ? "text-primary" : "text-muted-foreground"}`}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`h-0.5 w-16 sm:w-24 md:w-32 mx-1 sm:mx-2 transition-all ${i < step ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="step-0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" /> Service Location</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Address *</label>
                        <Input 
                          placeholder="Enter your full address"
                          className="h-11"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2"><MessageSquare className="w-5 h-5 text-primary" /> Problem Description</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Describe the issue *</label>
                        <Textarea
                          placeholder="Describe the problem in detail so the provider can prepare..."
                          className="min-h-[120px] resize-none"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium block mb-2">Upload Photos (optional)</label>
                        <div className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-colors">
                          <ImagePlus className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Click to upload images or drag and drop</p>
                          <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB each</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2"><Calendar className="w-5 h-5 text-primary" /> Select Date</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                        {dates.map((date) => {
                          const dateStr = date.toISOString().split("T")[0];
                          const isSelected = selectedDate === dateStr;
                          return (
                            <button
                              key={dateStr}
                              onClick={() => setSelectedDate(dateStr)}
                              className={`p-3 rounded-xl text-center transition-all border ${
                                isSelected 
                                  ? "bg-primary text-primary-foreground border-primary shadow-sm" 
                                  : "hover:border-primary/50 hover:bg-muted/50"
                              }`}
                            >
                              <div className="text-xs font-medium">{date.toLocaleDateString("en", { weekday: "short" })}</div>
                              <div className="text-xl font-bold mt-1">{date.getDate()}</div>
                              <div className="text-xs">{date.toLocaleDateString("en", { month: "short" })}</div>
                            </button>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2"><Clock className="w-5 h-5 text-primary" /> Select Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {TIME_SLOTS.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => setSelectedTime(slot)}
                            className={`py-2 px-3 rounded-lg text-sm font-medium border transition-all ${
                              selectedTime === slot
                                ? "bg-primary text-primary-foreground border-primary"
                                : "hover:border-primary/50 hover:bg-muted/50"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Review Your Booking</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      {/* Provider */}
                      <div className="flex items-center gap-4 p-4 bg-muted/40 rounded-xl">
                        <img src={PROVIDER.image} alt={PROVIDER.name} className="w-14 h-14 rounded-full object-cover" />
                        <div>
                          <div className="font-bold text-lg">{PROVIDER.name}</div>
                          <div className="text-sm text-muted-foreground">{PROVIDER.service}</div>
                        </div>
                      </div>

                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <span>{address || "Not specified"}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <span>{selectedDate ? new Date(selectedDate).toLocaleDateString("en", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : "Not selected"}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <span>{selectedTime || "Not selected"}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <MessageSquare className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{description || "No description provided"}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2"><CreditCard className="w-5 h-5 text-primary" /> Payment Method</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer bg-primary/5 border-primary">
                        <CreditCard className="w-5 h-5 text-primary" />
                        <div>
                          <div className="font-medium">Pay after service</div>
                          <div className="text-xs text-muted-foreground">You'll be charged after the job is completed</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex gap-3 mt-8">
              {step > 0 && (
                <Button variant="outline" onClick={handleBack} className="flex-1 h-12">
                  <ArrowLeft className="mr-2 w-4 h-4" /> Back
                </Button>
              )}
              {step < STEPS.length - 1 ? (
                <Button onClick={handleNext} className="flex-1 h-12">
                  Continue <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              ) : (
                <Button onClick={handleConfirm} className="flex-1 h-12 font-semibold" disabled={isSubmitting}>
                  {isSubmitting ? "Confirming..." : "Confirm Booking"}
                </Button>
              )}
            </div>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b">
                  <img src={PROVIDER.image} alt={PROVIDER.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold">{PROVIDER.name}</div>
                    <div className="text-sm text-muted-foreground">{PROVIDER.service}</div>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">${PROVIDER.price}/hr × {totalHours} hrs</span>
                    <span className="font-medium">${serviceFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Platform fee (10%)</span>
                    <span className="font-medium">${platformFee}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t font-bold text-base">
                    <span>Total</span>
                    <span className="text-primary">${total}</span>
                  </div>
                </div>

                <div className="pt-2 text-xs text-muted-foreground text-center">
                  You won't be charged until the service is completed.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
