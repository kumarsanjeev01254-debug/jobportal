import express from "express";

import {
  register,
  login,
  logout,
  updateProfile,
  getProfile,
} from "../controllers/usercontrollers.js";

import authenticateToken from "../middleware/IsAuthacated.js";

import { singleUpload } from "../middleware/multer.js";

const router = express.Router();


// ================= AUTH =================

router.post(
  "/register",
  singleUpload,
  register
);

router.post(
  "/login",
  login
);

router.post(
  "/logout",
  logout
);

router.get(
  "/profile",
  authenticateToken,
  getProfile
);

// ================= PROFILE =================

router.post(
  "/profile/update",
  authenticateToken,
  singleUpload,
  updateProfile
);

export default router;