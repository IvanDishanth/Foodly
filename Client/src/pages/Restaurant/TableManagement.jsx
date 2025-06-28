// src/components/TableManagement.jsx
import React, { useState, useEffect } from 'react';

function TableManagement() {
  const [tables, setTables] = useState([
    { id: 1, name: 'Table 1 (Window)', capacity: 4, isAvailable: true, image: 'https://placehold.co/150x100/4CAF50/FFFFFF?text=T1' },
    { id: 2, name: 'Table 2 (Booth)', capacity: 6, isAvailable: false, image: 'https://placehold.co/150x100/FF0000/FFFFFF?text=T2' },
    { id: 3, name: 'Patio Table 1', capacity: 2, isAvailable: true, image: 'https://placehold.co/150x100/4CAF50/FFFFFF?text=T3' },
  ]);
  const [showAddTableModal, setShowAddTableModal] = useState(false);
  const [editingTable, setEditingTable] = useState(null); // Table being edited

  const handleToggleAvailability = (id) => {
    setTables(tables.map(table =>
      table.id === id ? { ...table, isAvailable: !table.isAvailable } : table
    ));
    // In a real app, update this on backend
    console.log(`Table ${id} availability toggled`);
  };

  const handleAddOrUpdateTable = (newTableData) => {
    if (editingTable) {
      // Update existing table
      setTables(tables.map(table =>
        table.id === editingTable.id ? { ...table, ...newTableData, image: newTableData.imageFile ? URL.createObjectURL(newTableData.imageFile) : table.image } : table
      ));
      console.log("Updated Table:", newTableData);
    } else {
      // Add new table
      const newId = Math.max(...tables.map(t => t.id), 0) + 1;
      setTables([...tables, { ...newTableData, id: newId, isAvailable: true, image: newTableData.imageFile ? URL.createObjectURL(newTableData.imageFile) : 'https://placehold.co/150x100/888888/FFFFFF?text=New+Table' }]);
      console.log("Added New Table:", newTableData);
    }
    setEditingTable(null);
    setShowAddTableModal(false);
    // Send to backend
  };

  const handleDeleteTable = (id) => {
    if (window.confirm("Are you sure you want to delete this table?")) { // Use custom modal in real app
      setTables(tables.filter(table => table.id !== id));
      console.log(`Table ${id} deleted`);
      // Delete from backend
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h3 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Manage Tables</h3>
      <button
        onClick={() => { setEditingTable(null); setShowAddTableModal(true); }}
        className="mb-6 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors shadow-md flex items-center justify-center mx-auto"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 fill-current" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
        Add New Table
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tables.map(table => (
          <div key={table.id} className="bg-gray-700 rounded-lg p-4 shadow-md border border-gray-600 flex flex-col items-center">
            <img src={table.image} alt={table.name} className="w-full h-32 object-cover rounded-md mb-3" />
            <h4 className="text-xl font-semibold text-white mb-1">{table.name}</h4>
            <p className="text-gray-300 text-sm mb-2">Capacity: {table.capacity}</p>
            <p className={`font-bold ${table.isAvailable ? 'text-green-400' : 'text-red-400'} mb-3`}>
              Status: {table.isAvailable ? 'Available' : 'Unavailable'}
            </p>
            <div className="flex space-x-2 w-full">
              <button
                onClick={() => handleToggleAvailability(table.id)}
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
                onClick={() => handleDeleteTable(table.id)}
                className="py-2 px-3 bg-red-700 hover:bg-red-800 text-white rounded-md transition-colors text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

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

// Sub-component for adding/editing a table (Modal)
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
      setImagePreview(URL.createObjectURL(file)); // Create URL for immediate preview
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, capacity: parseInt(capacity), imageFile });
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
