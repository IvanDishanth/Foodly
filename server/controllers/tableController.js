// controllers/tableController.js
import Table from '../models/Table.model.js';

// Get all tables for a restaurant
export const getTables = async (req, res) => {
  try {
    const tables = await Table.find({ restaurant: req.user.restaurantId });
    res.status(200).json(tables);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving tables', error });
  }
};

// Create a new table
export const createTable = async (req, res) => {
  const { name, capacity } = req.body;
  const restaurantId = req.user.restaurantId;
  const image = req.file ? req.file.path : null;

  const newTable = new Table({
    name,
    capacity,
    image,
    restaurant: restaurantId,
  });

  try {
    const savedTable = await newTable.save();
    res.status(201).json(savedTable);
  } catch (error) {
    res.status(400).json({ message: 'Error creating table', error });
  }
};

// Update a table
export const updateTable = async (req, res) => {
  const { id } = req.params;
  const { name, capacity, isAvailable } = req.body;
  const image = req.file ? req.file.path : req.body.image;

  try {
    const updatedTable = await Table.findByIdAndUpdate(
      id,
      { name, capacity, isAvailable, image },
      { new: true }
    );
    if (!updatedTable) {
      return res.status(404).json({ message: 'Table not found' });
    }
    res.status(200).json(updatedTable);
  } catch (error) {
    res.status(400).json({ message: 'Error updating table', error });
  }
};

// Delete a table
export const deleteTable = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTable = await Table.findByIdAndDelete(id);
    if (!deletedTable) {
      return res.status(404).json({ message: 'Table not found' });
    }
    res.status(200).json({ message: 'Table deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting table', error });
  }
};
