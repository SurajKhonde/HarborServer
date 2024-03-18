const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { sendError } = require("../helper/helper");
exports.create = async (req, res) => {
  const { name, email, password } = req.body;
  const oldUser = await User.findOne({ email });
  if (oldUser) return sendError(res, "This email is already in use!");
  const newUser = new User({ name, email, password });
  await newUser.save();
   
  const jwtToken = jwt.sign({user_id: newUser._id },"1254455555555");
  res.status(201).json({
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: jwtToken,

    },
  });
  
};
exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return sendError(res, "Email/Password mismatch!");

  const matched = await user.comparePassword(password);
  if (!matched) return sendError(res, "Email/Password mismatch!");

  const { _id, name} = user;

  const jwtToken = jwt.sign({user_id: _id},"1254455555555");

  res.json({
    user: { id: _id, name, email, token: jwtToken},
  });
};
