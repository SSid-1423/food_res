
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Clock, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CallBooking = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Quick Booking Options
          </h2>
          <p className="text-xl text-orange-100">
            Reserve your table instantly or call us directly
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Online Booking */}
          <Card className="bg-white/10 backdrop-blur-sm border-0 text-white">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Book Online</h3>
              <p className="text-orange-100 mb-6">
                Reserve your table instantly with our online booking system. 
                Choose your preferred date, time, and get instant confirmation.
              </p>
              <Button
                onClick={() => navigate('/reservations')}
                className="bg-white text-orange-600 hover:bg-orange-50 font-semibold px-8 py-3"
              >
                Make Reservation
              </Button>
            </CardContent>
          </Card>

          {/* Call Booking */}
          <Card className="bg-white/10 backdrop-blur-sm border-0 text-white">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Call to Book</h3>
              <p className="text-orange-100 mb-6">
                Speak directly with our team for personalized service, 
                special requests, or group bookings.
              </p>
              <div className="space-y-3">
                <a href="tel:+919876543210">
                  <Button className="bg-white text-orange-600 hover:bg-orange-50 font-semibold px-8 py-3 w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Call +91 98765 43210
                  </Button>
                </a>
                <p className="text-sm text-orange-100">
                  Available: 11:00 AM - 11:00 PM Daily
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex items-center justify-center space-x-3">
            <Phone className="w-5 h-5 text-white" />
            <span className="text-white">+91 98765 43210</span>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <Clock className="w-5 h-5 text-white" />
            <span className="text-white">11:00 AM - 11:00 PM</span>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <MapPin className="w-5 h-5 text-white" />
            <span className="text-white">Heart of the City</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallBooking;
