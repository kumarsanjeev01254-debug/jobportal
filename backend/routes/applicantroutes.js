
import express from "express";

import authenticateToken from "../middleware/IsAuthacated.js";

import {
  applyjobs,
  getApplicants,
  getAppliedjobs,
  updateStatus,
} from "../controllers/applicatoncontrollers.js";

const router = express.Router();

// =====================================================
// Apply for Job
// Frontend:
// POST /api/applicant/apply/:id
// =====================================================
router
  .route("/apply/:id")
  .post(authenticateToken, applyjobs);

// =====================================================
// Get Jobs Applied By Current User
// GET /api/applicant/get
// =====================================================
router
  .route("/get")
  .get(authenticateToken, getAppliedjobs);

// =====================================================
// Get Applicants For A Job
// GET /api/applicant/:id/applicants
// =====================================================
router
  .route("/:id/applicants")
  .get(authenticateToken, getApplicants);

// =====================================================
// Update Application Status
// POST /api/applicant/status/:id/update
// =====================================================
router
  .route("/status/:id/update")
  .post(authenticateToken, updateStatus);

export default router;

