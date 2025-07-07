
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { categories } from '@/data/menu';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    // Show animation for 2 seconds
    setTimeout(() => {
      logout();
      setIsLoggingOut(false);
    }, 2000);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-full"></div>
            <span className="text-2xl font-bold text-gray-900">Savora</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-gray-700 hover:text-orange-600 transition-colors ${isActive('/') ? 'text-orange-600 font-semibold' : ''}`}
            >
              Home
            </Link>
            
            {/* Menu Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setHoveredCategory('menu')}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <Link 
                to="/menu" 
                className={`text-gray-700 hover:text-orange-600 transition-colors ${isActive('/menu') ? 'text-orange-600 font-semibold' : ''}`}
              >
                Menu
              </Link>
              
              {hoveredCategory === 'menu' && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-4">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/menu?category=${category.id}`}
                      className="block px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                    >
                      <div className="font-medium">{category.name}</div>
                      <div className="text-sm text-gray-500">{category.description}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link 
              to="/reservations" 
              className={`text-gray-700 hover:text-orange-600 transition-colors ${isActive('/reservations') ? 'text-orange-600 font-semibold' : ''}`}
            >
              Reservations
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors">
                  <User size={20} />
                  <span>{user.name}</span>
                </Link>
                <Button 
                  variant="outline" 
                  onClick={handleLogout} 
                  size="sm"
                  disabled={isLoggingOut}
                  className={`transition-all duration-300 ${isLoggingOut ? 'animate-pulse bg-gradient-primary text-primary-foreground' : ''}`}
                >
                  {isLoggingOut ? '✨ Logging out...' : 'Logout'}
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-orange-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/menu" 
                className="text-gray-700 hover:text-orange-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Menu
              </Link>
              <Link 
                to="/reservations" 
                className="text-gray-700 hover:text-orange-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Reservations
              </Link>
              
              {user ? (
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  <Link 
                    to="/profile" 
                    className="text-gray-700 hover:text-orange-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Button 
                    variant="outline" 
                    onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} 
                    size="sm" 
                    className={`w-fit transition-all duration-300 ${isLoggingOut ? 'animate-pulse bg-gradient-primary text-primary-foreground' : ''}`}
                    disabled={isLoggingOut}
                  >
                    {isLoggingOut ? '✨ Logging out...' : 'Logout'}
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  <Link 
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button variant="outline" size="sm" className="w-full">Login</Button>
                  </Link>
                  <Link 
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button size="sm" className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
