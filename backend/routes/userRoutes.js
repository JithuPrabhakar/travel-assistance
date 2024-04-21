import express from "express";
import {
  authUser,
  logoutUser,
  registerUser,
} from "../controllers/userControllers.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser);
router.route("/auth").post(authUser);
router.route("/logout").post(logoutUser);

export default router;
