const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const path = require("path");

require("dotenv").config();

const DST_DIR = path.join(__dirname, "dst");
const HTML_FILE = path.join(DST_DIR, "index.html");
const IS_DEV = process.env.NODE_ENV !== "production";

const app = express();
const port = process.env.PORT || 8080;
app.set("port", port);

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

if (IS_DEV) {
  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");
  const webpackDevConfig = require("./webpack.dev.config");  

  const compiler = webpack(webpackDevConfig);  
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath
  }));
  
  app.use(webpackHotMiddleware(compiler));
  
  app.get("/", (req, res, next) => {
    compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
      if (err)
        return next(err);
      res.set("content-type", "text/html");
      res.send(result);
      res.end();
    });
  });
} else {
  const sslRedirect = require("heroku-ssl-redirect");
  app.use(sslRedirect());
  app.use(express.static(DST_DIR));

  app.get("/", (req, res) => res.sendFile(HTML_FILE));
}

app.get("/callback", (req, res) => {
  res.send("Login successful");
});

app.listen(port);
console.log(`listening on port ${port}`);