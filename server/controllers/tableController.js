import Table from '../models/Table.model.js';

// Get all tables for a restaurant
export const getTablesByRestaurant = async (req, res) => {
  try {
    const restaurantId = req.user.restaurantId; // or from query
    const tables = await Table.find({ restaurant: restaurantId });
    res.status(200).json(tables);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tables', error: err.message });
  }
};

// Add a new table
export const addTable = async (req, res) => {
  try {
    const { name, capacity } = req.body;
    const restaurantId = req.user.restaurantId;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newTable = new Table({
      restaurant: restaurantId,
      name,
      capacity,
      image,
    });

    const saved = await newTable.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Error adding table', error: err.message });
  }
};

// Update table
export const updateTable = async (req, res) => {
  try {
    const tableId = req.params.id;
    const updated = await Table.findByIdAndUpdate(tableId, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating table', error: err.message });
  }
};

// Delete table
export const deleteTable = async (req, res) => {
  try {
    const tableId = req.params.id;
    await Table.findByIdAndDelete(tableId);
    res.status(200).json({ message: 'Table deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting table', error: err.message });
  }
};
