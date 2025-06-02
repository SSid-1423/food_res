
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageSquare, X, Send, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning!";
    if (hour < 17) return "Good afternoon!";
    return "Good evening!";
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return `${getTimeBasedGreeting()} Welcome to Savora! How can I assist you today?`;
    }
    
    if (message.includes('menu') || message.includes('dishes') || message.includes('food')) {
      return "We have an amazing menu with Indian, Chinese, Continental, and Italian cuisines! You can view our complete menu by clicking 'View Menu' or I can tell you about specific dishes. What would you like to know?";
    }
    
    if (message.includes('reservation') || message.includes('book') || message.includes('table')) {
      return "I'd be happy to help you make a reservation! You can book a table online through our reservation page, or call us directly at +91 98765 43210. Would you like me to direct you to the reservation page?";
    }
    
    if (message.includes('timing') || message.includes('hours') || message.includes('open') || message.includes('close')) {
      return "We're open daily from 11:00 AM to 11:00 PM. Perfect for lunch, dinner, or late-night dining!";
    }
    
    if (message.includes('location') || message.includes('address') || message.includes('where')) {
      return "We're located in the heart of the city! For exact directions, please call us at +91 98765 43210 and our staff will guide you.";
    }
    
    if (message.includes('contact') || message.includes('phone') || message.includes('call')) {
      return "You can reach us at +91 98765 43210 for reservations, inquiries, or any assistance. Our team is available during business hours!";
    }
    
    if (message.includes('price') || message.includes('cost') || message.includes('expensive')) {
      return "Our dishes are reasonably priced from ₹150 to ₹800. We offer great value for authentic, delicious food. Check our menu for detailed pricing!";
    }
    
    if (message.includes('delivery') || message.includes('takeaway') || message.includes('order')) {
      return "Currently, we focus on providing the best dine-in experience. However, you can call us at +91 98765 43210 to inquire about takeaway options!";
    }
    
    if (message.includes('special') || message.includes('offer') || message.includes('discount')) {
      return "We offer a 5% discount for advance payments when booking online! Also, ask about our chef's special recommendations when you visit.";
    }
    
    if (message.includes('parking') || message.includes('valet')) {
      return "We have convenient parking facilities available for our guests. Please call us at +91 98765 43210 for more details about parking arrangements.";
    }
    
    return "Thank you for your question! For specific inquiries, please call us at +91 98765 43210 or visit our restaurant. Our staff will be happy to assist you with detailed information!";
  };

  const initializeChat = () => {
    if (!isInitialized) {
      const greeting = getTimeBasedGreeting();
      const initialMessage: Message = {
        id: '1',
        text: `${greeting} Welcome to Savora! I'm here to help you with any questions about our restaurant, menu, reservations, or anything else. How can I assist you today?`,
        isBot: true,
        timestamp: new Date()
      };
      setMessages([initialMessage]);
      setIsInitialized(true);
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputValue('');
  };

  const handleQuickAction = (action: string) => {
    if (action === 'reservation') {
      navigate('/reservations');
      setIsOpen(false);
    } else if (action === 'menu') {
      navigate('/menu');
      setIsOpen(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      initializeChat();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className="w-80 h-96 shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Savora Assistant
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-0 flex flex-col h-80">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-2 rounded-lg text-sm ${
                      message.isBot
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-orange-500 text-white'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-2 border-t">
              <div className="flex gap-2 mb-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleQuickAction('reservation')}
                  className="text-xs"
                >
                  Make Reservation
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleQuickAction('menu')}
                  className="text-xs"
                >
                  View Menu
                </Button>
                <a href="tel:+919876543210">
                  <Button size="sm" variant="outline" className="text-xs">
                    <Phone className="h-3 w-3 mr-1" />
                    Call
                  </Button>
                </a>
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask me anything..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="text-sm"
                />
                <Button size="sm" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button
          onClick={handleToggle}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <MessageSquare className="h-6 w-6 text-white" />
        </Button>
      )}
    </div>
  );
};

export default Chatbot;
