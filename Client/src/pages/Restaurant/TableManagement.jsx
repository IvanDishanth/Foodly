// src/components/TableManagement.jsx (With Firebase)
// Note: This version includes the integration with the backend API using axios for CRUD operations.

import React, { useState, useEffect } from "react";
import api from "../../api/axios";

// Tables are now passed as props from parent (RestaurantAdminDashboard)
function TableManagement({ tables, setTables }) {
  const [showAddTableModal, setShowAddTableModal] = useState(false);
  const [editingTable, setEditingTable] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const tablesPerPage = 3;
  const totalPages = Math.ceil((tables?.length || 0) / tablesPerPage);
  const indexOfLastTable = currentPage * tablesPerPage;
  const indexOfFirstTable = indexOfLastTable - tablesPerPage;
  const currentTables = (Array.isArray(tables) ? tables : []).slice(indexOfFirstTable, indexOfLastTable);

  // Fetch tables from backend on mount
  useEffect(() => {
    async function fetchTables() {
      try {
        const res = await api.get("/tables");
        setTables(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching tables:", err);
      }
    }
    fetchTables();
  }, [setTables]);

  // Add or update table
  const handleAddOrUpdateTable = async (formData) => {
    try {
      if (editingTable) {
        // Update
        const res = await api.put(
          `/tables/${editingTable._id}`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        setTables(tables.map(t => t._id === editingTable._id ? res.data : t));
      } else {
        // Add
        const res = await api.post(
          "/tables",
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        setTables([...tables, res.data]);
      }
      setEditingTable(null);
      setShowAddTableModal(false);
    } catch (err) {
      console.error("Error saving table:", err);
    }
  };

  // Delete table
  const handleDeleteTable = async (id) => {
    try {
      await api.delete(`/tables/${id}`);
      setTables(tables.filter(t => t._id !== id));
    } catch (err) {
      console.error("Error deleting table:", err);
    }
  };

  // Toggle table availability
  const handleToggleAvailability = async (id) => {
    const table = tables.find(t => t._id === id);
    try {
      const res = await api.put(
        `/tables/${id}`,
        { isAvailable: !table.isAvailable }
      );
      setTables(tables.map(t => t._id === id ? res.data : t));
    } catch (err) {
      console.error("Error updating table:", err);
    }
  };

  return (
    <div className="bg-gray-900 p-0 rounded-lg">
      <h3 className="text-1xl font-bold text-yellow-400 mb-2 text-center">Manage Tables</h3>
      <button
        onClick={() => { setEditingTable(null); setShowAddTableModal(true); }}
        className="mb-4 px-2 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors shadow-md flex items-center justify-center mx-auto"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 fill-current" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
        Add New Table
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentTables.map(table => (
          <div key={table._id || table.id} className="bg-gray-700 rounded-lg p-4 shadow-md border border-gray-600 flex flex-col items-center">
            <img src={table.image} alt={table.name} className="w-full h-32 object-cover rounded-md mb-3" />
            <h4 className="text-xl font-semibold text-white mb-1">{table.name}</h4>
            <p className="text-gray-300 text-sm mb-2">Capacity: {table.capacity}</p>
            <p className={`font-bold ${table.isAvailable ? 'text-green-400' : 'text-red-400'} mb-3`}>
              Status: {table.isAvailable ? 'Available' : 'Unavailable'}
            </p>
            <div className="flex space-x-2 w-full">
              <button
                onClick={() => handleToggleAvailability(table._id || table.id)}
                className={`flex-grow py-2 rounded-md transition-colors text-sm
                  ${table.isAvailable ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
              >
                {table.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
              </button>
              <button
                onClick={() => { setEditingTable(table); setShowAddTableModal(true); }}
                className="py-2 px-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTable(table._id || table.id)}
                className="py-2 px-3 bg-red-700 hover:bg-red-800 text-white rounded-md transition-colors text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-600 text-white disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx + 1}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1 rounded-full font-semibold transition-colors duration-150 ${
                currentPage === idx + 1 ? 'bg-yellow-500 text-white' : 'bg-gray-700 text-gray-200 hover:bg-yellow-600 hover:text-white'
              }`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-600 text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {showAddTableModal && (
        <TableFormModal
          onClose={() => setShowAddTableModal(false)}
          onSave={handleAddOrUpdateTable}
          initialData={editingTable}
        />
      )}
    </div>
  );
}

// Sub-component for adding/editing a table (Modal) - No Firebase changes needed here.
function TableFormModal({ onClose, onSave, initialData }) {
  const [name, setName] = useState(initialData?.name || '');
  const [capacity, setCapacity] = useState(initialData?.capacity || '');
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
    formData.append('capacity', capacity);
    if (imageFile) {
      formData.append('image', imageFile);
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-sm shadow-xl border border-gray-700 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white text-3xl font-bold">&times;</button>
        <h3 className="text-xl font-bold text-yellow-400 mb-4 text-center">{initialData ? 'Edit Table' : 'Add New Table'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center mb-4">
            <img src={imagePreview} alt="Table" className="w-32 h-24 object-cover rounded-md mb-2 border border-gray-600" />
            <label htmlFor="tableImage" className="px-3 py-1 bg-gray-600 hover:bg-gray-500 text-white text-sm rounded-md cursor-pointer">Upload Image</label>
            <input type="file" id="tableImage" className="hidden" accept="image/*" onChange={handleFileChange} />
          </div>
          <input
            type="text"
            placeholder="Table Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-500 outline-none"
            required
          />
          <input
            type="number"
            placeholder="Capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
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

export default TableManagement;
