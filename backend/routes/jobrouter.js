import express from "express";

import {
  createJob,
  getAllJobs,
  getJobById,
  getAdminJobs,
  updateJob,

} from "../controllers/jobcontroller.js";

import authenticateToken from "../middleware/IsAuthacated.js";

const router = express.Router();

// Public - everyone can see jobs
router
  .route("/get")
  .get(getAllJobs);

// Public - job details
router
  .route("/get/:id")
  .get(getJobById);

// Protected - recruiter creates job
router
  .route("/create")
  .post(authenticateToken, createJob);

// Protected - recruiter's jobs
router
  .route("/admin/jobs")
  .get(authenticateToken, getAdminJobs);

  
  router
  .route("/update/:id")
  .put(authenticateToken, updateJob);



export default router;