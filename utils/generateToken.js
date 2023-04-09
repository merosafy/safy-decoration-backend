import jwt from "jsonwebtoken";

const generateToken = (user) => {
  return jwt.sign({ _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,}, "mostafa.mohamed.mostafa", {
    expiresIn: "30d",
  });
};

export default generateToken;
