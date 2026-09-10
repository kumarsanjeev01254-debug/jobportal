import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./utils/db.js";
import userRoutes from "./routes/userrouter.js";
import companyRoutes from "./routes/companyroute.js";
import jobRoutes from "./routes/jobrouter.js";
import applicantRoutes from "./routes/applicantroutes.js";

dotenv.config();

const app = express();

// Connect Database
connectDB();

// CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://jobportal-3-bguc.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without origin
      // Example: Postman, server-to-server
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/applicant", applicantRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Job Portal Backend is running",
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
