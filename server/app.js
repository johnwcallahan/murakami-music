const _ = require("lodash");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");

// Config
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(morgan("dev"));

// DB
mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;
const Ref = require("./models/ref");

// Routes
const router = express.Router();

router.route("/books")

  .get((req, res) => {
    Ref.distinct("book", (err, books) => {
      if (err) {
        res.send(err);
      }
      res.json({ "books": books });
    });
  });

router.route("/composers")

  .get((req, res) => {
    Ref.distinct("composer", (err, composers) => {
      if (err) {
        res.send(err);
      }
      res.json({ "composers": composers });
    });
  });

router.route("/genres")

  .get((req, res) => {
    Ref.distinct("genre", (err, genres) => {
      if (err) {
        res.send(err);
      }
      res.json({ "genres": genres });
    });
  });

router.route("/refs")

  .post((req, res) => {
    console.log(req.body.books)
    Ref.find({
      "book": { $in: req.body.books },
      "composer": { $in: req.body.composers }
    }, (err, refs) => {
      res.json({ "refs": refs });
    });
  });

router.get("/", (req, res) => {
  res.json({ message: "Hello, World!"});
});

app.use("/api", router);

app.listen(3000);
console.log("listening on port 3000");
