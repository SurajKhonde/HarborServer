const express = require("express");
const morgan = require("morgan");
const { errorHandler } = require("./middleware/error");
const { handleNotFound } =require("./helper/helper")
const cors = require("cors");
require("./db/index");
require("dotenv").config();
const userRouter = require("./routes/user");
const todoRouter = require("./routes/todo");
const app = express()
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/user", userRouter);
app.use("/api/todo", todoRouter);
app.use("/*", handleNotFound);
app.use(errorHandler);

app.listen(process.env.PORT|| 8000, () => { 
    console.log(`port is running on 8000`)
})