
import { Dish } from '@/types';

export const menuData: Dish[] = [
  {
    id: '1',
    name: 'Truffle Risotto',
    description: 'Creamy arborio rice with wild mushrooms and black truffle shavings',
    price: 28,
    category: 'mains',
    image: 'photo-1518770660439-4636190af475',
    rating: 4.8,
    reviews: []
  },
  {
    id: '2',
    name: 'Pan-Seared Salmon',
    description: 'Atlantic salmon with lemon herb butter and seasonal vegetables',
    price: 32,
    category: 'mains',
    image: 'photo-1506744038136-46273834b3fb',
    rating: 4.6,
    reviews: []
  },
  {
    id: '3',
    name: 'Burrata Caprese',
    description: 'Fresh burrata with heirloom tomatoes and basil oil',
    price: 18,
    category: 'appetizers',
    image: 'photo-1500375592092-40eb2168fd21',
    rating: 4.7,
    reviews: []
  },
  {
    id: '4',
    name: 'Chocolate Soufflé',
    description: 'Warm chocolate soufflé with vanilla bean ice cream',
    price: 14,
    category: 'desserts',
    image: 'photo-1582562124811-c09040d0a901',
    rating: 4.9,
    reviews: []
  },
  {
    id: '5',
    name: 'Beef Tenderloin',
    description: 'Grass-fed beef tenderloin with red wine reduction',
    price: 45,
    category: 'mains',
    image: 'photo-1649972904349-6e44c42644a7',
    rating: 4.8,
    reviews: []
  },
  {
    id: '6',
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce with parmesan and house-made croutons',
    price: 16,
    category: 'appetizers',
    image: 'photo-1581091226825-a6a2a5aee158',
    rating: 4.5,
    reviews: []
  }
];

export const categories = [
  { id: 'appetizers', name: 'Appetizers', description: 'Start your meal right' },
  { id: 'mains', name: 'Main Courses', description: 'Our signature dishes' },
  { id: 'desserts', name: 'Desserts', description: 'Sweet endings' },
  { id: 'beverages', name: 'Beverages', description: 'Drinks & wines' }
];
