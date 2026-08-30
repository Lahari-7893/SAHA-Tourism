export const foodItems = [
  {
    id: 'food_1',
    name: 'Andhra Meals (Thali)',
    description: 'A traditional full-course meal served on a banana leaf, featuring rice, pappu (dal), sambar, rasam, curries, pachadi (chutney), and curd. Extremely spicy and flavorful.',
    category: 'restaurant',
    vegetarian: true,
    approximatePrice: 150, // INR
    destinations: ['dest_vjw', 'dest_vzg', 'dest_rjy', 'dest_tpt', 'dest_amaravati', 'dest_gandikota'],
    image: 'https://images.unsplash.com/photo-1626779836474-06cba6e8e202?auto=format&fit=crop&q=80',
    isApproximate: true
  },
  {
    id: 'food_2',
    name: 'Pesarattu Upma',
    description: 'A popular Andhra breakfast crepe made from green gram (moong dal) batter, often filled with a savory semolina porridge (Upma).',
    category: 'street_food',
    vegetarian: true,
    approximatePrice: 60,
    destinations: ['dest_vjw', 'dest_vzg', 'dest_rjy', 'dest_kakinada'],
    image: 'https://images.unsplash.com/photo-1614725042846-953b1b6eb1b3?auto=format&fit=crop&q=80',
    isApproximate: true
  },
  {
    id: 'food_3',
    name: 'Gongura Mamsam (Mutton)',
    description: 'A quintessential Andhra non-vegetarian dish made with lamb/mutton and tangy Roselle leaves (Gongura). A must-try for spice lovers.',
    category: 'restaurant',
    vegetarian: false,
    approximatePrice: 350,
    destinations: ['dest_vjw', 'dest_rjy', 'dest_nellore', 'dest_kurnool'],
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80',
    isApproximate: true
  },
  {
    id: 'food_4',
    name: 'Pootharekulu',
    description: 'A unique and delicate sweet from Atreyapuram, made of paper-thin rice starch layers stuffed with sugar or jaggery and dry fruits.',
    category: 'sweet',
    vegetarian: true,
    approximatePrice: 200, // per box
    destinations: ['dest_rjy', 'dest_vjw', 'dest_kakinada', 'dest_konaseema'],
    image: 'https://images.unsplash.com/photo-1634797072559-0010996c9e01?auto=format&fit=crop&q=80',
    isApproximate: true
  },
  {
    id: 'food_5',
    name: 'Mirchi Bajji',
    description: 'Deep-fried banana pepper fritters stuffed with tamarind pulp and spices. A beloved evening street snack across the state.',
    category: 'street_food',
    vegetarian: true,
    approximatePrice: 40,
    destinations: ['dest_vjw', 'dest_vzg', 'dest_tpt', 'dest_kurnool', 'dest_nellore'],
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80',
    isApproximate: true
  },
  {
    id: 'food_6',
    name: 'Hyderabadi / Andhra Biryani',
    description: 'Spicy and aromatic rice dish cooked with meat (chicken or mutton) and secret spices. Andhra style is generally spicier than Hyderabadi.',
    category: 'restaurant',
    vegetarian: false,
    approximatePrice: 280,
    destinations: ['dest_vjw', 'dest_vzg', 'dest_rjy', 'dest_nellore'],
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80',
    isApproximate: true
  },
  {
    id: 'food_7',
    name: 'Filter Coffee',
    description: 'Strong traditional South Indian coffee brewed with a metal filter, served hot with frothy milk.',
    category: 'beverage',
    vegetarian: true,
    approximatePrice: 30,
    destinations: ['dest_vjw', 'dest_tpt', 'dest_araku', 'dest_vzg'],
    image: 'https://images.unsplash.com/photo-1557006021-b85faa2bc5e2?auto=format&fit=crop&q=80',
    isApproximate: true
  },
  {
    id: 'food_8',
    name: 'Araku Bamboo Chicken',
    description: 'Chicken marinated in tribal spices, stuffed into a bamboo shoot, and roasted over charcoal without oil. A specialty of the Araku region.',
    category: 'street_food',
    vegetarian: false,
    approximatePrice: 200,
    destinations: ['dest_araku'],
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80',
    isApproximate: true
  },
  {
    id: 'food_9',
    name: 'Pulihora',
    description: 'Tamarind rice tempered with peanuts, curry leaves, and green chilies. Often served as prasadam in temples.',
    category: 'street_food',
    vegetarian: true,
    approximatePrice: 50,
    destinations: ['dest_tpt', 'dest_vjw', 'dest_amaravati'],
    image: 'https://images.unsplash.com/photo-1614725042846-953b1b6eb1b3?auto=format&fit=crop&q=80',
    isApproximate: true
  },
  {
    id: 'food_10',
    name: 'Kakinada Kaja',
    description: 'A delicious, syrupy sweet pastry originating from Kakinada, known for its unique layered texture.',
    category: 'sweet',
    vegetarian: true,
    approximatePrice: 150, // per kg
    destinations: ['dest_kakinada', 'dest_rjy', 'dest_vzg'],
    image: 'https://images.unsplash.com/photo-1634797072559-0010996c9e01?auto=format&fit=crop&q=80',
    isApproximate: true
  }
];

export const getFoodByDestination = (destId) => {
  return foodItems.filter(food => food.destinations.includes(destId));
};

export const getFoodByCategory = (category) => {
  return foodItems.filter(food => food.category === category);
};

export const getAllFoodItems = () => {
  return foodItems;
};
