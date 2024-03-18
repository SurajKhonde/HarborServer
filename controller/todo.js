const {
  sendError,formatTodo
 } = require("../helper/helper");
const Todo = require("../models/todo");
const { isValidObjectId } = require("mongoose");

exports.createTodo = async (req, res) => {
    console.log(req.body)
    const {
        name,
        description,
        priority,
        targetdate
    } = req.body;
    const newTodo = new Todo({
        name,
        description,
        priority,
        targetdate
    });
    await newTodo.save();
    res.status(201).json({
        todo: {
            id: newTodo._id,
            name: name,
            priority:priority
        },
    });
};

exports.updateTodo = async (req, res) => {
    const { todoId } = req.params;
    if (!isValidObjectId(todoId)) return sendError(res, "Invalid Todo ID!");
    const todo = await Todo.findById(todoId);
    if (!todo) return sendError(res, "Task Not Found!", 404);
    const {name,description,priority,targetdate} = req.body;
    todo.name = name;
    todo.description = description;
    todo.priority = priority;
    todo.targetdate = targetdate;
    await todo.save();
    res.status(201).json({
        todo: formatTodo(todo)
    });
};
exports.removeTodo = async (req, res) => {
    const { todoId } = req.params;
    if (!isValidObjectId(todoId)) return sendError(res, "Invalid Todo  ID!");
    const todo = await Todo.findById(todoId);
    if (!todo) return sendError(res, "Todo Not Found!", 404);
    await Todo.findByIdAndDelete(todoId);
    res.json({ message: "Task removed successfully." });

};
exports.getTodo = async (req, res) => {
  const { pageNo=0, limit=16 } = req.query;

  const todo = await Todo.find({})
    .sort({ createdAt: -1 })
    .skip(parseInt(pageNo) * parseInt(limit))
    .limit(parseInt(limit));
  const profiles = todo.map((data) => formatTodo(data));
  res.json({
    profiles,
  });
};
exports.TaskDone = async (req, res) => {
    const { todoId } = req.params;
    if (!isValidObjectId(todoId)) return sendError(res, "Invalid Todo ID!");
    const todo = await Todo.findById(todoId);
    if (!todo) return sendError(res, "Task Not Found!", 404);
    const { name, description, priority, targetdate, taskcompleted } = req.body;
    todo.name = name;
    todo.description = description;
    todo.priority = priority;
    todo.targetdate = targetdate;
    todo.taskcompleted = taskcompleted;
    await todo.save();
    res.status(201).json({
        todo: formatTodo(todo)
    });
};
