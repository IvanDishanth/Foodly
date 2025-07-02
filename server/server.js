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
import bookingRoutes from './routes/bookingRoutes.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true                
}));
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
app.use("/api/Restaurants", authRoutes); 
app.use('/api/bookings', bookingRoutes);
app.get('/test-env', (req, res) => {
  res.send(process.env.JWT_SECRET || 'JWT not set');
});
app.post('/api/signup', (req, res) => {
  const { name, email, phone, password } = req.body;
  res.status(201).json({ message: 'Signup successful!' });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  res.status(200).json({ message: 'Login successful!' });
});


app.get('/api/', (req, res) => {
  res.json({ message: "API root is working" });
});



mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://ivandishanth:6YRs6ZWD4Ja7556s@cluster0.mgaws4t.mongodb.net/FoodlyApp')
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log(err));


