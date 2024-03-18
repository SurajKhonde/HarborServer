const express = require("express");
const {
    createTodo,
    updateTodo,
    removeTodo, getTodo,TaskDone } = require("../controller/todo");
const { isAuth } = require("../middleware/auth");
const router = express.Router();
const {validate,todoInfoValidator } =require("../middleware/validator")

router.post(
  "/create",
  isAuth,
  validate,
  todoInfoValidator,
  createTodo
);

router.post(
  "/update/:todoId",
  isAuth,
  validate,
  todoInfoValidator,
  updateTodo
  
);
router.post(
  "/TaskDone/:todoId",
  isAuth,
  validate,
  todoInfoValidator,
  TaskDone
  
);

router.get("/getTodo", isAuth, getTodo);
router.delete("/:todoId",isAuth,removeTodo);

module.exports = router;
