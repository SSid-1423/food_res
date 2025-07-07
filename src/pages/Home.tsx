
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Users, Award, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CallBooking from "@/components/CallBooking";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Promotional Marquee */}
      <div className="bg-gradient-primary text-white py-3 overflow-hidden animate-glow">
        <div className="animate-marquee whitespace-nowrap">
          <span className="text-sm font-bold mx-6">🎉 Grand Opening Special: 20% OFF on all orders!</span>
          <span className="text-sm font-bold mx-6">📞 Call +91 98765 43210 for instant reservations</span>
          <span className="text-sm font-bold mx-6">🍽️ Try our signature dishes - Butter Chicken & Biryani</span>
          <span className="text-sm font-bold mx-6">⭐ Rated #1 Restaurant in the City</span>
          <span className="text-sm font-bold mx-6">🎊 Use code WELCOME20 for 20% discount on payment</span>
          <span className="text-sm font-bold mx-6">🔥 Limited Time: Buy 2 Get 1 FREE on all appetizers!</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-warm"></div>
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 animate-float">
          <div className="w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
        </div>
        <div className="absolute top-40 right-32 animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
        </div>
        <div className="absolute bottom-32 left-1/4 animate-float" style={{ animationDelay: '4s' }}>
          <div className="w-20 h-20 bg-accent/15 rounded-full blur-xl"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 animate-bounce-in">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 text-gradient animate-glow">
            Welcome to Savora
          </h1>
          <p className="text-xl md:text-3xl mb-12 text-white/90 max-w-4xl mx-auto font-light animate-slide-up">
            Experience the finest culinary journey with authentic flavors from around the world. 
            Where every meal becomes a memorable celebration.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Button 
              onClick={() => navigate('/menu')}
              size="lg" 
              className="bg-gradient-primary text-white px-10 py-6 text-xl font-bold shadow-3d glass-effect border-0 hover:scale-105 transition-all duration-500"
            >
              🍽️ View Our Menu
            </Button>
            <Button 
              onClick={() => navigate('/reservations')}
              size="lg" 
              className="bg-gradient-secondary text-white px-10 py-6 text-xl font-bold shadow-3d glass-effect border-0 hover:scale-105 transition-all duration-500"
            >
              📅 Make Reservation
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-elegant opacity-80"></div>
        <div className="absolute top-10 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-5xl font-bold text-foreground mb-6 text-gradient">Why Choose Savora?</h2>
            <p className="text-2xl text-muted-foreground">Discover what makes us special</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="text-center glass-effect border-border/20 shadow-3d group hover:scale-105 transition-all duration-500 animate-bounce-in">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow animate-glow">
                  <Star className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">Premium Quality</h3>
                <p className="text-muted-foreground text-lg">Fresh ingredients and authentic recipes crafted by expert chefs</p>
              </CardContent>
            </Card>
            
            <Card className="text-center glass-effect border-border/20 shadow-3d group hover:scale-105 transition-all duration-500 animate-bounce-in" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow animate-glow">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">Great Ambiance</h3>
                <p className="text-muted-foreground text-lg">Perfect atmosphere for family dinners, dates, and celebrations</p>
              </CardContent>
            </Card>
            
            <Card className="text-center glass-effect border-border/20 shadow-3d group hover:scale-105 transition-all duration-500 animate-bounce-in" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-gradient-warm rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow animate-glow">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">Award Winning</h3>
                <p className="text-muted-foreground text-lg">Recognized for excellence in food quality and customer service</p>
              </CardContent>
            </Card>
            
            <Card className="text-center glass-effect border-border/20 shadow-3d group hover:scale-105 transition-all duration-500 animate-bounce-in" style={{ animationDelay: '0.3s' }}>
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow animate-glow">
                  <Clock className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">Quick Service</h3>
                <p className="text-muted-foreground text-lg">Fast and efficient service without compromising on quality</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call Booking Section */}
      <CallBooking />

      {/* Special Offers Marquee */}
      <div className="bg-gradient-warm text-white py-4 overflow-hidden animate-glow">
        <div className="animate-marquee whitespace-nowrap">
          <span className="text-lg font-bold mx-8">🔥 Limited Time: Buy 2 Get 1 FREE on all appetizers!</span>
          <span className="text-lg font-bold mx-8">🍰 Complimentary dessert with every family meal</span>
          <span className="text-lg font-bold mx-8">🥂 Happy Hours: 4 PM - 7 PM with 30% off beverages</span>
          <span className="text-lg font-bold mx-8">👨‍👩‍👧‍👦 Kids eat free on Sundays with adult meal purchase</span>
          <span className="text-lg font-bold mx-8">🎯 VIP Members get exclusive 25% discount</span>
        </div>
      </div>

      {/* About Section */}
      <section className="py-24 bg-card relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-elegant"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-56 h-56 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-up">
              <h2 className="text-5xl font-bold text-foreground mb-8 text-gradient">Our Story</h2>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                Since our establishment, Savora has been dedicated to bringing you the most authentic and delicious dining experience. 
                Our passionate chefs combine traditional cooking methods with modern culinary techniques to create unforgettable dishes.
              </p>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                We source the finest ingredients and take pride in every dish we serve. From our signature curries to our innovative fusion creations, 
                every meal at Savora is a celebration of flavor and culture.
              </p>
              <Button 
                onClick={() => navigate('/menu')}
                className="bg-gradient-primary text-white px-8 py-4 text-lg font-bold shadow-3d hover:scale-105 transition-all duration-300"
              >
                🌟 Explore Our Menu
              </Button>
            </div>
            <div className="relative animate-bounce-in" style={{ animationDelay: '0.2s' }}>
              <div className="aspect-square bg-gradient-warm rounded-3xl flex items-center justify-center shadow-3d relative overflow-hidden group">
                {/* Floating elements inside */}
                <div className="absolute top-10 left-10 w-16 h-16 bg-white/20 rounded-full blur-xl animate-float"></div>
                <div className="absolute bottom-20 right-16 w-12 h-12 bg-white/15 rounded-full blur-lg animate-float" style={{ animationDelay: '3s' }}></div>
                
                <div className="text-center z-10 group-hover:scale-110 transition-transform duration-500">
                  <div className="text-8xl mb-6 animate-glow">🍽️</div>
                  <p className="text-2xl font-bold text-white">Delicious Food Awaits</p>
                  <p className="text-lg text-white/80 mt-2">Experience Culinary Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-bounce-in">
              <div className="text-4xl md:text-6xl font-bold text-white mb-2">500+</div>
              <div className="text-white/90 text-lg">Happy Customers</div>
            </div>
            <div className="animate-bounce-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl md:text-6xl font-bold text-white mb-2">50+</div>
              <div className="text-white/90 text-lg">Signature Dishes</div>
            </div>
            <div className="animate-bounce-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl md:text-6xl font-bold text-white mb-2">5★</div>
              <div className="text-white/90 text-lg">Average Rating</div>
            </div>
            <div className="animate-bounce-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-4xl md:text-6xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/90 text-lg">Service Available</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
