import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Clock, Users, Phone, Mail, MessageSquare, CreditCard, Smartphone, QrCode, IndianRupee, Copy, Download, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import QRCode from 'qrcode';

const Reservations = () => {
  const [date, setDate] = useState<Date>();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentReservation, setCurrentReservation] = useState<any>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'completed' | 'failed'>('pending');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: 2,
    time: '',
    specialRequests: '',
    tableType: 'standard',
    advanceAmount: 500
  });
  
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const timeSlots = [
    { time: '11:00 AM', available: true },
    { time: '11:30 AM', available: true },
    { time: '12:00 PM', available: false },
    { time: '12:30 PM', available: true },
    { time: '1:00 PM', available: true },
    { time: '1:30 PM', available: true },
    { time: '2:00 PM', available: true },
    { time: '6:00 PM', available: true },
    { time: '6:30 PM', available: false },
    { time: '7:00 PM', available: true },
    { time: '7:30 PM', available: true },
    { time: '8:00 PM', available: true },
    { time: '8:30 PM', available: true },
    { time: '9:00 PM', available: true },
    { time: '9:30 PM', available: true }
  ];

  const tableTypes = [
    { id: 'standard', name: 'Standard Table', price: 0, description: 'Regular dining table' },
    { id: 'window', name: 'Window Side', price: 200, description: 'Table with garden view' },
    { id: 'private', name: 'Private Booth', price: 500, description: 'Semi-private dining booth' },
    { id: 'vip', name: 'VIP Section', price: 1000, description: 'Premium dining experience' }
  ];

  const generateQRCode = async (paymentData: any) => {
    try {
      const upiString = `upi://pay?pa=savora@paytm&pn=Savora Restaurant&am=${paymentData.amount}&cu=INR&tn=Table Reservation - ${paymentData.reservationId}`;
      const qrCodeDataURL = await QRCode.toDataURL(upiString, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });
      setQrCodeUrl(qrCodeDataURL);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const calculateTotal = () => {
    const selectedTable = tableTypes.find(table => table.id === formData.tableType);
    return formData.advanceAmount + (selectedTable?.price || 0);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !formData.time || !formData.name || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const reservationId = `SAV${Date.now()}`;
    const selectedTable = tableTypes.find(table => table.id === formData.tableType);
    const totalAmount = calculateTotal();
    
    const reservation = {
      id: reservationId,
      userId: user?.id || 'guest',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: format(date, 'yyyy-MM-dd'),
      time: formData.time,
      guests: formData.guests,
      tableType: selectedTable?.name || 'Standard Table',
      specialRequests: formData.specialRequests,
      advanceAmount: formData.advanceAmount,
      tableCharges: selectedTable?.price || 0,
      totalAmount,
      status: 'confirmed',
      paymentStatus: 'pending',
      createdAt: new Date().toISOString()
    };

    setCurrentReservation(reservation);
    setShowPaymentModal(true);
    generateQRCode({ amount: totalAmount, reservationId });

    toast({
      title: "Reservation Created!",
      description: `Reservation ${reservationId} created. Please complete payment to confirm.`,
    });
  };

  const handlePaymentComplete = () => {
    if (currentReservation) {
      setPaymentStatus('completed');
      const updatedReservation = { ...currentReservation, paymentStatus: 'paid' };
      
      const existingReservations = JSON.parse(localStorage.getItem('reservations') || '[]');
      localStorage.setItem('reservations', JSON.stringify([...existingReservations, updatedReservation]));
      
      toast({
        title: "Payment Successful!",
        description: "Your table reservation has been confirmed.",
      });

      setTimeout(() => {
        setShowPaymentModal(false);
        navigate('/');
      }, 2000);
    }
  };

  const copyUPIId = () => {
    navigator.clipboard.writeText('savora@paytm');
    toast({
      title: "UPI ID Copied",
      description: "UPI ID copied to clipboard",
    });
  };

  const downloadQRCode = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.download = `savora-payment-qr-${currentReservation?.id}.png`;
      link.href = qrCodeUrl;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-card relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-elegant"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      
      <div className="relative z-10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 animate-slide-up">
            <h1 className="text-6xl font-bold mb-6 text-gradient">
              Reserve Your Table
            </h1>
            <p className="text-2xl text-muted-foreground">
              Book your perfect dining experience at Savora
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Reservation Form */}
            <Card className="glass-effect border-border/20 shadow-3d animate-bounce-in">
              <CardHeader className="pb-6">
                <CardTitle className="text-3xl font-bold text-foreground flex items-center">
                  <Calendar className="mr-3 text-primary" />
                  Reservation Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleReservationSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-semibold text-foreground">
                        Full Name *
                      </Label>
                      <div className="relative">
                        <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="pl-10 glass-effect border-border/40"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-semibold text-foreground">
                        Phone Number *
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="pl-10 glass-effect border-border/40"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-foreground">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="pl-10 glass-effect border-border/40"
                      />
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-foreground">
                      Reservation Date *
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal glass-effect border-border/40",
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

                  {/* Table Type Selection */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-foreground">
                      Table Type
                    </Label>
                    <Select value={formData.tableType} onValueChange={(value) => handleInputChange('tableType', value)}>
                      <SelectTrigger className="glass-effect border-border/40">
                        <SelectValue placeholder="Select table type" />
                      </SelectTrigger>
                      <SelectContent>
                        {tableTypes.map((table) => (
                          <SelectItem key={table.id} value={table.id}>
                            <div className="flex flex-col">
                              <span className="font-medium">{table.name} {table.price > 0 && `(+₹${table.price})`}</span>
                              <span className="text-xs text-muted-foreground">{table.description}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Time and Guests */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-foreground">
                        Time *
                      </Label>
                      <div className="grid grid-cols-2 gap-2">
                        {timeSlots.slice(0, 8).map((slot) => (
                          <Button
                            key={slot.time}
                            type="button"
                            variant={formData.time === slot.time ? "default" : "outline"}
                            size="sm"
                            disabled={!slot.available}
                            onClick={() => handleInputChange('time', slot.time)}
                            className={`text-xs glass-effect ${
                              formData.time === slot.time
                                ? 'bg-gradient-primary text-white'
                                : !slot.available
                                ? 'opacity-50 cursor-not-allowed'
                                : 'border-border/40 hover:bg-primary/20'
                            }`}
                          >
                            {slot.time}
                            {!slot.available && ' (Full)'}
                          </Button>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {timeSlots.slice(8).map((slot) => (
                          <Button
                            key={slot.time}
                            type="button"
                            variant={formData.time === slot.time ? "default" : "outline"}
                            size="sm"
                            disabled={!slot.available}
                            onClick={() => handleInputChange('time', slot.time)}
                            className={`text-xs glass-effect ${
                              formData.time === slot.time
                                ? 'bg-gradient-primary text-white'
                                : !slot.available
                                ? 'opacity-50 cursor-not-allowed'
                                : 'border-border/40 hover:bg-primary/20'
                            }`}
                          >
                            {slot.time}
                            {!slot.available && ' (Full)'}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="guests" className="text-sm font-semibold text-foreground">
                        Number of Guests
                      </Label>
                      <div className="flex items-center justify-center space-x-4">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleInputChange('guests', Math.max(1, formData.guests - 1))}
                          className="w-12 h-12 rounded-full glass-effect border-border/40 hover:bg-primary/20"
                        >
                          -
                        </Button>
                        <span className="text-2xl font-bold w-16 text-center text-primary">{formData.guests}</span>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleInputChange('guests', Math.min(12, formData.guests + 1))}
                          className="w-12 h-12 rounded-full glass-effect border-border/40 hover:bg-primary/20"
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Advance Amount */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-foreground">
                      Advance Amount (₹)
                    </Label>
                    <Select value={formData.advanceAmount.toString()} onValueChange={(value) => handleInputChange('advanceAmount', parseInt(value))}>
                      <SelectTrigger className="glass-effect border-border/40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="500">₹500 (Minimum)</SelectItem>
                        <SelectItem value="1000">₹1000</SelectItem>
                        <SelectItem value="1500">₹1500</SelectItem>
                        <SelectItem value="2000">₹2000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Special Requests */}
                  <div className="space-y-2">
                    <Label htmlFor="requests" className="text-sm font-semibold text-foreground">
                      Special Requests
                    </Label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <textarea
                        id="requests"
                        placeholder="Any dietary restrictions, celebration notes, or special arrangements..."
                        value={formData.specialRequests}
                        onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-border/40 rounded-md bg-card/50 backdrop-blur-sm focus:border-primary focus:ring-primary resize-none"
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Total Amount Display */}
                  <div className="p-4 bg-gradient-primary rounded-lg text-white">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total Amount:</span>
                      <span className="text-2xl font-bold">₹{calculateTotal()}</span>
                    </div>
                    <p className="text-sm opacity-90 mt-1">
                      Advance: ₹{formData.advanceAmount} + Table charges: ₹{tableTypes.find(t => t.id === formData.tableType)?.price || 0}
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-primary text-white py-4 rounded-lg font-bold text-lg shadow-3d hover:scale-105 transition-all duration-300"
                  >
                    🍽️ Reserve Table & Pay
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Restaurant Info */}
            <div className="space-y-8">
              <Card className="glass-effect border-border/20 shadow-3d animate-bounce-in" style={{ animationDelay: '0.2s' }}>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground">
                    Restaurant Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Clock className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-semibold text-foreground">Opening Hours</h4>
                      <p className="text-sm text-muted-foreground">Monday - Sunday: 11:00 AM - 11:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-semibold text-foreground">Contact</h4>
                      <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Mail className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-semibold text-foreground">Email</h4>
                      <p className="text-sm text-muted-foreground">reservations@savora.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-primary text-white shadow-3d animate-bounce-in" style={{ animationDelay: '0.4s' }}>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4">Reservation Policy</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center"><CheckCircle2 className="mr-2 h-4 w-4" /> Reservations can be made up to 30 days in advance</li>
                    <li className="flex items-center"><CheckCircle2 className="mr-2 h-4 w-4" /> Tables are held for 15 minutes past reservation time</li>
                    <li className="flex items-center"><CheckCircle2 className="mr-2 h-4 w-4" /> Cancellations must be made 2 hours before reservation</li>
                    <li className="flex items-center"><CheckCircle2 className="mr-2 h-4 w-4" /> Special occasions can be arranged with advance notice</li>
                    <li className="flex items-center"><CheckCircle2 className="mr-2 h-4 w-4" /> Group bookings (8+ people) require confirmation call</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="glass-effect border-border/20 shadow-3d animate-bounce-in" style={{ animationDelay: '0.6s' }}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-foreground">Why Pay Advance?</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Guaranteed table reservation</li>
                    <li>• Priority seating arrangement</li>
                    <li>• Special complimentary appetizer</li>
                    <li>• 5% discount on final bill</li>
                    <li>• Easy cancellation with full refund</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="max-w-2xl glass-effect border-border/20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground">Complete Your Payment</DialogTitle>
          </DialogHeader>
          
          {paymentStatus === 'completed' ? (
            <div className="text-center py-8">
              <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">Payment Successful!</h3>
              <p className="text-muted-foreground">Your table reservation has been confirmed.</p>
              <p className="text-sm text-muted-foreground mt-2">Redirecting to home page...</p>
            </div>
          ) : (
            <Tabs defaultValue="upi" className="w-full">
              <TabsList className="grid w-full grid-cols-3 glass-effect">
                <TabsTrigger value="upi" className="flex items-center space-x-2">
                  <Smartphone className="h-4 w-4" />
                  <span>UPI</span>
                </TabsTrigger>
                <TabsTrigger value="qr" className="flex items-center space-x-2">
                  <QrCode className="h-4 w-4" />
                  <span>QR Code</span>
                </TabsTrigger>
                <TabsTrigger value="card" className="flex items-center space-x-2">
                  <CreditCard className="h-4 w-4" />
                  <span>Card</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upi" className="space-y-4">
                <Card className="glass-effect border-border/20">
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <h3 className="text-xl font-bold text-foreground">Pay via UPI</h3>
                      <div className="bg-muted/20 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">UPI ID:</p>
                        <div className="flex items-center justify-center space-x-2 mt-2">
                          <span className="text-lg font-mono font-bold text-foreground">savora@paytm</span>
                          <Button variant="outline" size="sm" onClick={copyUPIId} className="glass-effect">
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-lg font-semibold text-foreground">Amount: ₹{currentReservation?.totalAmount}</p>
                        <p className="text-sm text-muted-foreground">
                          Reservation ID: {currentReservation?.id}
                        </p>
                      </div>
                      <Button onClick={handlePaymentComplete} className="w-full bg-gradient-primary">
                        I have made the payment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="qr" className="space-y-4">
                <Card className="glass-effect border-border/20">
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <h3 className="text-xl font-bold text-foreground">Scan QR Code to Pay</h3>
                      {qrCodeUrl && (
                        <div className="flex flex-col items-center space-y-4">
                          <div className="bg-white p-4 rounded-lg shadow-lg">
                            <img src={qrCodeUrl} alt="UPI QR Code" className="w-64 h-64" />
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" onClick={downloadQRCode} className="glass-effect">
                              <Download className="h-4 w-4 mr-2" />
                              Download QR
                            </Button>
                          </div>
                        </div>
                      )}
                      <div className="space-y-2">
                        <p className="text-lg font-semibold text-foreground">Amount: ₹{currentReservation?.totalAmount}</p>
                        <p className="text-sm text-muted-foreground">
                          Scan with any UPI app (GPay, PhonePe, Paytm, etc.)
                        </p>
                      </div>
                      <Button onClick={handlePaymentComplete} className="w-full bg-gradient-primary">
                        I have made the payment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="card" className="space-y-4">
                <Card className="glass-effect border-border/20">
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <h3 className="text-xl font-bold text-foreground">Card Payment</h3>
                      <div className="space-y-4">
                        <Input placeholder="Card Number" className="glass-effect" />
                        <div className="grid grid-cols-2 gap-4">
                          <Input placeholder="MM/YY" className="glass-effect" />
                          <Input placeholder="CVV" className="glass-effect" />
                        </div>
                        <Input placeholder="Cardholder Name" className="glass-effect" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-lg font-semibold text-foreground">Amount: ₹{currentReservation?.totalAmount}</p>
                        <p className="text-sm text-muted-foreground">Secure payment powered by Razorpay</p>
                      </div>
                      <Button onClick={handlePaymentComplete} className="w-full bg-gradient-primary">
                        Pay ₹{currentReservation?.totalAmount}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reservations;