
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock, Users, Phone, Mail, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const Reservations = () => {
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: 2,
    time: '',
    specialRequests: '',
    paymentOption: 'pay-later'
  });
  
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const timeSlots = [
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
    '2:00 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM',
    '8:30 PM', '9:00 PM', '9:30 PM'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !formData.time || !formData.name || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Save reservation to localStorage
    const reservationId = Date.now().toString();
    const reservation = {
      id: reservationId,
      userId: user?.id || 'guest',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: format(date, 'yyyy-MM-dd'),
      time: formData.time,
      guests: formData.guests,
      specialRequests: formData.specialRequests,
      status: 'confirmed',
      paymentStatus: formData.paymentOption === 'pay-now' ? 'paid' : 'unpaid',
      createdAt: new Date().toISOString()
    };

    const existingReservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    localStorage.setItem('reservations', JSON.stringify([...existingReservations, reservation]));

    toast({
      title: "Reservation Confirmed!",
      description: `Your table for ${formData.guests} on ${format(date, 'MMM dd, yyyy')} at ${formData.time} has been booked.`,
    });

    // Redirect to profile or home
    navigate(user ? '/profile' : '/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Reserve Your Table
          </h1>
          <p className="text-xl text-gray-600">
            Book your perfect dining experience at Savora
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Reservation Form */}
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                <Calendar className="mr-3 text-orange-600" />
                Reservation Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                      Full Name *
                    </Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="pl-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                      Phone Number *
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="pl-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                </div>

                {/* Date Selection */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">
                    Reservation Date *
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal border-gray-200 hover:border-orange-500",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Time and Guests */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">
                      Time *
                    </Label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.slice(0, 6).map((time) => (
                        <Button
                          key={time}
                          type="button"
                          variant={formData.time === time ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleInputChange('time', time)}
                          className={`text-xs ${
                            formData.time === time
                              ? 'bg-orange-500 hover:bg-orange-600'
                              : 'border-gray-200 hover:border-orange-500'
                          }`}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {timeSlots.slice(6).map((time) => (
                        <Button
                          key={time}
                          type="button"
                          variant={formData.time === time ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleInputChange('time', time)}
                          className={`text-xs ${
                            formData.time === time
                              ? 'bg-orange-500 hover:bg-orange-600'
                              : 'border-gray-200 hover:border-orange-500'
                          }`}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guests" className="text-sm font-semibold text-gray-700">
                      Number of Guests
                    </Label>
                    <div className="flex items-center space-x-3">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleInputChange('guests', Math.max(1, formData.guests - 1))}
                        className="w-10 h-10 rounded-full"
                      >
                        -
                      </Button>
                      <span className="text-xl font-semibold w-12 text-center">{formData.guests}</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleInputChange('guests', Math.min(12, formData.guests + 1))}
                        className="w-10 h-10 rounded-full"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                <div className="space-y-2">
                  <Label htmlFor="requests" className="text-sm font-semibold text-gray-700">
                    Special Requests
                  </Label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <textarea
                      id="requests"
                      placeholder="Any dietary restrictions, celebration notes, or special arrangements..."
                      value={formData.specialRequests}
                      onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md focus:border-orange-500 focus:ring-orange-500 resize-none"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Payment Option */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-gray-700">
                    Payment Option
                  </Label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value="pay-later"
                        checked={formData.paymentOption === 'pay-later'}
                        onChange={(e) => handleInputChange('paymentOption', e.target.value)}
                        className="text-orange-500 focus:ring-orange-500"
                      />
                      <span className="text-sm">Pay at Restaurant</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value="pay-now"
                        checked={formData.paymentOption === 'pay-now'}
                        onChange={(e) => handleInputChange('paymentOption', e.target.value)}
                        className="text-orange-500 focus:ring-orange-500"
                      />
                      <span className="text-sm">Pay Now (5% discount)</span>
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Confirm Reservation
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Restaurant Info */}
          <div className="space-y-8">
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Restaurant Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Clock className="mt-1 h-5 w-5 text-orange-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Opening Hours</h4>
                    <p className="text-sm text-gray-600">Monday - Sunday: 11:00 AM - 11:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="mt-1 h-5 w-5 text-orange-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Contact</h4>
                    <p className="text-sm text-gray-600">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="mt-1 h-5 w-5 text-orange-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-sm text-gray-600">reservations@savora.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 bg-gradient-to-br from-orange-500 to-red-500 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Reservation Policy</h3>
                <ul className="space-y-2 text-sm opacity-90">
                  <li>• Reservations can be made up to 30 days in advance</li>
                  <li>• Tables are held for 15 minutes past reservation time</li>
                  <li>• Cancellations must be made 2 hours before reservation</li>
                  <li>• Special occasions can be arranged with advance notice</li>
                  <li>• Group bookings (8+ people) require confirmation call</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
