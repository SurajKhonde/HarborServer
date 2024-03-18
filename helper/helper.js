exports.sendError = (res, error, statusCode = 401) =>
  res.status(statusCode).json({ error });

  exports.handleNotFound = (req, res) => {
  this.sendError(res, "Not found", 404);
};
exports.formatTodo = (data) => {
  const {
        name,
        description,
        priority,
    targetdate, _id,
    taskcompleted,
    delaytask
  } = data;
  return {
    id: _id,
    name,
    description,
    priority,
    targetdate,
    taskcompleted,
    delaytask
  };
};