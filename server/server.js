// const _ = require("lodash");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");

// Config
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

// DB
mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;
const Ref = require("./models/ref");

// Routes
const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/dst/index.html"));
});

router.route("/api/books")

  .get((req, res) => {
    Ref.distinct("book", (err, books) => {
      if (err) {
        res.send(err);
      }
      res.json({ "books": books });
    });
  });

router.route("/api/composers")

  .get((req, res) => {
    Ref.distinct("composer", (err, composers) => {
      if (err) {
        res.send(err);
      }
      res.json({ "composers": composers });
    });
  });

router.route("/api/genres")

  .get((req, res) => {
    Ref.distinct("genre", (err, genres) => {
      if (err) {
        res.send(err);
      }
      res.json({ "genres": genres });
    });
  });

router.route("/api/refs")

  .post((req, res) => {

    let query = {};

    for (let param in req.body) {
      query[param] = { $in: req.body[param] };
    }

    Ref.find(query, (err, refs) => {
      res.json({ "refs": refs });
    });
  });

router.get("/", (req, res) => {
  res.json({ message: "Hello, World!"});
});

app.use(router);

app.listen(port);
console.log(`listening on port ${port}`);
