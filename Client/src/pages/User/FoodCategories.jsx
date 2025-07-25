import React from 'react';
import { motion } from 'framer-motion';

const FoodCategories = ({ onCategorySelect }) => {
  const categories = [
    { name: 'Indian', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', },
    { name: 'Sri Lankan', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', },
    { name: 'Chinese', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', },
    { name: 'Thai', image: 'https://media.cnn.com/api/v1/images/stellar/prod/151215114545-40-thai-food-27-som-tam-1.jpg?q=w_1110,c_fill', },
    { name: 'Italian', image: 'https://lirp.cdn-website.com/a23f1af3/dms3rep/multi/opt/GettyImages-1190036539-640w.jpg', },
    { name: 'Japanese', image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {categories.map((category, index) => (
        <motion.div 
          key={index} 
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onCategorySelect(category.name)}
          className="relative rounded-xl overflow-hidden group cursor-pointer h-24"
        >
          <img 
            src={category.image} 
            alt={category.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className={`absolute inset-0 b-10 bg-gradient-to-t ${category.color} opacity-90 flex items-end p-4`}>
            <h3 className="text-white text-xl font-bold">{category.name}</h3>
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="bg-gray-700 text-[#FAB503]  px-3 py-1 rounded-full text-sm font-medium">
              View Restaurants
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FoodCategories;