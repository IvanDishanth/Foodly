import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";
import imageRoutes from "./routes/image.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import bookingRouter from "./routes/booking.routes.js";
import tableRoutes from './routes/tableRoutes.js';
import foodRoutes from './routes/foodRoutes.js';
import restaurantRoutes from "./routes/restaurant.routes.js";








dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5000;

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// ✅ Add this block before routes
app.use(session({
  name: 'sessionId',
  secret: process.env.SESSION_SECRET || 'your-secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // use true only in HTTPS production
    sameSite: 'Lax' // 'Strict' is more secure, but may break some flows
  }
}));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get('/api', (req, res) => {
  res.send("API is running");
});

app.get("/test-env", (req, res) => {
  res.json({
    jwt: process.env.JWT_SECRET ? "Set" : "Not Set",
    mongo: process.env.MONGO_URI ? "Set" : "Not Set",
    stripe: process.env.STRIPE_SECRET_KEY ? "Set" : "Not Set",
  });
});

app.use("/api/auth", authRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/foods', foodRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/image", imageRoutes);
app.use('/api/admin/payments', paymentRoutes);
app.use('/api/bookings', bookingRouter);
app.use('/api/payments', paymentRoutes);
app.use("/api/restaurant", restaurantRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

let server;

const startServer = async () => {
  try {
    await connectDB();
    server = app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(` Port ${PORT} is already in use. Please close the other process or change the port.`);
        process.exit(1);
      }
    });

  } catch (err) {
    console.error(" Failed to start server:", err);
    process.exit(1);
  }
};

const gracefulShutdown = () => {
  console.log("Received kill signal, shutting down gracefully.");
  server.close(() => {
    console.log("Closed out remaining connections.");
    process.exit(0);
  });

  setTimeout(() => {
    console.error("Could not close connections in time, forcefully shutting down.");
    process.exit(1);
  }, 10000);
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
process.on("unhandledRejection", (err) => {
  console.error(" Unhandled Rejection:", err);
  process.exit(1);
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

startServer();
