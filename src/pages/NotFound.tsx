import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md"
      >
        {/* 404 Number */}
        <div className="text-8xl md:text-9xl font-black text-primary/20 select-none leading-none mb-4">
          404
        </div>

        <h1 className="text-3xl font-bold mb-3">Page Not Found</h1>
        <p className="text-muted-foreground text-lg mb-10">
          Sorry, we couldn't find the page you're looking for. It may have been moved or deleted.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="h-12 px-8 gap-2">
            <Link to="/">
              <Home className="w-4 h-4" /> Back to Home
            </Link>
          </Button>
          <Button variant="outline" asChild className="h-12 px-8 gap-2">
            <Link to="/search">
              <Search className="w-4 h-4" /> Find a Service
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
