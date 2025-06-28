// src/components/FoodDisplay.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from "../../context/AuthContext.jsx";
import { collection, query, where, onSnapshot } from 'firebase/firestore';

function FoodDisplay({ restaurantId }) {
  const { db, auth } = useAuth();
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!db || !restaurantId) return;

    setLoading(true);
    setError('');
    // Listen to food items specific to this restaurant from the public collection
    const foodCollectionRef = collection(db, 'artifacts', auth.currentUser?.uid || 'anonymous', 'public', 'restaurants', restaurantId, 'foodItems');
    const q = query(foodCollectionRef, where('isAvailable', '==', true)); // Show only available food to users

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedFoodItems = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFoodItems(fetchedFoodItems);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching food items:", err);
      setError("Failed to load food items.");
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener
  }, [db, restaurantId, auth.currentUser]);

  if (loading) {
    return <p className="text-center text-gray-400">Loading food items...</p>;
  }

  if (error) {
    return <p className="text-center text-red-400">{error}</p>;
  }

  if (foodItems.length === 0) {
    return <p className="text-center text-gray-400">No food items currently available.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-gray-900 rounded-lg shadow-inner">
      {foodItems.map(item => (
        <div key={item.id} className="bg-gray-700 rounded-lg p-4 shadow-md border border-gray-600 flex flex-col items-center">
          <img src={item.image || 'https://placehold.co/150x100/888888/FFFFFF?text=Food'} alt={item.name} className="w-full h-32 object-cover rounded-md mb-3" />
          <h4 className="text-xl font-semibold text-white mb-1">{item.name}</h4>
          <p className="text-gray-300 text-sm mb-2">Price: ${item.price.toFixed(2)}</p>
          <span className="font-bold text-green-400">Available</span>
        </div>
      ))}
    </div>
  );
}

export default FoodDisplay;
