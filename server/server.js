// const _ = require("lodash");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const queries = require("./queries");

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

router.route("/api/book")

  .post((req, res) => {

    // If no params are given in the request body, return all books
    if (isDeeplyEmpty(req.body)) {
      Ref.distinct("book", (err, data) => {
        if (err) {
          res.send(err.body);
        }
        res.json({ "book": data});
      });
    } else {
      Ref.aggregate(queries.getBook(req.body.composer), (err, data) => {
        if (err) {
          res.send(err);
        }
        res.json({ "book": data[0].setBooks });
      })
    }
  });

router.route("/api/composer")

  .post((req, res) => {

    // If no params are given in the request body, return all books
    if (isDeeplyEmpty(req.body)) {
      Ref.distinct("composer", (err, data) => {
        if (err) {
          res.send(err.body);
        }
        res.json({ "composer": data});
      });
    } else {
      Ref.aggregate(queries.getComposer(req.body.book), (err, data) => {
        if (err) {
          res.send(err);
        }
        res.json({ "composer": data[0].setComposers });
      })
    }
  });

router.route("/api/genre")

  .get((req, res) => {
    Ref.distinct("genre", (err, data) => {
      if (err) {
        res.send(err);
      }
      res.json({ "genre": data });
    });
  });

router.route("/api/ref")

  .post((req, res) => {

    let query = {};

    for (let param in req.body) {
      if (req.body[param].length > 0) {
        query[param] = { $in: req.body[param] };
      }
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


function isDeeplyEmpty(body) {
  for (let prop in body) {
    if (typeof(body[prop]) === "object" && body[prop].length > 0) {
      return false;
    } else if (typeof(body[prop]) !== "object" && body[prop]) {
      return false;
    }
  }
  return true;
}
