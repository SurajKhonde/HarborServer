const express = require("express");
const {
  create,
  signIn
} = require("../controller/user");
const { isAuth } = require("../middleware/auth");
const {
  userValidtor,
  signInValidator,
  validate
} = require("../middleware/validator");

const router = express.Router();

router.post("/create", userValidtor,validate,create);
router.post("/sign-in", signInValidator,validate,signIn);
router.get("/is-auth", isAuth, (req, res) => {
  const { user } = req;
  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      
    },
  });
});

module.exports = router;
