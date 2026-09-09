import express from "express";

import {
  registerCompany,
  getAllCompany,
  getCompanyById,
  updateCompany,
} from "../controllers/companycontroller.js";

import authenticateToken from "../middleware/IsAuthacated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

// Create company
router
  .route("/register")
  .post(
    authenticateToken,
    registerCompany
  );

// Get all companies
router
  .route("/get")
  .get(
    authenticateToken,
    getAllCompany
  );

// Get company by ID
router
  .route("/get/:id")
  .get(
    authenticateToken,
    getCompanyById
  );

// Update company
router
  .route("/update/:id")
  .put(
    authenticateToken,
    singleUpload,
    updateCompany
  );

export default router;