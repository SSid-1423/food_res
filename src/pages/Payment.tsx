
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Check, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Payment = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const reservationData = location.state?.reservation;

  useEffect(() => {
    if (!reservationData) {
      navigate('/');
    }
  }, [reservationData, navigate]);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Update reservation with payment status
      const existingReservations = JSON.parse(localStorage.getItem('reservations') || '[]');
      const updatedReservations = existingReservations.map((res: any) => 
        res.id === reservationData.id 
          ? { ...res, paymentStatus: 'paid' }
          : res
      );
      localStorage.setItem('reservations', JSON.stringify(updatedReservations));
      
      setIsProcessing(false);
      setPaymentComplete(true);
      
      toast({
        title: "Payment Successful!",
        description: "Your reservation has been confirmed and paid.",
      });
    }, 2000);
  };

  if (!reservationData) {
    return null;
  }

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12">
        <Card className="max-w-md mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Complete!</h2>
            <p className="text-gray-600 mb-6">
              Your reservation has been confirmed and payment processed successfully.
            </p>
            <Button 
              onClick={() => navigate('/')}
              className="w-full bg-green-500 hover:bg-green-600"
            >
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button 
          variant="outline" 
          onClick={() => navigate('/reservations')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Reservations
        </Button>

        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
              <CreditCard className="mr-3 text-orange-600" />
              Complete Payment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Reservation Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Reservation Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Name:</span>
                  <span className="font-medium">{reservationData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span className="font-medium">{reservationData.date}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span className="font-medium">{reservationData.time}</span>
                </div>
                <div className="flex justify-between">
                  <span>Guests:</span>
                  <span className="font-medium">{reservationData.guests}</span>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Payment Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Table Reservation:</span>
                  <span className="font-medium">$25.00</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>5% Prepay Discount:</span>
                  <span className="font-medium">-$1.25</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>$23.75</span>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isProcessing ? 'Processing...' : 'Pay $23.75'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Payment;
