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


// ================= MIDDLEWARE =================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// ================= CORS =================

const allowedOrigins = [
  "http://localhost:5173",
  "https://jobportal-3-bguc.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without an origin
      // and requests from allowed websites
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


// ================= ROUTES =================

app.use("/api/users", userRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/applicant", applicantRoutes);


// ================= PORT =================

const PORT = process.env.PORT || 5001;


// ================= DATABASE =================

connectDB();


// ================= SERVER =================

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
