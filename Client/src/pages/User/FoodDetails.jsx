// src/components/FoodDetails.jsx
import React from 'react';

function FoodDetails() {
  const foodItems = [
    {
      id: 1,
      name: 'Signature Beef Burger',
      image: '/images/food-burger.jpg',
      alt: 'Beef Burger',
      description: 'Juicy patty, fresh vegetables, special sauce, served with crispy fries.',
      price: '18.99',
    },
    {
      id: 2,
      name: 'Creamy Prawn Pasta',
      image: '/images/food-pasta.jpg',
      alt: 'Prawn Pasta',
      description: 'Al dente pasta tossed in a rich, creamy sauce with succulent prawns.',
      price: '22.50',
    },
    {
      id: 3,
      name: 'Vegetable Biryani',
      image: '/images/food-biryani.jpg',
      alt: 'Vegetable Biryani',
      description: 'Fragrant basmati rice cooked with mixed vegetables and aromatic spices.',
      price: '15.00',
    },
    {
      id: 4,
      name: 'Chocolate Lava Cake',
      image: '/images/food-dessert.jpg',
      alt: 'Chocolate Lava Cake',
      description: 'Warm chocolate cake with a molten center, served with vanilla ice cream.',
      price: '9.50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {foodItems.map((food) => (
        <div key={food.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 border border-gray-700">
          <img
            src={food.image}
            alt={food.alt}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://placehold.co/400x200/444444/FFFFFF?text=Food+${food.id}`;
            }}
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-yellow-400 mb-2">{food.name}</h3>
            <p className="text-gray-300 text-sm mb-2">{food.description}</p>
            <p className="text-green-400 text-lg font-bold">${food.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FoodDetails;
