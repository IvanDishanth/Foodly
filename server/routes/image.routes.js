// routes/image.routes.js
import express from "express";
import upload from "../middleware/upload.js";

const router = express.Router();

// Upload single image
router.post("/upload", upload.single("image"), (req, res) => {
  try {
    res.status(200).json({
      message: "Image uploaded successfully",
      imageUrl: `/uploads/${req.file.filename}`, // Send back image path
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload image" });
  }
});

export default router;
