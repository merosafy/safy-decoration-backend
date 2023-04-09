import asyncHandler from "express-async-handler";
import Article from "../models/articlemodel.js";

const getArticles = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const articles = await Article.find({ ...keyword });
  res.json(articles);
});

const getArticleById = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);
  article.views++;
  await article.save();

  if (article) {
    res.json(article);
  } else {
    res.status(404);
    throw new Error("Article not Found");
  }
});

const deleteArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (article) {
    await article.remove();
    res.json({ message: "Article Deleted" });
  } else {
    res.status(404);
    throw new Error("Article not Found");
  }
});

const createArticle = asyncHandler(async (req, res) => {
  const article = new Article({
    title: req.body.title,
    user: req.user._id,
    imageUrl: req.body.imageUrl,
     
    writer: req.body.writer,
    category: req.body.category,
    views: 0,
    desc: req.body.desc,
  });

  const createdArticle = await article.save();
  res.status(201).json(createdArticle);
});

const updateArticle = asyncHandler(async (req, res) => {
  // const { title, imageUrl, writer, category, desc } = req.body;

  const article = await Article.findById(req.params.id);

  if (article) {
    article.title = req.body.title;
    article.writer = req.body.writer;
    article.imageUrl = req.body.imageUrl;
    article.category = req.body.category;
    article.desc = req.body.desc;

    const updatedArticle = await article.save();
    res.status(201).json(updatedArticle);
  } else {
    res.status(404);
    throw new Error("Article not Found");
  }
});

const createArticleReview = asyncHandler(async (req, res) => {

  const article = await Article.findById(req.params.id);

  if (article) {
   const review = {
        name:req.body.name,
        comment:req.body.comment,
       
       
      };
   


    
      article.reviews.push(review);

      article.numReviews = article.reviews.length;

      

      await article.save();
      res.status(201).json({ message: "Reviewed Successfully" });
   
  } else {
    res.status(404);
    throw new Error("Article not Found");
  }
});

const getLatestArticles = asyncHandler(async (req, res) => {
  const articles = await Article.find().sort({ _id: -1 }).limit(15);

  if (articles) {
    res.json(articles);
  } else {
    res.status(404);
    throw new Error("Articles not Found");
  }
});

const getTrendingArticles = asyncHandler(async (req, res) => {
  const articles = await Article.find().sort({ views: -1, _id: -1 }).limit(15);

  if (articles) {
    res.json(articles);
  } else {
    res.status(404);
    throw new Error("Article not Found");
  }
});

export {
  getArticles,
  getArticleById,
  getLatestArticles,
  getTrendingArticles,
  deleteArticle,
  updateArticle,
  createArticle,
  createArticleReview,
};
