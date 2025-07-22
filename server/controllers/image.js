import path from 'path';
import fs from 'fs';

// POST: Upload/Update table image
export const uploadTableImage = async (req, res) => {
  try {
    const tableId = req.params.id;
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }
    const imagePath = `/uploads/${req.file.filename}`;
    const updated = await Table.findByIdAndUpdate(
      tableId,
      { image: imagePath },
      { new: true }
    );
    res.status(200).json({ message: 'Image uploaded', table: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error uploading image', error: err.message });
  }
};

// GET: Serve table image
export const getTableImage = async (req, res) => {
  try {
    const tableId = req.params.id;
    const table = await Table.findById(tableId);
    if (!table || !table.image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    const imagePath = path.join(process.cwd(), 'public', table.image);
    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ message: 'Image file not found' });
    }
    res.sendFile(imagePath);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching image', error: err.message });
  }
};