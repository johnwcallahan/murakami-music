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

  .post((req, res) => {
    getParam(req, res, "book");
  });

router.route("/api/composers")

  .post((req, res) => {
    console.log(req.body);
    getParam(req, res, "composer");
  });

router.route("/api/genres")

  .post((req, res) => {
    getParam(req, res, "genre");
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



function getParam(req, res, type) {
  if (!req.body) {
    Ref.distinct(type, (err, data) => {
      if (err) {
        res.send(err);
      }
      res.json({ [type]: data });
    });
  } else {
    let priors = {};

    for (let field in req.body) {
      if (req.body[field].length > 0) {
        console.log("hi")
        priors[field] = { $in: [].concat.apply([], [req.body[field]])};
      }
    }
    Ref.distinct(type, priors, (err, data) => {
      if (err) {
        res.send(err);
      }
      res.json({ [type]: data });
    });
  }
}
