// src/components/MenuDetails.jsx
import React from 'react';

function MenuDetails() {
  const menuCategories = [
    {
      name: 'Appetizers',
      items: [
        { id: 1, name: 'Crispy Calamari', price: '12.00', description: 'Served with marinara sauce' },
        { id: 2, name: 'Bruschetta', price: '9.00', description: 'Fresh tomatoes, basil, balsamic glaze' },
      ],
    },
    {
      name: 'Main Courses',
      items: [
        { id: 3, name: 'Grilled Salmon', price: '25.00', description: 'Lemon-dill sauce, asparagus' },
        { id: 4, name: 'Chicken Parmesan', price: '20.00', description: 'Breaded chicken, melted cheese, pasta' },
        { id: 5, name: 'Vegetable Lasagna', price: '18.00', description: 'Layers of pasta, ricotta, mixed veggies' },
      ],
    },
    {
      name: 'Desserts',
      items: [
        { id: 6, name: 'New York Cheesecake', price: '8.00', description: 'Classic creamy cheesecake' },
        { id: 7, name: 'Tiramisu', price: '9.00', description: 'Coffee-soaked ladyfingers, mascarpone cream' },
      ],
    },
    {
      name: 'Beverages',
      items: [
        { id: 8, name: 'Fresh Orange Juice', price: '5.00' },
        { id: 9, name: 'Espresso', price: '4.00' },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {menuCategories.map((category, index) => (
        <div key={index} className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
          <h3 className="text-2xl font-bold text-yellow-400 mb-4">{category.name}</h3>
          <ul className="space-y-4">
            {category.items.map((item) => (
              <li key={item.id} className="flex justify-between items-start pb-2 border-b border-gray-700 last:border-b-0">
                <div>
                  <p className="text-xl font-medium text-white">{item.name}</p>
                  {item.description && <p className="text-gray-400 text-sm">{item.description}</p>}
                </div>
                <p className="text-green-400 text-lg font-bold">${item.price}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default MenuDetails;
