import express from "express";
const router = express.Router();
import {
  authUser,
  deleteUser,
  getAllUsers,
  getUser,
  getUserById,
  registerUser,
  updateUser,
  updateUserById,
} from "../controllers/userControllers.js";
import { admin, protect } from "../middleware/authMiddleware.js";

router.post("/", registerUser);
router.route("/").get(protect, admin, getAllUsers);
router.post("/signin", authUser);
router.route("/profile").get(protect, getUser).put(protect, updateUser);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUserById);

export default router;
