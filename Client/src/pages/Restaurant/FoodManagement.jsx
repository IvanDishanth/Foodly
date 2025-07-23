// src/components/FoodManagement.jsx
import React, { useState, useEffect } from 'react';
import api from "../../api/axios";

// Food items are now passed as props from parent (RestaurantAdminDashboard)
function FoodManagement({ foodItems, setFoodItems }) {
  const [showAddFoodModal, setShowAddFoodModal] = useState(false);
  const [editingFood, setEditingFood] = useState(null);

  // Fetch foods from backend
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await api.get('/foods');
        setFoodItems(res.data);
      } catch (err) {
        console.error("Error fetching foods:", err);
      }
    };
    fetchFoods();
  }, [setFoodItems]);

  const handleToggleAvailability = async (id) => {
    const food = foodItems.find(item => item._id === id);
    try {
      await api.put(`/foods/${id}`, {
        ...food,
        isAvailable: !food.isAvailable,
      });
      const res = await api.get('/foods');
      setFoodItems(res.data);
    } catch (err) {
      alert("Error toggling availability");
      console.error(err);
    }
  };

  // Add or update food
  const handleAddOrUpdateFood = async (formData) => {
    try {
      if (editingFood) {
        await api.put(`/foods/${editingFood._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await api.post('/foods', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      // Refresh list
      const res = await api.get('/foods');
      setFoodItems(res.data);
      setEditingFood(null);
      setShowAddFoodModal(false);
    } catch (err) {
      alert("Error saving food item");
      console.error(err);
    }
  };

  // Delete food
  const handleDeleteFood = async (id) => {
    if (window.confirm("Are you sure you want to delete this food item?")) {
      try {
        await api.delete(`/foods/${id}`);
        // Refresh list
        const res = await api.get('/foods');
        setFoodItems(res.data);
      } catch (err) {
        alert("Error deleting food item");
        console.error(err);
      }
    }
  };

  return (
    <div className="bg-gray-900 p-1 rounded-lg">
      <h3 className="text-1xl font-bold text-yellow-400 mb-2 text-center">Manage Food Items</h3>
      <button
        onClick={() => { setEditingFood(null); setShowAddFoodModal(true); }}
        className="mb-4 px-2 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors shadow-md flex items-center justify-center mx-auto"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 fill-current" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
        Add New Food Item
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {foodItems.map(item => (
          <div key={item._id || item.id} className="bg-gray-700 rounded-lg p-4 shadow-md border border-gray-600 flex flex-col items-center">
            <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded-md mb-3" />
            <h4 className="text-xl font-semibold text-white mb-1">{item.name}</h4>
            <p className="text-gray-300 text-sm mb-2">Price: ${item.price.toFixed(2)}</p>
            <p className={`font-bold ${item.isAvailable ? 'text-green-400' : 'text-red-400'} mb-3`}>
              Status: {item.isAvailable ? 'Available' : 'Unavailable'}
            </p>
            <div className="flex space-x-2 w-full">
              <button
                onClick={() => handleToggleAvailability(item._id || item.id)}
                className={`flex-grow py-2 rounded-md transition-colors text-sm
                  ${item.isAvailable ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
              >
                {item.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
              </button>
              <button
                onClick={() => { setEditingFood(item); setShowAddFoodModal(true); }}
                className="py-2 px-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteFood(item._id || item.id)}
                className="py-2 px-3 bg-red-700 hover:bg-red-800 text-white rounded-md transition-colors text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddFoodModal && (
        <FoodFormModal
          onClose={() => setShowAddFoodModal(false)}
          onSave={handleAddOrUpdateFood}
          initialData={editingFood}
        />
      )}
    </div>
  );
}

// Sub-component for adding/editing a food item (Modal) - No Firebase changes needed here.
function FoodFormModal({ onClose, onSave, initialData }) {
  const [name, setName] = useState(initialData?.name || '');
  const [price, setPrice] = useState(initialData?.price || '');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialData?.image || 'https://placehold.co/100x70/888888/FFFFFF?text=Image');

  useEffect(() => {
    if (initialData?.image) {
      setImagePreview(initialData.image);
    }
  }, [initialData]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    if (imageFile) {
      formData.append('image', imageFile);
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-sm shadow-xl border border-gray-700 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white text-3xl font-bold">&times;</button>
        <h3 className="text-xl font-bold text-yellow-400 mb-4 text-center">{initialData ? 'Edit Food Item' : 'Add New Food Item'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center mb-4">
            <img src={imagePreview} alt="Food Item" className="w-32 h-24 object-cover rounded-md mb-2 border border-gray-600" />
            <label htmlFor="foodImage" className="px-3 py-1 bg-gray-600 hover:bg-gray-500 text-white text-sm rounded-md cursor-pointer">Upload Image</label>
            <input type="file" id="foodImage" className="hidden" accept="image/*" onChange={handleFileChange} />
          </div>
          <input
            type="text"
            placeholder="Food Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-500 outline-none"
            required
          />
          <input
            type="number"
            step="0.01"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-500 outline-none"
            required
          />
          <div className="flex justify-end space-x-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FoodManagement;