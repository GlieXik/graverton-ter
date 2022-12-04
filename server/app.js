const createError = require("http-errors");
const express = require("express");

const cookieParser = require("cookie-parser");
const app = express();
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();

const { Server } = require("socket.io");
const { createServer } = require("http");
const server = createServer(app);
const io = new Server(server);
const indexRouter = require("./routes/index");

const { Order } = require("./models/order.model");

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

io.on("connection", (socket) => {
  Order.find({})
    // .sort({ _id: -1 })
    .then((result) => {
      socket.emit("start", result);
    });
});
Order.watch([{ $match: { operationType: { $in: ["insert"] } } }]).on(
  "change",
  (result) => {
    console.log("watch");
    Order.find()
      // .sort({ _id: -1 })
      .then((result) => {
        io.emit("change", result);
      });
  }
);
module.exports = server;
