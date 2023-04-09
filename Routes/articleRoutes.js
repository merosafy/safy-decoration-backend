import express from "express";
const router = express.Router();
import {
  createArticle,
  createArticleReview,
  deleteArticle,
  getArticleById,
  getArticles,
  getLatestArticles,
  getTrendingArticles,
  updateArticle,
} from "../controllers/articleControllers.js";
import { admin, protect } from "../middleware/authMiddleware.js";

router.route("/all").get(getArticles);

router.route("/").post(protect,admin, createArticle);

router.route("/trending").get(getTrendingArticles);

router.route("/latest").get(getLatestArticles);

router
  .route("/:id")
  .get(getArticleById)
  .delete(protect,admin, deleteArticle)
  .put(protect,admin, updateArticle);

router.route("/:id/reviews").post( createArticleReview);

export default router;
