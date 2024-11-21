import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connecttoDB from "./db.js";
import userRoute from "./routes/user.route.js";
import buyandcart from "./routes/buyandcart.controller.js";
import plantRoute from "./routes/plant.route.js";
import dotenv from "dotenv";
dotenv.config({});

const app = express();

const PORT = 3001;

// Allowed Origins
const allowedOrigins = [
  "http://localhost:5173",                // Local Development Frontend
  "https://plant3-two.vercel.app",  // Production Frontend
];

// Dynamic CORS Options
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error("Not allowed by CORS")); // Block the request
    }
  },
  credentials: true, // Allow cookies and credentials
};

app.use(cors(corsOptions)); // Use updated CORS settings
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

// Root Route
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "i am coming from backend",
    success: true,
  });
});

// Routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/plant", plantRoute);
app.use("/api/v1/buy_or_cart", buyandcart);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  connecttoDB();
});
