import { Link } from "react-router-dom";
import { Globe, Tv, MessageCircle, Rss } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xl">
                S
              </div>
              <span className="font-bold text-xl tracking-tight text-foreground">
                ServeLocal
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Your trusted marketplace for local services. Find the best professionals in your area, instantly.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Tv className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Rss className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">For Customers</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/search" className="hover:text-primary transition-colors">Find a Professional</Link></li>
              <li><Link to="/how-it-works" className="hover:text-primary transition-colors">How it Works</Link></li>
              <li><Link to="/safety" className="hover:text-primary transition-colors">Safety</Link></li>
              <li><Link to="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">For Providers</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/auth/register?role=provider" className="hover:text-primary transition-colors">Join as a Provider</Link></li>
              <li><Link to="/success-stories" className="hover:text-primary transition-colors">Success Stories</Link></li>
              <li><Link to="/community" className="hover:text-primary transition-colors">Community</Link></li>
              <li><Link to="/provider-guidelines" className="hover:text-primary transition-colors">Guidelines</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/help-center" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ServeLocal Marketplace. All rights reserved.</p>
          <div className="flex space-x-6">
            <span>Made with ❤️ for local communities</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
