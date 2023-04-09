import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      token.replace(/\r?\n|\r/g, "");
      const decoded = jwt.verify(token, "mostafa.mohamed.mostafa");

      req.user = await User.findById(decoded._id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token is not correct");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized!!");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("You are not a admin");
  }
};

export { protect, admin };
