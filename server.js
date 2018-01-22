const cors = require("cors");
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
app.use(cors());
app.use(express.static("./dst"));

// DB
mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;
const Ref = require("./models/ref");

// Routes
const router = express.Router();

router.route("/api/books")

  .get((req, res) => {
    Ref.distinct("book", (err, data) => {
      if (err) {
        res.send(err);
      }
      res.json(data);
    });
  });

router.route("/api/composers")

  .get((req, res) => {
    Ref.aggregate([
      {
        $group: {"_id": "$genre",
        genreSet: {$addToSet: "$composer"}}
      }
    ], (err, data) => {
      if (err) {
        res.send(err);
      }

      let out = {};

      data.forEach(entry => {
        let genre = entry["_id"];
        if (!out[genre]) {
          out[genre] = entry.genreSet;
        };
      });

      res.json(out);
    });

  });

router.route("/api/genres")

  .get((req, res) => {
    Ref.distinct("genre", (err, data) => {
      if (err) {
        res.send(err);
      }
      res.json(data);
    });
  });

router.route("/api/refs")

  .post((req, res) => {

    let query = {};
    console.log(req.body);
    for (let param in req.body) {
      if (req.body[param].length > 0) {
        let paramSingular = param.slice(0, -1);
        query[paramSingular] = { $in: req.body[param] };
      }
    }
    console.log(query);
    Ref.find(query, (err, refs) => {
      res.json({ "refs": refs });
    });
  });

app.use(router);

app.listen(port);
console.log(`listening on port ${port}`);
