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

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "https://jobportal-2-sly8.onrender.com",
  credentials: true,
}




app.use(cors(corsOptions));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/applicant", applicantRoutes)

const PORT = process.env.PORT || 5001;

// Connect to database
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

