import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Upload, Info, Mail, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/upload", label: "Upload Image", icon: Upload },
    { path: "/about", label: "About", icon: Info },
    { path: "/contact", label: "Contact", icon: Mail },
  ];

  const isActive = (path: string) => location.pathname === path;

  const NavLink = ({ path, label, icon: Icon, mobile = false }: { 
    path: string; 
    label: string; 
    icon: any; 
    mobile?: boolean 
  }) => (
    <Link
      to={path}
      className={`relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 group ${
        isActive(path) 
          ? 'text-forest' 
          : 'text-muted-foreground hover:text-foreground'
      } ${mobile ? 'text-lg py-3' : ''}`}
      onClick={mobile ? () => setIsOpen(false) : undefined}
    >
      <Icon size={mobile ? 24 : 20} />
      {label}
      {/* Animated underline for active state */}
      {!mobile && (
        <div className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-forest to-ocean rounded-full transition-all duration-300 ${
          isActive(path) ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
        }`} />
      )}
      {/* Mobile active indicator */}
      {mobile && isActive(path) && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-forest to-ocean rounded-r-full" />
      )}
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-forest to-ocean">
              <Recycle className="w-6 h-6 text-white" />
            </div>
            <span className="bg-gradient-to-r from-forest to-ocean bg-clip-text text-transparent">
              RecycleVision
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ path, label, icon }) => (
              <NavLink key={path} path={path} label={label} icon={icon} />
            ))}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon" className="border-forest/20">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 bg-background">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2 text-lg font-bold text-primary">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-forest to-ocean">
                    <Recycle className="w-5 h-5 text-white" />
                  </div>
                  RecycleVision
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                {navItems.map(({ path, label, icon }) => (
                  <NavLink key={path} path={path} label={label} icon={icon} mobile />
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;