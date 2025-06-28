// src/components/TableDisplay.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from "../../context/AuthContext.jsx";
import { collection, query, where, onSnapshot } from 'firebase/firestore';

function TableDisplay({ restaurantId }) {
  const { db, auth } = useAuth();
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!db || !restaurantId) return;

    setLoading(true);
    setError('');
    // Listen to tables specific to this restaurant from the public collection
    // This assumes tables are stored in a subcollection under the restaurant's public data
    const tablesCollectionRef = collection(db, 'artifacts', auth.currentUser?.uid || 'anonymous', 'public', 'restaurants', restaurantId, 'tables');
    const q = query(tablesCollectionRef, where('isAvailable', '==', true)); // Show only available tables to users

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedTables = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTables(fetchedTables);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching tables:", err);
      setError("Failed to load tables.");
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener
  }, [db, restaurantId, auth.currentUser]);

  if (loading) {
    return <p className="text-center text-gray-400">Loading tables...</p>;
  }

  if (error) {
    return <p className="text-center text-red-400">{error}</p>;
  }

  if (tables.length === 0) {
    return <p className="text-center text-gray-400">No tables currently available.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-gray-900 rounded-lg shadow-inner">
      {tables.map(table => (
        <div key={table.id} className="bg-gray-700 rounded-lg p-4 shadow-md border border-gray-600 flex flex-col items-center">
          <img src={table.image || 'https://placehold.co/150x100/888888/FFFFFF?text=Table'} alt={table.name} className="w-full h-32 object-cover rounded-md mb-3" />
          <h4 className="text-xl font-semibold text-white mb-1">{table.name}</h4>
          <p className="text-gray-300 text-sm mb-2">Capacity: {table.capacity}</p>
          <span className="font-bold text-green-400">Available</span>
        </div>
      ))}
    </div>
  );
}

export default TableDisplay;
