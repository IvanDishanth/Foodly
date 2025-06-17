import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";
import imageRoutes from './routes/image.routes.js';
import path from 'path';
import paymentRoutes from './routes/payment.routes.js';






dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {res.send('API is running');});
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use("/api/users", userRoutes);
app.use("/uploads", express.static("uploads"));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use('/api', imageRoutes); 
app.use('/api/payment', paymentRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://ivandishanth:04EBcKL59gTZn3TS@cluster0.fjbzltb.mongodb.net/Foodly', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.log(err));


