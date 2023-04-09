import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, },
    
  },
  {
    timestamps: true,
  }
)

const articleSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    category: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
      default:
        "https://res.cloudinary.com/sambitsankalp/image/upload/v1627048522/MM%20tasks/Monday_Morning_2_gw5kzs.jpg",
    },
    title: {
      type: String,
      required: true,
    },
    writer: {
      type: String,
      required: true,
      default: "Anonymous",
    },
    desc: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    numLike: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

const Article = mongoose.model("Article", articleSchema);

export default Article;
