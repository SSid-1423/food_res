
import { Dish } from '@/types';

export const menuData: Dish[] = [
  // Appetizers
  {
    id: '1',
    name: 'Paneer Tikka',
    description: 'Marinated cottage cheese cubes grilled to perfection with aromatic spices',
    price: 180,
    category: 'appetizers',
    image: 'photo-1567188040759-fb8a883dc6d8',
    rating: 4.8,
    reviews: []
  },
  {
    id: '2',
    name: 'Chicken Seekh Kebab',
    description: 'Minced chicken marinated with herbs and spices, grilled on skewers',
    price: 220,
    category: 'appetizers',
    image: 'photo-1599487488170-d11ec9c172f0',
    rating: 4.7,
    reviews: []
  },
  {
    id: '3',
    name: 'Vegetable Spring Rolls',
    description: 'Crispy rolls filled with fresh vegetables and served with sweet chili sauce',
    price: 150,
    category: 'appetizers',
    image: 'photo-1544025162-d76694265947',
    rating: 4.5,
    reviews: []
  },
  {
    id: '4',
    name: 'Fish Amritsari',
    description: 'Batter-fried fish pieces marinated in traditional Punjabi spices',
    price: 280,
    category: 'appetizers',
    image: 'photo-1565299624946-b28f40a0ca4b',
    rating: 4.9,
    reviews: []
  },

  // Main Courses
  {
    id: '5',
    name: 'Butter Chicken',
    description: 'Tender chicken in rich tomato and cream gravy with aromatic spices',
    price: 320,
    category: 'mains',
    image: 'photo-1565557623262-b51c2513a641',
    rating: 4.9,
    reviews: []
  },
  {
    id: '6',
    name: 'Dal Makhani',
    description: 'Creamy black lentils slow-cooked with butter and spices',
    price: 240,
    category: 'mains',
    image: 'photo-1546833999-b9f581a1996d',
    rating: 4.8,
    reviews: []
  },
  {
    id: '7',
    name: 'Paneer Butter Masala',
    description: 'Cottage cheese cubes in rich tomato and cashew gravy',
    price: 280,
    category: 'mains',
    image: 'photo-1631452180519-c014fe946bc7',
    rating: 4.7,
    reviews: []
  },
  {
    id: '8',
    name: 'Biryani (Chicken)',
    description: 'Fragrant basmati rice cooked with marinated chicken and aromatic spices',
    price: 380,
    category: 'mains',
    image: 'photo-1563379091339-03246963d13a',
    rating: 4.9,
    reviews: []
  },
  {
    id: '9',
    name: 'Fish Curry',
    description: 'Fresh fish cooked in coconut milk with traditional coastal spices',
    price: 350,
    category: 'mains',
    image: 'photo-1585032226651-759b368d7246',
    rating: 4.6,
    reviews: []
  },
  {
    id: '10',
    name: 'Mutton Rogan Josh',
    description: 'Tender mutton pieces in rich Kashmiri-style aromatic gravy',
    price: 420,
    category: 'mains',
    image: 'photo-1599487488170-d11ec9c172f0',
    rating: 4.8,
    reviews: []
  },

  // Rice & Breads
  {
    id: '11',
    name: 'Garlic Naan',
    description: 'Fresh baked bread topped with garlic and coriander',
    price: 80,
    category: 'breads',
    image: 'photo-1571091655789-405eb7a3a3a8',
    rating: 4.7,
    reviews: []
  },
  {
    id: '12',
    name: 'Vegetable Fried Rice',
    description: 'Wok-tossed rice with fresh vegetables and soy sauce',
    price: 180,
    category: 'rice',
    image: 'photo-1603133872878-684f208fb84b',
    rating: 4.5,
    reviews: []
  },
  {
    id: '13',
    name: 'Chicken Roll',
    description: 'Spiced chicken wrapped in soft roomali roti with mint chutney',
    price: 160,
    category: 'appetizers',
    image: 'photo-1590301157890-4810ed352733',
    rating: 4.6,
    reviews: []
  },
  {
    id: '14',
    name: 'Veg Roll',
    description: 'Mixed vegetables with paneer wrapped in soft roti',
    price: 120,
    category: 'appetizers',
    image: 'photo-1590301157890-4810ed352733',
    rating: 4.4,
    reviews: []
  },

  // Desserts
  {
    id: '15',
    name: 'Gulab Jamun',
    description: 'Soft milk dumplings in rose-flavored sugar syrup',
    price: 120,
    category: 'desserts',
    image: 'photo-1578662996442-48f60103fc96',
    rating: 4.8,
    reviews: []
  },
  {
    id: '16',
    name: 'Chocolate Brownie',
    description: 'Warm chocolate brownie served with vanilla ice cream',
    price: 180,
    category: 'desserts',
    image: 'photo-1606313564200-e75d5e30476c',
    rating: 4.7,
    reviews: []
  },
  {
    id: '17',
    name: 'Kulfi',
    description: 'Traditional Indian ice cream with pistachios and cardamom',
    price: 100,
    category: 'desserts',
    image: 'photo-1571197119282-2ca6ba5c9ce2',
    rating: 4.6,
    reviews: []
  },

  // Beverages
  {
    id: '18',
    name: 'Mango Lassi',
    description: 'Refreshing yogurt drink blended with fresh mango pulp',
    price: 80,
    category: 'beverages',
    image: 'photo-1577805947697-89e18249d767',
    rating: 4.7,
    reviews: []
  },
  {
    id: '19',
    name: 'Fresh Lime Soda',
    description: 'Sparkling water with fresh lime juice and mint',
    price: 60,
    category: 'beverages',
    image: 'photo-1571068316344-75bc76f77890',
    rating: 4.5,
    reviews: []
  },
  {
    id: '20',
    name: 'Masala Chai',
    description: 'Traditional Indian spiced tea with milk',
    price: 40,
    category: 'beverages',
    image: 'photo-1571934811356-5cc061b6821f',
    rating: 4.8,
    reviews: []
  }
];

export const categories = [
  { id: 'appetizers', name: 'Appetizers', description: 'Start your meal right' },
  { id: 'mains', name: 'Main Courses', description: 'Our signature dishes' },
  { id: 'breads', name: 'Breads', description: 'Fresh baked breads' },
  { id: 'rice', name: 'Rice & Biryanis', description: 'Aromatic rice dishes' },
  { id: 'desserts', name: 'Desserts', description: 'Sweet endings' },
  { id: 'beverages', name: 'Beverages', description: 'Refreshing drinks' }
];
