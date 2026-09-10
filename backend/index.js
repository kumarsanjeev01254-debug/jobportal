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

// ================= DATABASE =================
connectDB();

// ================= CORS =================

const allowedOrigins = [
  "http://localhost:5173",
  "https://jobportal-3-bguc.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow Postman/server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("CORS BLOCKED ORIGIN:", origin);

      return callback(new Error("Not allowed by CORS"));
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "PATCH",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

// ================= MIDDLEWARE =================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ================= ROUTES =================

app.use("/api/users", userRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/applicant", applicantRoutes);

// ================= TEST =================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Job Portal Backend is running",
  });
});

// ================= SERVER =================

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
