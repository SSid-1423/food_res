
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, Leaf } from 'lucide-react';
import { menuData, categories } from '@/data/menu';

const Menu = () => {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState(selectedCategory);

  const filteredDishes = activeCategory === 'all' 
    ? menuData 
    : menuData.filter(dish => dish.category === activeCategory);

  const isAvailable = (dishId: string) => {
    // Simulate some dishes being unavailable
    const unavailableDishes = ['2', '4'];
    return !unavailableDishes.includes(dishId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Our Menu
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our carefully crafted dishes made with the finest ingredients
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button
            variant={activeCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('all')}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeCategory === 'all'
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg transform scale-105'
                : 'border-orange-300 text-orange-600 hover:bg-orange-50'
            }`}
          >
            All Dishes
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'default' : 'outline'}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg transform scale-105'
                  : 'border-orange-300 text-orange-600 hover:bg-orange-50'
              }`}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDishes.map((dish) => {
            const available = isAvailable(dish.id);
            return (
              <Card 
                key={dish.id} 
                className={`overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                  available ? 'bg-white' : 'bg-gray-100'
                } border-0 shadow-lg`}
              >
                <div className="relative">
                  <img
                    src={`https://images.unsplash.com/${dish.image}?auto=format&fit=crop&w=400&q=80`}
                    alt={dish.name}
                    className={`w-full h-64 object-cover ${!available ? 'grayscale opacity-50' : ''}`}
                  />
                  <div className="absolute top-4 right-4">
                    <Badge 
                      variant={available ? 'default' : 'secondary'}
                      className={`px-3 py-1 rounded-full font-semibold ${
                        available 
                          ? 'bg-green-500 text-white' 
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      {available ? 'Available' : 'Out of Stock'}
                    </Badge>
                  </div>
                  {dish.category === 'appetizers' && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-orange-500 text-white px-2 py-1 rounded-full">
                        <Leaf size={12} className="mr-1" />
                        Fresh
                      </Badge>
                    </div>
                  )}
                </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className={`text-xl font-bold ${!available ? 'text-gray-500' : 'text-gray-900'}`}>
                    {dish.name}
                  </CardTitle>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-600">{dish.rating}</span>
                      <span className="text-sm text-gray-400">({Math.floor(Math.random() * 100) + 20} reviews)</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Clock size={14} />
                      <span className="text-sm">{Math.floor(Math.random() * 20) + 15} min</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className={`text-sm mb-4 ${!available ? 'text-gray-400' : 'text-gray-600'}`}>
                    {dish.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={`text-3xl font-bold ${!available ? 'text-gray-400' : 'text-orange-600'}`}>
                      ₹{dish.price * 80} {/* Converting to INR for Indian context */}
                    </span>
                    <Button
                      disabled={!available}
                      className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                        available
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {available ? 'Add to Cart' : 'Unavailable'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Dine?</h2>
          <p className="text-xl mb-6 opacity-90">
            Book your table now and enjoy our delicious cuisine
          </p>
          <Link to="/reservations">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3 text-lg rounded-full">
              Make Reservation
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Menu;
