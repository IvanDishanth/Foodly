import express from 'express';
import upload from '../config/multer.js'; // adjust path if needed

const router = express.Router();

router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  res.json({
    message: 'Upload successful',
    url: req.file.path,        // Cloudinary image URL
    public_id: req.file.filename, // Cloudinary public ID
  });
});

export default router;
