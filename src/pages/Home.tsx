
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Users, Award, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CallBooking from "@/components/CallBooking";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-orange-600 via-red-600 to-pink-600">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
            Welcome to Savora
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-orange-100 max-w-3xl mx-auto">
            Experience the finest culinary journey with authentic flavors from around the world. 
            Where every meal becomes a memorable celebration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/menu')}
              size="lg" 
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View Our Menu
            </Button>
            <Button 
              onClick={() => navigate('/reservations')}
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 text-lg font-semibold"
            >
              Make Reservation
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Savora?</h2>
            <p className="text-xl text-gray-600">Discover what makes us special</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="text-center border-0 shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Premium Quality</h3>
                <p className="text-gray-600">Fresh ingredients and authentic recipes crafted by expert chefs</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Great Ambiance</h3>
                <p className="text-gray-600">Perfect atmosphere for family dinners, dates, and celebrations</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Award Winning</h3>
                <p className="text-gray-600">Recognized for excellence in food quality and customer service</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Quick Service</h3>
                <p className="text-gray-600">Fast and efficient service without compromising on quality</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call Booking Section */}
      <CallBooking />

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Since our establishment, Savora has been dedicated to bringing you the most authentic and delicious dining experience. 
                Our passionate chefs combine traditional cooking methods with modern culinary techniques to create unforgettable dishes.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                We source the finest ingredients and take pride in every dish we serve. From our signature curries to our innovative fusion creations, 
                every meal at Savora is a celebration of flavor and culture.
              </p>
              <Button 
                onClick={() => navigate('/menu')}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                Explore Our Menu
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-orange-200 to-red-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🍽️</div>
                  <p className="text-lg font-semibold text-gray-700">Delicious Food Awaits</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
