const jwt = require("jsonwebtoken");
const { sendError } = require("../helper/helper");
const User = require("../models/user");
exports.isAuth = async (req, res, next) => {
  const token = req.headers?.authorization;
  if (!token) return sendError(res, "Invalid token!");
  const jwtToken = token.split("Bearer ")[1];

  if (!jwtToken) return sendError(res, "Invalid token!");
  const decode = jwt.verify(jwtToken,"1254455555555");
  const { user_id } = decode;
  const user = await User.findById(user_id);
  if (!user) return sendError(res, "unauthorized access!");

  req.user = user;

  next();
};
